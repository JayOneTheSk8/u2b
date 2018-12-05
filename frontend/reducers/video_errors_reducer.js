import {
  RECEIVE_VIDEO_ERRORS,
  REMOVE_VIDEO_ERRORS,
  RECEIVE_VIDEO,
} from '../actions/video_actions';

export default (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_VIDEO_ERRORS:
      return action.errors;
    case RECEIVE_VIDEO:
    case REMOVE_VIDEO_ERRORS:
      return [];
    default:
      return state;
  }
};
