import { CREATE_EDIT_COMMENT, CLEAR_EDITS } from '../actions/comment_ui_actions';

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case CREATE_EDIT_COMMENT:
      return { editableComment: action.commentId };
    case CLEAR_EDITS:
      return { editableComment: null };
    default:
      return state;
  };
};
