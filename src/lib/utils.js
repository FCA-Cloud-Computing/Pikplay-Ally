import { PROFILE } from '@/consts/profile';
import cookieCutter from '@boiseitguru/cookie-cutter';
import confetti from 'canvas-confetti';

export const animatePrince = (HTMLElement, targetNumber, fromNumber) => {
  var target = parseFloat(fromNumber);
  var number = targetNumber; // parseFloat(HTMLElement.value);
  console.log(number + '  ' + target + ' ' + (number > target));
  if (number > target) {
    // Aumentando
    var interval = setInterval(function () {
      HTMLElement.innerHTML = target;
      if (number <= target) clearInterval(interval);
      target = Number(target + 1);
    }, 100);
  } else {
    // Disminuyendo
    var interval = setInterval(function () {
      if (HTMLElement) {
        HTMLElement.innerHTML = target;
        if (number >= target) clearInterval(interval);
        target = Number(target - 1);
      }
    }, 80);
  }
};

export function cookiesToObject(cookies = '') {
  // Tested in getServerSideProps
  // debugger;
  const cookiesArray = cookies.split(';');
  const cookiesObject = {};
  cookiesArray.forEach((cookie) => {
    const [key, value] = cookie.split('=');
    cookiesObject[key.trim()] = value;
  });
  return cookiesObject;
}

export function convertResponse(response) {
  if (response == null) return response;
  let parentKeys = Object.keys(response);
  parentKeys.forEach((key) => {
    let currentObj = response[key];
    delete response[key];
    let newKey = snakeToCamel(key);
    response[newKey] = currentObj;
    if (typeof response[newKey] === 'object') {
      convertResponse(response[newKey]);
    }
  });
  return response;
}

export function isEmpty(obj) {
  // Validating json is not empty, string is not empty and array is not empty
  if (obj === null || obj === undefined) return true;
  if (typeof obj === 'string' && obj.trim() === '') return true;
  if (Array.isArray(obj) && obj.length === 0) return true;
  if (typeof obj === 'object' && Object.keys(obj).length === 0) return true;
  return false;
}

export function formatNumber(input) {
  input = String(input);
  let num = input.replace(/\./g, '');
  if (!isNaN(num)) {
    num = num
      .toString()
      .split('')
      .reverse()
      .join('')
      .replace(/(?=\d*\.?)(\d{3})/g, '$1.');
    num = num.split('').reverse().join('').replace(/^[\.]/, '');
    input = num;
  } else {
    input = input.replace(/[^\d\.]*/g, '');
  }
  return input;
}

export const timeAgo = (prevDate) => {
  const prevDateFormatted = Number(new Date(prevDate));
  const today = Number(new Date());
  const diff = today - prevDateFormatted;
  const minute = 60 * 1000;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30;
  const year = day * 365;
  switch (true) {
    case diff < minute:
      const seconds = Math.round(diff / 1000);
      return `${seconds} ${seconds > 1 ? 'segundos' : 'segundo'}`;
    case diff < hour:
      return Math.round(diff / minute) + ' minutos';
    case diff < day:
      return Math.round(diff / hour) + ' horas';
    case diff < month:
      return Math.round(diff / day) + ' días';
    case diff < year:
      return Math.round(diff / month) + ' meses';
    case diff > year:
      return Math.round(diff / year) + ' años';
    default:
      return '';
  }
};

export function slugify(string, lenght) {
  const a = 'àáäâãåăæçèéëêǵḧìíïîḿńǹñòóöôœøṕŕßśșțùúüûǘẃẍÿź·/_,:;';
  const b = 'aaaaaaaaceeeeghiiiimnnnooooooprssstuuuuuwxyz------';
  const p = new RegExp(a.split('').join('|'), 'g');
  const cadena = string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with ‘and’
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
  return lenght ? cadena.substring(0, lenght) : cadena;
}

export function snakeToCamel(snake) {
  return snake.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

export function formatNumberWithCommas(number) {
  if (typeof number !== 'number') return;
  return number.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function startConfetti() {
  if (typeof window == 'undefined') return;
  var count = 200;
  var defaults = {
    origin: { y: 0.7 },
    zIndex: 1301,
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
  confetti({ ...defaults });
}

export function getCookies(ctx = { req: { cookies: {} } }) {
  let headers = {};
  // Obteniendo cookies del lado del server. Generalmente vienen en el ctx.req.cookies
  // console.log("cookieCutter", cookieCutter ? cookieCutter.get("User-ID") : "no existe cuttier");
  // console.log("ctx", ctx?.req.cookies["X-Auth-Token"]);
  // debugger;
  headers['User-ID'] = ctx?.req?.cookies['User-ID'] || (typeof window != 'undefined' && cookieCutter.get('User-ID')) || null;
  headers['X-Auth-Token'] = ctx?.req?.cookies['X-Auth-Token'] || (typeof window != 'undefined' && cookieCutter.get('X-Auth-Token')) || null;
  return headers;
}

export function logout() {
  if (typeof localStorage != 'undefined') {
    localStorage.clear();
    cookieCutter.set('X-Auth-Token', null);
    cookieCutter.set('User-ID', null);
    cookieCutter.set('userLogged', { uid: 0 });
  }
}
export function formatCode(code) {
  // transforma un string (código) en un string con guiones cada 3 caracteres -> 123456789 -> 123-456-789
  const codeString = code.toString();
  let formattedCode = "";
  for (let i = 0; i < codeString.length; i++) {
    formattedCode += codeString[i];
    if ((i + 1) % 3 === 0 && i !== codeString.length - 1) {
      formattedCode += "-";
    }
  }

  return formattedCode;
}

/**
 * Genera las propiedades de accesibilidad para un componente de pestañas de ancho completo.
 * Estas propiedades incluyen un `id` único para la pestaña y el atributo 
 * `aria-controls`, que asocia la pestaña con su panel de contenido correspondiente.
 *
 * @param {number} tabIndex - El índice de la pestaña para la cual se generan las propiedades.
 * @returns {object} Un objeto que contiene los atributos `id` y `aria-controls`.
 */
export function getAccessibilityPropsTabs(tabIndex) {
  return {
    id: `full-width-tab-${tabIndex}`,
    'aria-controls': `full-width-tabpanel-${tabIndex}`,
  };
}

export function getImageSize(url, size="MD") {
  const currentSize = PROFILE.SIZES[size]
  return url.replace(/(\.\w+)(\?.*)?$/, `_${currentSize}x${currentSize}$1$2`);
}
