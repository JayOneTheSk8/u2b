import { RECEIVE_USER } from '../actions/session_actions';
import { RECEIVE_VIDEO, RECEIVE_VIDEOS, RECEIVE_USER_VIDEOS, RECEIVE_SUBSCRIPTIONS, RECEIVE_PLAYLIST } from '../actions/video_actions';
import { merge } from 'lodash';

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_USER:
      return merge({}, state, { [action.currentUser.id]: action.currentUser });
    case RECEIVE_VIDEO:
      const authors = action.authors || {};
      return merge(
        {},
        state,
        { [action.uploader.id]: action.uploader },
        authors,
        action.related.uploaders
      );
    case RECEIVE_SUBSCRIPTIONS:
      return merge({}, state, action.uploaders)
    case RECEIVE_PLAYLIST:
    case RECEIVE_USER_VIDEOS:
    case RECEIVE_VIDEOS:
      return merge({}, state, action.uploaders);
    default:
      return state;
  }
};
