import { RECEIVE_COMMENT, REMOVE_COMMENT } from '../actions/comment_actions';
import { RECEIVE_VIDEO } from '../actions/video_actions';
import { merge } from 'lodash';

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_VIDEO:
      const comments = action.comments || {};
      return comments;
    case RECEIVE_COMMENT:
      return merge({}, state, { [action.comment.id]: action.comment });
    case REMOVE_COMMENT:
      let newState = merge({}, state);
      delete newState[action.commentId];
      return newState;
    default:
      return state;
  }
};
