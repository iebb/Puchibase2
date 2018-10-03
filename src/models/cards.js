import pathToRegexp from 'path-to-regexp';
import { API } from '../services/api';

export default {

  namespace: 'cards',
  state: {
    getCardExperienceMaster: [],
    getCardCategoryMaster: [],
    getCardMaster: [],
  },

  effects: {
    * fetch({ payload }, { put, call }) {
      yield put({ type: 'save', payload: (yield call(API("Card"))).data });
      yield put({ type: 'save', payload: (yield call(API("CardExperience"))).data });
      yield put({ type: 'save', payload: (yield call(API("CardCategory"))).data });
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
