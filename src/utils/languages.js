import {objectMap, resolveObj} from "./utils";
const langConf = require("../../translations/languages.json");


export const languages = objectMap(langConf, (lang, val) => {
  let dict;
  try {
    dict = require(`../../translations/ui/${lang}.json`);
  } catch (e) {
    dict = {};
  }
  return {
    dict: dict,
    meta: val
  }
});

export function lang() {
  return localStorage.language || "en-US";
}

export function t(key, empty=false) {
  let language = lang();
  const ret = resolveObj(languages[language].dict, key) || resolveObj(languages["en-US"].dict, key);
  if (ret) {
    return ret;
  } else if (empty) {
    return "";
  } else {
    console.error("Missing Translations: " + key.join("."));
    return key[key.length - 1].toUpperCase();
  }
}
