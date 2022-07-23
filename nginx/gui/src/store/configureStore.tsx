/* eslint-disable */
import store from './configureStore.dev';
import storeProd from './configureStore.prod';

let MainStore: any;

if (process.env.NODE_ENV === 'production') {
  MainStore = storeProd;
} else {
  MainStore = store
}

export default MainStore;
