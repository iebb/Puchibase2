import {sprintf} from "sprintf-js";
const endPoint = "https://puchi-xet.loveliv.es/";

export function getGeneral(type, aId) {
  return sprintf(endPoint + "%s/%s%s.png", type, type, aId);
}
export function getSpGeneral(type, aId, digit=8) {
  return sprintf(endPoint + `${type}/${type}%0${digit}d.png`, aId);
}
export function getTitleImage(aId) {
  return sprintf(endPoint + "achievement/achievement%08d.png", aId);
}
export function getSPRImage(aId) {
  return sprintf(endPoint + "sprawlpict/sprawlpict%08d.png", aId);
}
export function getSkillCutinAImage(aId) {
  return sprintf(endPoint + "skillcutinimagea/skillcutinimagea%08d.png", aId);
}
export function getSkillCutinBImage(aId) {
  return sprintf(endPoint + "skillcutinimageb/skillcutinimageb%08d.png", aId);
}
export function getCardSmallImage(aId) {
  return sprintf(endPoint + "cardsmall/cardsmall%09d.png", aId);
}
export function getStageImage(aId) {
  return sprintf(endPoint + "stageselect/stageselect%08d.png", aId);
}
