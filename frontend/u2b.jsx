import React from 'react';
import ReactDOM from 'react-dom';
import RootReducer from './reducers/root_reducer';
import configureStore from './store/store';
import Root from './components/root';
import * as SessionActions from './actions/session_actions';

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById('root');
  const store = configureStore();
  window.login = SessionActions.login; //TEST
  window.signup = SessionActions.signup; //TEST
  window.logout = SessionActions.logout; //TEST
  window.getState = store.getState; //TEST
  window.dispatch = store.dispatch; //TEST
  ReactDOM.render(<Root store={store}/>, root);
});
