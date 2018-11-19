import { RECEIVE_VIDEO, RECEIVE_VIDEOS } from '../actions/video_actions';
import { merge } from 'lodash';

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_VIDEOS:
      return merge({}, state, action.videos);
    case RECEIVE_VIDEO:
      return { [action.video.id]: action.video };
    default:
      return state;
  }
};
