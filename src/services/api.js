import request from "../utils/request";

const endPoint = "https://puchiguru.loveliv.es/master/";
const suffix = "Mst.min.json";

export function getJSONURL(key) {
  return `${endPoint}${key}${suffix}`;
}

export function API(key) {
  return () => request(getJSONURL(key));
}

export function fetchTitle() {
  return request(getJSONURL("Title"));
}

export function fetchMember() {
  return request(getJSONURL("Member"));
}
