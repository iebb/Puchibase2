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

      const [
        Member,
        Personal,
        Costume,
        SkillActive,
        SkillPassive,
      ] = (yield [
        "Member",
        "Personal",
        "Costume",
        "SkillActive",
        "SkillPassive",
      ].map(x => call(API(x)))).map(x => x.data);

      yield put({ type: 'save', payload: {
        ...Member,
        ...Personal,
        ...Costume,
        ...SkillActive,
        ...SkillPassive
      }});

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
