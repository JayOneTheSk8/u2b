import React from 'react';
import ReactDOM from 'react-dom';
import RootReducer from './reducers/root_reducer';
import configureStore from './store/store';
import Root from './components/root';
import * as VideoAPIUtil from './util/video_api_util';

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById('root');
  let store;
  if (window.currentUser) {
    const preloadedState = {
      entities: {
        users: { [window.currentUser.id]: window.currentUser }
      },
      session: { currentUserId: window.currentUser.id }
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }
  window.fetchVideo = VideoAPIUtil.fetchVideo;
  window.getState = store.getState; //TEST
  window.dispatch = store.dispatch; //TEST
  ReactDOM.render(<Root store={store}/>, root);
});
