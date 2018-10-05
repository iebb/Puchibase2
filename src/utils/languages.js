import {resolveObj} from "./utils";

const languages = {
  "en-US": require('../../translations/en-US.json'),
  "zh-CN": require('../../translations/zh-CN.json'),
};


export function t(key, empty=false) {
  let language = localStorage.language || "en-US";
  const ret = resolveObj(languages[language], key) || resolveObj(languages["en-US"], key);
  if (ret) {
    return ret;
  } else if (empty) {
    return "";
  } else {
    console.error("Missing Translations: " + key.join("."));
    return key[key.length - 1].toUpperCase();
  }
}
