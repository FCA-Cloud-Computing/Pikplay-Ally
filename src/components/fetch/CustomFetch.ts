import cookieCutter from '@boiseitguru/cookie-cutter'
import { convertResponse } from '../../lib/utils';

const CustomFetch = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const getCookies = (ctx = { req: { cookies: {} } }) => {
    let headers = {};
    // Obteniendo cookies del lado del server. Generalmente vienen en el ctx.req.cookies
    // console.log("cookieCutter", cookieCutter ? cookieCutter.get("User-ID") : "no existe cuttier");
    // console.log("ctx", ctx?.req.cookies["X-Auth-Token"]);
    // debugger;
    headers["User-ID"] = ctx?.req?.cookies["User-ID"] || (typeof window != 'undefined' && cookieCutter.get("User-ID")) || null
    headers["X-Auth-Token"] = ctx?.req?.cookies["X-Auth-Token"] || (typeof window != 'undefined' && cookieCutter.get("X-Auth-Token")) || null
    return headers
  }

  const get = async (ctx, path, props = {}) => {
    console.log('API_URL vale:' + API_URL);
    if (!API_URL) return {
      message: "API_URL no esta definida en el archivo .env",
      status: 404
    }
    try {
      const headers = getCookies(ctx)
      console.log(API_URL + path);
      const response = await fetch(API_URL + path, {
        // credentials: "same-origin", // TODO averiguar para que sirve
        headers: {
          "Content-Type": "application/json",
          ...headers
        },
      });
      // if (!response.ok) {
      //   throw new Error(`Algo paso :(`);
      // }
      // debugger;
      const data = await response.json();
      if (data.statusCode == 500) {
        // debugger;
        return {
          data: [],
          message: "Error al obtener datos desde el servicio",
          status: 500
        }
      }

      const resp = convertResponse(data);
      return resp;
    } catch (error) {
      // debugger;
      console.error(`Error al obtener datos desde el servicio para la ruta ${path} method GET}`);
      console.log(error);
      throw error;
    }
  }

  const post = async (ctx, path, params, file?, extraHeaders = {}) => {
    if (!API_URL) return {
      message: "API_URL no esta definida en el archivo .env",
      status: 404
    }
    const url = API_URL + path
    console.log(API_URL + path);
    let body;
    const headers = {
      credentials: 'include',
      ...getCookies(ctx),
    }
    if (params) {
      body = JSON.stringify({ ...params })
      headers["Content-type"] = "application/json; charset=UTF-8"
    }

    if (file) body = file;
    return fetch(url, {
      method: 'POST',
      headers,
      body
    })
      .then(async res => {
        const json = await res.json()
        const formated = convertResponse(json);
        return formated
      })
      .catch(error => {
        console.error(`Error al obtener datos desde el servicio para la ruta ${path} method GET}`);
        throw error;
      })
  }

  return {
    get,
    post
  }
}

export default CustomFetch
