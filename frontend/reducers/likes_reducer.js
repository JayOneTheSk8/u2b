import { ADD_LIKE, REMOVE_LIKE } from '../actions/like_actions';
import { RECEIVE_VIDEO } from '../actions/video_actions';
import { merge } from 'lodash';

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_VIDEO:
      return action.likes;
    case ADD_LIKE:
      return merge({}, state, { [action.like.id]: action.like });
    case REMOVE_LIKE:
      let newState = merge({}, state);
      delete newState[likeId];
      return newState;
    default:
      return state;
  }
};
