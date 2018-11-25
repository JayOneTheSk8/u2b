import { ADD_LIKE, REMOVE_LIKE, RECEIVE_LIKES } from '../actions/like_actions';
import { RECEIVE_VIDEO } from '../actions/video_actions';
import { merge } from 'lodash';

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_LIKES:
      return (action.likes || {});
    case RECEIVE_VIDEO:
      if (!action.likes) {
        return {};
      }
      const likes = Object.keys(action.likes).map(id => action.likes[id]);
      const mappedLikes = {};
      for (let i = 0; i < likes.length; i++) {
        mappedLikes[likes[i].user_id] = likes[i];
      }
      return mappedLikes;
    case ADD_LIKE:
      return merge({}, state, { [action.like.user_id]: action.like });
    case REMOVE_LIKE:
      let newState = merge({}, state);
      delete newState[action.userId];
      return newState;
    default:
      return state;
  }
};
