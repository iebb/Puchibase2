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
  try {
    let ret = resolveObj(languages[language].dict, key);
    if (typeof ret !== "undefined") {
      return ret;
    } else {
      console.error("Missing " + language + " Translations: " + key.join("."));
      ret = resolveObj(languages["en-US"].dict, key);
      if (typeof ret !== "undefined") {
        return ret;
      } else if (empty) {
        return "";
      } else {
        console.error("Missing en-US Language: " + key.join("."));
        return key[key.length - 1];
      }
    }
  } catch (e) {
    console.error(e);
    return "ERROR";
  }
}
