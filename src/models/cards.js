import {API} from '../services/api';
import {arrayToMap} from "../utils/utils";

export default {

  namespace: 'cards',
  state: {
    getCardMaster: [],
    getPersonalMaster: [],
    getCardPersonalMaster: [],
    getCardPassiveSkillMaster: [],
    getCardSpecialSkillMaster: [],
    getCardCategoryMaster: [],

    data: [],
  },

  effects: {
    * fetch({ payload }, { put, call }) {

      const [
        Card,
        Personal,
        CardPersonal,
        CardPassiveSkill,
        CardSpecialSkill,
        CardCategory
      ] = (yield [
        "Card",
        "Personal",
        "CardPersonal",
        "CardPassiveSkill",
        "CardSpecialSkill",
        "CardCategory"
      ].map(x => call(API(x)))).map(x => x.data);

      yield put({ type: 'save', payload: {
        ...Card,
        ...Personal,
        ...CardPersonal,
        ...CardPassiveSkill,
        ...CardSpecialSkill,
        ...CardCategory
      }});

      const personalMap = arrayToMap(Personal.getPersonalMaster, "personalMstId");

      const data = Card.getCardMaster.slice(0);

      const basedata = {};
      const baselist = [];

      for (let row of data) {
        row.personal = personalMap[row.personalMstId];
        row.skillSpecial = CardSpecialSkill.getCardSpecialSkillMaster.filter(x => x.cardSpecialSkillMstId === row.specialSkillMstId).map(
          x => ({...x, effect: JSON.parse(x.effectData)})
        );
        row.skillPassive = CardPassiveSkill.getCardPassiveSkillMaster.filter(x => x.cardPassiveSkillMstId === row.passiveSkillMstId);

        if (basedata[row.cardBaseId]) {
          basedata[row.cardBaseId].push(row);
        } else {
          basedata[row.cardBaseId] = [row];
        }
      }

      for (let key of Object.keys(basedata)) {
        baselist.push({
          cardBaseId: key,
          data: basedata[key],
        })
      }

      yield put({ type: 'save', payload: {data: baselist} });
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
