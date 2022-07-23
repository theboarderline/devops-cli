/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import MainStore from './store/configureStore';
import "../node_modules/slick-carousel/slick/slick.css";
import "../node_modules/slick-carousel/slick/slick-theme.css";

const composeProviders = (...Providers: any[]) => (Child: any) => (
  props: any
): JSX.Element =>
  Providers.reduce(
    (acc, Provider) => <Provider>{acc}</Provider>,
    <Child {...props} />
  );

const WrappedApp = composeProviders(Router)(App);

// const store: Store<ISLoadingState, ISLoadingAction> & {
//   dispatch: DispatchType
// } = createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={MainStore}>
    <WrappedApp />
  </Provider>,

  // </React.StrictMode>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
