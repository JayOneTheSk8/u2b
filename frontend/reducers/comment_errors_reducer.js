import { RECEIVE_COMMENT, RECEIVE_COMMENT_ERRORS, REMOVE_COMMENT_ERRORS } from '../actions/comment_actions';
import { CLEAR_EDITS } from '../actions/comment_ui_actions';

export default (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_COMMENT_ERRORS:
      return action.errors;
    case RECEIVE_COMMENT:
    case REMOVE_COMMENT_ERRORS:
      return [];
    default:
      return state;
  }
};
