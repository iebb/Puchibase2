import {API} from '../services/api';
import {getStageImage} from "../services/xet";
import {parseEffect} from "../utils/events";

export default {

  namespace: 'events',
  state: {
    getEventCycleMaster: [],
    getEventEffectMaster: [],
    getEventAreaCompleteRewardMaster: [],
    getEventMissionMacaronMaster: [],
    getEventMissionTowerMaster: [],
    getEventRankingRewardMaster: [],
    getRewardMaster: [],
    getTowerRewardMaster: [],

    data: [],
  },

  effects: {
    * fetch({ payload }, { put, call }) {

      const [
        EventCycle,
        EventEffect,
        EventAreaCompleteReward,
        EventMissionMacaron,
        EventMissionTower,
        EventRankingReward,
        Reward,
        TowerReward,
      ] = (yield [
        "EventCycle",
        "EventEffect",
        "EventAreaCompleteReward",
        "EventMissionMacaron",
        "EventMissionTower",
        "EventRankingReward",
        "Reward",
        "TowerReward",
      ].map(x => call(API(x)))).map(x => x.data);

      yield put({ type: 'save', payload: {
          ...EventCycle,
          ...EventEffect,
          ...EventAreaCompleteReward,
          ...EventMissionMacaron,
          ...EventMissionTower,
          ...EventRankingReward,
          ...Reward,
          ...TowerReward,
        }});

      const data = EventCycle.getEventCycleMaster.slice(0);

      for (let row of data) {
        /*
        row.sortingId = (row.stageMstId % 1000 !== 1) * 100000000 + row.stageMstId;
        row.schedules = Schedule.getScheduleMaster.filter(x => (x.stageMstId === row.stageMstId) && (x.seasonStartTime > 1524409199));
        */

        row.missionTower = EventMissionTower.getEventMissionTowerMaster.filter(x => x.eventId === row.eventId);
        row.missionMacaron = EventMissionMacaron.getEventMissionMacaronMaster.filter(x => x.eventId === row.eventId);
        row.effect = EventEffect.getEventEffectMaster.filter(
          x => x.eventId === row.eventId
        ).map(
            x => parseEffect(x)
        );
        /*
        row.missionTower = EventMissionTower.getEventMissionTowerMaster.filter(x => x.eventId === row.eventId);

        row.secrets = MissionSecret.getMissionSecretMaster.filter(x => x.stageId === row.stageMstId);
        row.extras = MissionExtra.getMissionExtraMaster.filter(x => x.stageId === row.stageMstId);
        row.members = Member.getMemberMaster.filter(x => row.stageMstId % 1000 === 1 ? (
            Math.floor(x.memberMstId / 1000) === Math.floor(row.stageMstId / 1000)
          ) : false
        );
        */
      }

      yield put({ type: 'save', payload: { data } });
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
