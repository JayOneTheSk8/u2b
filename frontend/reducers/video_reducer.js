import { RECEIVE_VIDEO, RECEIVE_VIDEOS, REMOVE_VIDEO, CLEAR_VIDEOS } from '../actions/video_actions';
import { merge } from 'lodash';

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_VIDEOS:
      return merge({}, state, action.videos);
    case RECEIVE_VIDEO:
      return { [action.video.id]: action.video };
    case CLEAR_VIDEOS:
      return {};
    case REMOVE_VIDEO:
      let newState = merge({}, state);
      delete newState[action.videoId];
      return newState;
    default:
      debugger
      return state;
  }
};
