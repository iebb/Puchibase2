import request, {checkStatus, parseJSON} from "../utils/request";
import fetch from "dva/fetch";
const endPoint = "https://puchi-api.loveliv.es/";
const suffix = "Mst.min.json";

export function cachedRequest(key, hash, options) {
  return fetch(`${endPoint}${key}${suffix}?hash=${hash}`, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => {
      localStorage.setItem(`${key}!!Hash`, hash);
      localStorage.setItem(`${key}`, JSON.stringify({data}));
      return { data };
    })
    .catch(err => ({ err }));
}

export function normalRequest(key, options) {
  return fetch(`${endPoint}${key}${suffix}`, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }));
}


export function getMasterData() {
  if (!sessionStorage.getItem("Masterdata")) {
    sessionStorage.setItem("Masterdata", "loading");
    request(`${endPoint}masterdata.json`).then(function({ data }) {
      for(const item of data.checkMasterTableVersion) {
        sessionStorage.setItem(item.tableName.replace("Mst", ""), item.checksum);
      }
      sessionStorage.setItem("Masterdata", "loaded");
    });
  }
}

export function API(key) {

  let item = sessionStorage.getItem(key);
  if (item) {
    if (localStorage.getItem(`${key}!!Hash`) === item) {
      return () => JSON.parse(localStorage.getItem(`${key}`))
    } else {
      return () => cachedRequest(key, item);
    }
  } else {
    return () => normalRequest(key);
  }
}


