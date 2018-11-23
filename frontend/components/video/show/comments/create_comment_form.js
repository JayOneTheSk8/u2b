import { connect } from 'react-redux';
import CommentForm from './comment_form';
import { postComment, removeCommentErrors, receiveCommentErrors } from '../../../../actions/comment_actions';
import { withRouter } from 'react-router-dom';
import { clearEdits } from '../../../../actions/comment_ui_actions';

const mapStateToProps = state => {
  return {
    comment: { body: '' },
    errors: state.errors.comments,
    buttonText: 'COMMENT',
    loggedIn: Boolean(state.session.currentUserId)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submitAction: (videoId, comment) => dispatch(postComment(videoId, comment)),
    removeCommentErrors: () => dispatch(removeCommentErrors()),
    receiveCommentErrors: (errors) => dispatch(receiveCommentErrors(errors)),
    clearEdits: (e) => dispatch(clearEdits())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentForm));