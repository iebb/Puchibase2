export function DataPagination(data, page, rowPerPage) {
  return data.slice(page * rowPerPage - rowPerPage, page * rowPerPage);
}

/**
 * @return {number}
 */
export function TotalPages(data, rowPerPage) {
  return Math.ceil(data.length / rowPerPage);
}

export function arrayToMap(arr, key) {
  const map = {};
  for(const row of arr) map[row[key]] = row;
  return map;
}

const popCount = [
  0,
  1,
  1, 2,
  1, 2, 2, 3,
  1, 2, 2, 3, 2, 3, 3, 4,
];
export function popBinaryMap(binMap) {
  return binMap.split("").map(x => popCount[parseInt(x, 16)]).reduce((x, y) => x + y);
}

export function resolveObj(obj, path){
  const tmpPath = path.slice(0);
  let current = obj;
  while(tmpPath.length) {
    if(typeof current !== 'object') return undefined;
    current = current[tmpPath.shift()];
  }
  return current;
}

export function objectMap(object, mapFn) {
  return Object.keys(object).reduce((result, key) => {
    result[key] = mapFn(key, object[key]);
    return result
  }, {})
}

export function f(orig, args) { // format template strings
  let str = orig;
  for (const key in args) {
    str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]);
  }
  return str;
}


export function getTimezone() {
  return localStorage.timeZone || (
    (localStorage.useJST = "false") || (localStorage.timeZone = require('moment-timezone').tz.guess())
  );
}



export function useJST() {
  if (localStorage.useJST === "false") {
    return false;
  } else if (localStorage.useJST === "true") {
    return true;
  } else {
    localStorage.useJST = "false";
    localStorage.timeZone = "Asia/Tokyo";
  }
}

export function toggleTimezone() {
  if (localStorage.useJST === "false") {
    localStorage.useJST = "true";
    localStorage.timeZone = "Asia/Tokyo";
    return true;
  } else {
    localStorage.useJST = "false";
    localStorage.timeZone = require('moment-timezone').tz.guess();
    return false;
  }
}
