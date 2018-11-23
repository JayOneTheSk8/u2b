import { connect } from 'react-redux';
import CommentForm from './comment_form';
import { editComment, removeCommentErrors, receiveCommentErrors } from '../../../../actions/comment_actions';
import { withRouter } from 'react-router-dom';

const defaultState = { body: '' }

const mapStateToProps = (state, ownProps) => {
  const comment = ownProps.comment || defaultState;
  return {
    comment,
    errors: state.errors.comments,
    buttonText: "SAVE",
    loggedIn: Boolean(state.session.currentUserId)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submitAction: (videoId, comment) => dispatch(editComment(videoId, comment)),
    removeCommentErrors: () => dispatch(removeCommentErrors()),
    receiveCommentErrors: (errors) => dispatch(receiveCommentErrors(errors))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentForm));
