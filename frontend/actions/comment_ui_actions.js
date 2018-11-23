export const EDIT_COMMENT = "EDIT_COMMENT";
export const CLEAR_EDITS = "CLEAR_EDITS";

export const editComment = (commentId) => dispatch => {
  return dispatch({ type: EDIT_COMMENT, commentId });
};

export const clearEdits = () => {
  return dispatch({ type: CLEAR_EDITS });
};
