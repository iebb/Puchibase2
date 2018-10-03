const sprintf = require("sprintf-js").sprintf;
const endPoint = "https://puchi-xet.loveliv.es/";

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
