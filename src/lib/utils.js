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

export function cookiesToObject(cookies) {
  // Tested in getServerSideProps
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
  if (!number) return
  return number.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}