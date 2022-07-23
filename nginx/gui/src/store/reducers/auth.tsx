/* eslint-disable */

import createReducer from '../createReducer';
import * as types from '../actions/types';

const INITIAL_STATE = {
  isLoading: false,
  dataLoading: false
};

export const auth = createReducer(INITIAL_STATE, {
  [types.IS_LOADING](state: any, action: { isLoading: boolean; }) {
    return {
      ...state,
      isLoading: action.isLoading,
    };
  },

  [types.SET_AUTH](state: any, action: { user: object }) {
    return {
      ...state,
      user: action.user,
    };
  },

  [types.DATA_LOADING](state: any, action: { dataLoading: boolean; }) {
    return {
      ...state,
      dataLoading: action.dataLoading,
    };
  },
});
