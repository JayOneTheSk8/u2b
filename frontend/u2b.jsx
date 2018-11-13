import React from 'react';
import ReactDOM from 'react-dom';
import * as SessionApiUtil from './util/session_api_util';

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById('root');
  {/*const store = configureStore();*/}
  window.logout = SessionApiUtil.logout //TEST
  window.login = SessionApiUtil.login //TEST
  window.signup = SessionApiUtil.signup //TEST
  ReactDOM.render(<Root store={store}/>, root);
});
