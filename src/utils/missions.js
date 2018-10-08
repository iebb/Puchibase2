import {t} from "./languages";
import {f} from "./utils";

export function getLimit(limitationType, textType = "limitation") {
  if (!limitationType) {
    return t(["mission", textType, "None"]);
  }
  const limit = JSON.parse(limitationType);
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
  const target = JSON.parse(actionTarget);
  const targetVal = target.value;

  let targetType = Object.keys(targetVal)[0];
  let data = 0;
  if (targetType === "chainCount") {
    targetType += "_" + targetVal.chainCount.chain;
    data = targetVal.chainCount.count;
  } else {
    data = targetVal[targetType];
  }
  return f(t(["mission", textType, targetType]), {data});
}
