import React from 'react';
import ReactDOM from 'react-dom';
import RootReducer from './reducers/root_reducer';
import configureStore from './store/store';
import Root from './components/root';

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById('root');
  const store = configureStore();
  window.getState = store.getState; //TEST
  window.dispatch = store.dispatch; //TEST
  ReactDOM.render(<Root store={store}/>, root);
});
