export const CREATE_EDIT_COMMENT = 'CREATE_EDIT_COMMENT';
export const CLEAR_EDITS = 'CLEAR_EDITS';

export const createEditComment = commentId => dispatch => {
  return dispatch({ type: CREATE_EDIT_COMMENT, commentId });
};

export const clearEdits = () => {
  return dispatch({ type: CLEAR_EDITS });
};
