import React from 'react';
import ReactDOM from 'react-dom';
import RootReducer from './reducers/root_reducer';
import configureStore from './store/store';
import Root from './components/root';
import { fetchSubscriptions } from './actions/video_actions'; //TEST

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  let store;
  if (window.currentUser) {
    const preloadedState = {
      entities: {
        users: { [window.currentUser.id]: window.currentUser },
      },
      session: {
        currentUserId: window.currentUser.id,
        thumbnailInfo: {
          background: window.currentUser.thumbnail_background,
          letter: window.currentUser.thumbnail_letter,
          border: window.currentUser.thumbnail_border
        }
      },
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }
  window.fetchSubscriptions = fetchSubscriptions;
  window.getState = store.getState; //TEST
  window.dispatch = store.dispatch; //TEST
  ReactDOM.render(<Root store={store} />, root);
});
