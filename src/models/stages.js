import pathToRegexp from 'path-to-regexp';
import { API } from '../services/api';

export default {

  namespace: 'stages',
  state: {
    getTitleMaster: [],
  },

  effects: {
    * fetch({ payload }, { put, call }) {
      const { data } = yield call(API("Title"));
      yield put({ type: 'save', payload: data });
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
