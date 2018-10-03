const sprintf = require("sprintf-js").sprintf;
export function getTitleImage(aId) {
  return sprintf("https://puchi-xet.loveliv.es/achievement/achievement%08d.png", aId);
}
export function getSPRImage(aId) {
  return sprintf("https://puchi-xet.loveliv.es/sprawlpict/sprawlpict%08d.png", aId);
}
export function getSkillCutinAImage(aId) {
  return sprintf("https://puchi-xet.loveliv.es/skillcutinimagea/skillcutinimagea%08d.png", aId);
}
export function getSkillCutinBImage(aId) {
  return sprintf("https://puchi-xet.loveliv.es/skillcutinimageb/skillcutinimageb%08d.png", aId);
}
export function getCardSmallImage(aId) {
  return sprintf("https://puchi-xet.loveliv.es/cardsmall/cardsmall%09d.png", aId);
}
