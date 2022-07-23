/* eslint-disable */

import createReducer from '../createReducer';
import * as types from '../actions/types';

const INITIAL_STATE = {
  isLoading: false,
};

export const testimonial = createReducer(INITIAL_STATE, {
  [types.IS_LOADING](state: any, action: { isLoading: boolean; }) {
    return {
      ...state,
      isLoading: action.isLoading,
    };
  },
});
