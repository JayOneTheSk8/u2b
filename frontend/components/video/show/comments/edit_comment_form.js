import { connect } from 'react-redux';
import CommentForm from './comment_form';
import { withRouter } from 'react-router-dom';
import { editComment, removeCommentErrors, receiveCommentErrors } from '../../../../actions/comment_actions';
import { clearEdits } from '../../../../actions/comment_ui_actions';

const defaultState = { body: '' }

const mapStateToProps = (state, ownProps) => {
  const editableComment = state.commentUI.editableComment;
  const comment = (state.entities.comments[editableComment] || defaultState);
  return {
    comment: { body: comment.body },
    errors: state.errors.comments,
    buttonText: "SAVE",
    loggedIn: Boolean(state.session.currentUserId),
    originalComment: comment.body,
    editableComment: state.commentUI.editableComment
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submitAction: (videoId, comment) => dispatch(editComment(videoId, comment)),
    removeCommentErrors: () => dispatch(removeCommentErrors()),
    receiveCommentErrors: (errors) => dispatch(receiveCommentErrors(errors)),
    clearEdits: () => dispatch(clearEdits())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentForm));
