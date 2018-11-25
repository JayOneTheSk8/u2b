import { ADD_LIKE, REMOVE_LIKE } from '../actions/like_actions';
import { RECEIVE_VIDEO } from '../actions/video_actions';
import { merge } from 'lodash';

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case ADD_LIKE:
      console.log(merge({}, state, { [action.like.id]: true }));
      return merge({}, state, { [action.like.id]: true });
    case REMOVE_LIKE:
      let newState = merge({}, state);
      delete newState[action.likeId];
      console.log(newState);
      return newState;
    case RECEIVE_VIDEO:
      return {};
    default:
      console.log(state);
      return state;
  }
}
