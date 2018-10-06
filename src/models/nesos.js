import {API} from '../services/api';
import {arrayToMap} from "../utils/utils";

export default {

  namespace: 'nesos',
  state: {
    getMemberMaster: [],
    getPersonalMaster: [],
    getCostumeMaster: [],
    getSkillActiveMaster: [],
    getSkillPassiveMaster: [],
    data: [],
  },

  effects: {
    * fetch({ payload }, { put, call }) {
      const Member = (yield call(API("Member"))).data;
      const Personal = (yield call(API("Personal"))).data;
      const Costume = (yield call(API("Costume"))).data;
      const SkillActive = (yield call(API("SkillActive"))).data;
      const SkillPassive = (yield call(API("SkillPassive"))).data;
      yield put({ type: 'save', payload: Member });
      yield put({ type: 'save', payload: Personal });
      yield put({ type: 'save', payload: Costume });
      yield put({ type: 'save', payload: SkillActive });
      yield put({ type: 'save', payload: SkillPassive });

      const personalMap = arrayToMap(Personal.getPersonalMaster, "personalMstId");
      const costumeMap = arrayToMap(Costume.getCostumeMaster, "costumeMstId");

      const data = Member.getMemberMaster.slice(0);
      for (let row of data) {
        row.personal = personalMap[row.personalMstId];
        row.costume = costumeMap[row.costumeMstId];
        row.skillActive = SkillActive.getSkillActiveMaster.filter(x => x.memberMstId === row.memberMstId).map(
          x => ({...x, effect: JSON.parse(x.effectData)})
        );
        row.skillPassive = SkillPassive.getSkillPassiveMaster.filter(x => x.memberMstId === row.memberMstId);
      }
      yield put({ type: 'save', payload: {data: data} });
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
