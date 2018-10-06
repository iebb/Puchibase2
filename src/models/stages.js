import {API} from '../services/api';
import {getStageImage} from "../services/xet";

export default {

  namespace: 'stages',
  state: {
    getStageMaster: [],
    getMemberMaster: [],
    getScheduleMaster: [],
    getMissionStageMaster: [],
    getMissionSecretMaster: [],

    data: [],
  },

  effects: {
    * fetch({ payload }, { put, call }) {
      const Stage = (yield call(API("Stage"))).data;
      const Schedule = (yield call(API("Schedule"))).data;
      const MissionStage = (yield call(API("MissionStage"))).data;
      const MissionSecret = (yield call(API("MissionSecret"))).data;
      const Member = (yield call(API("Member"))).data;

      yield put({ type: 'save', payload: Stage });
      yield put({ type: 'save', payload: Member });
      yield put({ type: 'save', payload: Schedule });
      yield put({ type: 'save', payload: MissionStage });
      yield put({ type: 'save', payload: MissionSecret });


      const data = Stage.getStageMaster.slice(0);

      for (let row of data) {
        row.stageIcon = row.stageMstId % 1000 === 1 ? getStageImage(row.stageMstId): "https://via.placeholder.com/80x80";
        row.sortingId = (row.stageMstId % 1000 !== 1) * 100000000 + row.stageMstId;
        row.schedules = Schedule.getScheduleMaster.filter(x => (x.stageMstId === row.stageMstId) && (x.seasonStartTime > 1524409199));
        row.missions = MissionStage.getMissionStageMaster.filter(x => x.stageId === row.stageMstId);
        row.secrets = MissionSecret.getMissionSecretMaster.filter(x => x.stageId === row.stageMstId);
        row.members = Member.getMemberMaster.filter(x => row.stageMstId % 1000 === 1 ? (
            parseInt(x.memberMstId / 1000) === parseInt(row.stageMstId / 1000)
          ) : false
        );
      }

      yield put({ type: 'save', payload: { data: data.sort((x, y) => x.sortingId - y.sortingId) } });
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
