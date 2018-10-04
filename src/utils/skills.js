import {t} from "./languages";
import {f} from "./utils";
const sprintf = require("sprintf-js").sprintf;

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
