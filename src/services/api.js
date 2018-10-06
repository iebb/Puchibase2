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
    request(`${endPoint}masterdata.json`).then(function({ data, err }) {
      let tables;
      if (err) {
        console.error("Masterdata Failed, loading from cache");
        tables = localStorage.getItem("Masterdata");
      } else if (data && data.checkMasterTableVersion) {
        localStorage.setItem("Masterdata", JSON.stringify(data.checkMasterTableVersion));
        sessionStorage.setItem("Masterdata", "loaded");
        tables = data.checkMasterTableVersion;
      }
      for(const item of tables) {
        sessionStorage.setItem(item.tableName.replace("Mst", ""), item.checksum);
      }
    });
  }
}

export function API(key) {

  let item = sessionStorage.getItem(key);
  if (item) {
    if (localStorage.getItem(`${key}!!Hash`) === item) {
      return () => JSON.parse(localStorage.getItem(`${key}`))
    } else {
      return () => {
        cachedRequest(key, item);
        return JSON.parse(localStorage.getItem(`${key}`));
      }
    }
  } else {
    return () => normalRequest(key);
  }
}


