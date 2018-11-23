import { RECEIVE_USER } from '../actions/session_actions';
import { RECEIVE_VIDEO, RECEIVE_VIDEOS } from '../actions/video_actions';
import { merge } from 'lodash';

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_USER:
      return merge({}, state, { [action.currentUser.id]: action.currentUser });
    case RECEIVE_VIDEO:
      const authors = (action.authors || {});
      return merge({}, state, { [action.uploader.id]: action.uploader }, authors);
    case RECEIVE_VIDEOS:
      return merge({}, state, action.uploaders);
    default:
      return state;
  }
};
