import {t} from "./languages";
import {f} from "./utils";
const sprintf = require("sprintf-js").sprintf;

export function parseCardPassiveSkillMeta(row) {
  const cond = row.conditionTypeOption === 0 ? row.conditionType : `${row.conditionType}_${row.conditionTypeOption}`;
  return `${
    t(["cardPassiveSkill", "effect", row.effectType])
  } / ${
    t(["cardPassiveSkill", "trigger", cond])
  }`;
}

export function parseActiveTranslations(x) {
  return x.name.split("＋").map(s => t(["activeSkill", "translations", s])).join(" + ");
}

export function parsePassiveSkill(row) {
  let motion = JSON.parse(row.motionData);
  motion.rate = sprintf("%.1f%%", motion.rate * 0.1);
  switch (row.type) {
    case 2:
    case 3:
    case 12: {
      break;
    }
    default: {
      motion.value1 -= 1000;
      motion.value2 -= 1000;
      motion.value1 = sprintf("%.1f%%", motion.value1 * 0.1);
      motion.value2 = sprintf("%.1f%%", motion.value2 * 0.1);
    }
  }
  return {
    trigger: t(["passiveSkill", "trigger", motion.trigger]),
    type: f(t(["passiveSkill", "type", row.type]), motion),
    rate: motion.rate,
  };
}

export function parseSkillRow(key) {
  let skillTransform = x => x;
  switch(key) {
    case "text":
      break;
    case "num":
    case "forceBombNum":
      skillTransform = x => x+1;
      break;
    case "skillTime":
      skillTransform = x => `${x}s`;
      break;
    case "lotteryRate":
      skillTransform = x => `${x}%`;
      break;
    default:
      break;
  }
  return {
    description: "",
    transform: skillTransform,
  };

}

export function parseActiveSkill(row) {
  let effect = row.effect || JSON.parse(row.effectData);

  for(const key of Object.keys(effect)) {
    const {description, transformedVal, value} = parseSkillRow(key, effect[key]);
    /*
    if (neso.skillActive[0].effect[key] !== neso.skillActive[skillLevels - 1].effect[key]) {
      activeSkillColumns.push({
        Header: t(["wording", "skills", "activeSkillParams", key]),
        accessor: "effect",
        key: `effect${key}`,
        Cell: val => ,
      })
    }
    */
  }

}
