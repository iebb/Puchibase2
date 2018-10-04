import {resolveObj} from "./utils";

const languages = {
  "en-US": require('../../translations/en-US.json'),
  "zh-CN": require('../../translations/zh-CN.json'),
};


export function t(key) {
  let language = localStorage.language || "en-US";
  return resolveObj(languages[language], key);
}
