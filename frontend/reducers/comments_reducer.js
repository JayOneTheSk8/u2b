import { RECEIVE_COMMENT, REMOVE_COMMENT } from '../actions/comment_actions';
import { RECEIVE_VIDEO } from '../actions/video_actions';
import { merge } from 'lodash';

const defaultState = {}

export default (state = defaultState, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_VIDEO:
      const comments = (action.comments || {});
      return comments
    case RECEIVE_COMMENT:
      let comment = { [action.comment.id]: action.comment };
      return merge({}, state, comment);
    case REMOVE_COMMENT:
      let newState = merge({}, state);
      delete newState[commentId];
      return newState;
    default:
      return state;
  };
};
