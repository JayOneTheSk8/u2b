import { connect } from 'react-redux';
import CommentForm from './comment_form';
import {
  postComment,
  removeCommentErrors,
} from '../../../../actions/comment_actions';
import { withRouter } from 'react-router-dom';
import { clearEdits } from '../../../../actions/comment_ui_actions';

const mapStateToProps = state => {
  const username = state.entities.users[state.session.currentUserId].username || "";
  const thumbnailInfo = state.session.thumbnailInfo || [];
  return {
    comment: { body: '' },
    errors: state.errors.comments,
    buttonText: 'COMMENT',
    loggedIn: Boolean(state.session.currentUserId),
    username,
    thumbnailInfo,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submitAction: (videoId, comment) => dispatch(postComment(videoId, comment)),
    removeCommentErrors: () => dispatch(removeCommentErrors()),
    clearEdits: e => dispatch(clearEdits()),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CommentForm)
);
