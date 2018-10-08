import {t} from "./languages";
import {f} from "./utils";

const secretMapping = {

  totalTimeBomb: ["timeBomb", 2],
  highestTimeBomb: ["timeBomb", 1],

  totalScoreBomb: ["bombScore", 2],
  highestScoreBomb: ["bombScore", 1],

  totalGoldBomb: ["bombGold", 2],
  highestGoldBomb: ["bombGold", 1],

  totalBomb: ["bombAll", 2],
  highestBomb: ["bombAll", 1],

  totalComa: ["eraseAll", 2],
  highestComa: ["eraseAll", 1],

  totalCenterComa: ["eraseLeader", 2],
  highestCenterComa: ["eraseLeader", 1],

  totalGold: ["gold", 2],
  highestGold: ["gold", 1],

  totalShowTime: ["showTime", 2],
  highestShowTime: ["showTime", 1],

  totalActiveSkill: ["skill", 2],
  highestActiveSkill: ["skill", 1],

  totalScore: ["score", 2],
  highScore: ["score", 1],

};



export function getLimit(limitationType, textType = "limitation") {
  if (!limitationType) {
    return t(["mission", textType, "None"]);
  }
  const limit = (typeof limitationType === "object") ? limitationType : JSON.parse(limitationType);
  const values = [];
  const check = (data, type) => {
    data[type] && values.push(t(["names", type, "name", data[type][0]]))
  };

  let baseType = "";
  let limitType = "";
  let base = {};

  if (limit.Leader) {
    baseType = "Leader";
    base = limit.Leader;
  }
  if (limit.All) {
    baseType = "All";
    base = limit.All;
  }
  if (base.Personal) {
    check(base, "Personal");
    limitType = "Personal";
  } else {
    for (const type of ["Group", "Class", "Unit"]) check(base, type);
    limitType = "Other";
  }
  const value = values.join(", ");
  return f(t(["mission", textType, baseType, limitType]), {value});
}


export function getTarget(actionTarget, textType = "target") {
  if (!actionTarget) return null;
  const target = (typeof actionTarget === "object") ? actionTarget : JSON.parse(actionTarget);
  const targetVal = target.value;

  let targetType = Object.keys(targetVal)[0];
  let data = 0;
  if (targetType === "chainCount") {
    targetType += "_" + targetVal.chainCount.chain;
    data = targetVal.chainCount.count;
  } else
  if (targetType === "score") {
    data = targetVal.score;

    const breaks = t(["mission", textType, "scoreBreak"]);
    for(const pow of breaks) {
      if ((10 ** pow) <= targetVal.score) {
        targetType += "_" + pow;
        data = targetVal.score / (10 ** pow);
        break;
      }
    }

  } else {
    data = targetVal[targetType];
  }
  return f(t(["mission", textType, targetType]), {data});
}


export function getUnlockTarget(releaseSecretAction) {
  if (!releaseSecretAction) return null;
  const unlock = JSON.parse(releaseSecretAction);
  const limit = unlock.limitation;
  const key = Object.keys(unlock.value)[0];
  const targetTypes = secretMapping[key];
  const period = targetTypes[1];
  const target = {[targetTypes[0]] : unlock.value[key]};
  return {...{limit}, ...{target: {value: target}}, ...{period}};
}
