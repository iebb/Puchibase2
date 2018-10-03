import pathToRegexp from 'path-to-regexp';
import { API } from '../services/api';
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
      const Card = (yield call(API("Card"))).data;
      const Personal = (yield call(API("Personal"))).data;
      const CardPersonal = (yield call(API("CardPersonal"))).data;
      const CardPassiveSkill = (yield call(API("CardPassiveSkill"))).data;
      const CardSpecialSkill = (yield call(API("CardSpecialSkill"))).data;
      const CardCategory = (yield call(API("CardCategory"))).data;

      yield put({ type: 'save', payload: Card });
      yield put({ type: 'save', payload: Personal });
      yield put({ type: 'save', payload: CardPersonal });
      yield put({ type: 'save', payload: CardPassiveSkill });
      yield put({ type: 'save', payload: CardSpecialSkill });
      yield put({ type: 'save', payload: CardCategory });

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
