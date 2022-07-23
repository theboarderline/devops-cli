/* eslint-disable */

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

function configureStore(initialState: { [x: string]: any; } | undefined) {
  const finalCreateStore = compose(
    applyMiddleware(
      thunk,
    ),
  )(createStore);

  const store = finalCreateStore(reducer, initialState);

  return store;
}

const store = configureStore({
  auth: {

    isLoading: false,
  },
});

export default store;