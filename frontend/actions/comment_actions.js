import * as CommentAPIUtil from '../util/comment_api_util';

export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';
export const RECEIVE_COMMENT_ERRORS = 'RECEIVE_COMMENT_ERRORS';
export const REMOVE_COMMENT_ERRORS = 'REMOVE_COMMENT_ERRORS';

const receiveComment = (comment) => {
  return {
    type: RECEIVE_COMMENT,
    comment
  };
};

const removeComment = (comment) => {
  return {
    type: REMOVE_COMMENT,
    commentId: comment.id
  };
};

export const receiveCommentErrors = (errors) => {
  return {
    type: RECEIVE_COMMENT_ERRORS,
    errors
  };
}

export const removeCommentErrors = () => {
  return {
    type: REMOVE_COMMENT_ERRORS
  };
}

export const postComment = (videoId, comment) => dispatch => {
  return CommentAPIUtil.postComment(videoId, comment).then(
    (comment) => dispatch(receiveComment(comment)),
    (errors) => dispatch(receiveCommentErrors(errors.responseJSON))
  );
};

export const editComment = (videoId, comment) => (dispatch) => {
  return CommentAPIUtil.editComment(videoId, comment).then(
    (comment) => dispatch(receiveComment(comment)),
    (errors) => dispatch(receiveCommentErrors(errors.responseJSON))
  );
};

export const deleteComment = (videoId, comment) => (dispatch) => {
  return CommentAPIUtil.removeComment(videoId, comment).then(comment => dispatch(removeComment(comment)));
};
