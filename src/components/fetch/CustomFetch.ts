import { convertResponse, getCookies } from '@/lib/utils';

const CustomFetch = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const get = async (ctx, path, props = {}) => {
    if (!API_URL)
      return {
        message: 'API_URL no esta definida en el archivo .env',
        status: 404,
      };

    try {
      const headers = getCookies(ctx);
      console.log(API_URL + path);
      const response = await fetch(API_URL + path, {
        // credentials: "same-origin", // TODO averiguar para que sirve
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      });
      // if (!response.ok) {
      //   throw new Error(`Algo paso :(`);
      // }
      // return response;

      const data = await response.json();
      if (data.statusCode == 500) {
        return {
          data: [],
          message: 'Error al obtener datos desde el servicio',
          status: 500,
        };
      }

      const resp = convertResponse(data);
      return resp;
    } catch (error) {
      console.error(`Error al obtener datos desde el servicio para la ruta ${path} method GET}`);
      console.log(error);
      throw error;
    }
  };

  const post = (ctx, path, params, file?, extraHeaders = {}) => {
    if (!API_URL)
      return {
        message: 'API_URL no esta definida en el archivo .env',
        status: 404,
      };
    const url = API_URL + path;
    console.log(API_URL + path);
    let body;
    const headers = {
      credentials: 'include',
      ...getCookies(ctx),
    };
    if (params) {
      body = JSON.stringify({ ...params });
      headers['Content-type'] = 'application/json; charset=UTF-8';
    }

    if (file) body = file;
    return fetch(url, {
      method: 'POST',
      headers,
      body,
    })
      .then(async (res) => {
        if (res.ok) {
          const json = await res.json();
          const formated = convertResponse(json);
          return formated;
        }
        const msg = `res.ok false en path: ${path}`;
        return {
          msg,
          error: true,
          errorCode: res.status,
        };
      })
      .catch((error) => {
        console.error(`Error al obtener datos desde el servicio para la ruta ${path} method GET}`);
        throw error;
      });
  };

  const put = async (ctx, path, params, extraHeaders = {}) => {
    if (!API_URL)
      return {
        message: 'API_URL no esta definida en el archivo .env',
        status: 404,
      };
    const url = API_URL + path;
    console.log(API_URL + path);
    let body;
    const headers = {
      credentials: 'include',
      ...getCookies(ctx),
      ...extraHeaders,
    };
    if (params) {
      body = JSON.stringify({ ...params });
      headers['Content-type'] = 'application/json; charset=UTF-8';
    }

    return fetch(url, {
      method: 'PUT',
      headers,
      body,
    })
      .then(async (res) => {
        if (res.ok) {
          const json = await res.json();
          const formated = convertResponse(json);
          return formated;
        }
        const msg = `res.ok false en path: ${path}`;
        return {
          msg,
          error: true,
          errorCode: res.status,
        };
      })
      .catch((error) => {
        console.error(`Error al obtener datos desde el servicio para la ruta ${path} method PUT}`);
        throw error;
      });
  };

  const del = async (ctx, path, extraHeaders = {}) => {
    if (!API_URL)
      return {
        message: 'API_URL no esta definida en el archivo .env',
        status: 404,
      };
    const url = API_URL + path;
    console.log(API_URL + path);
    const headers = {
      credentials: 'include',
      ...getCookies(ctx),
      ...extraHeaders,
    };

    return fetch(url, {
      method: 'DELETE',
      headers,
    })
      .then(async (res) => {
        if (res.ok) {
          const json = await res.json();
          const formated = convertResponse(json);
          return formated;
        }
        const msg = `res.ok fue false, el path fue ${path}`
        return {
          msg,
          error: true
        }
      })
      .catch((error) => {
        console.error(`Error al obtener datos desde el servicio para la ruta ${path} method DELETE}`);
        throw error;
      });
  };

  return {
    get,
    post,
    put,
    del,
  };
};

export default CustomFetch;
