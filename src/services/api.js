import request from "../utils/request";
const endPoint = "https://puchi-api.loveliv.es/";
const suffix = "Mst.min.json";

export function getInfo() {
  request(`${endPoint}masterdata.json`).then(function({ data }) {
    for(const item of data.checkMasterTableVersion) {
      sessionStorage.setItem(item.tableName.replace("Mst", ""), item.checksum);
      sessionStorage.setItem("Masterdata", "loaded");
    }
  });
}

export function getJSONURL(key) {
  let item = sessionStorage.getItem(key);
  if (item) {
    return `${endPoint}${key}${suffix}?crc=${item}`;
  }
  return `${endPoint}${key}${suffix}`;
}

export function API(key) {
  return () => request(getJSONURL(key));
}


