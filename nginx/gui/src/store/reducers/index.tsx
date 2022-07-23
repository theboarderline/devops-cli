import { combineReducers } from 'redux';

import * as authReducer from './auth';
import * as testimonialReducer from './testimonial';

export default combineReducers(
  Object.assign(
    authReducer,
    testimonialReducer
  ),
);
