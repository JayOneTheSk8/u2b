import React from 'react';
import { connect } from 'react-redux';
import EditCommentForm from './edit_comment_form';
import {
  createEditComment,
  clearEdits,
} from '../../../../actions/comment_ui_actions';
import { deleteComment } from '../../../../actions/comment_actions';
import DefaultUserThumbnail from '../../../session/default_user_thumbnail';

const mapStateToProps = (state, ownProps) => {
  const author = state.entities.users[ownProps.comment.author_id];
  const username = author.username || "";
  const thumbnailInfo = {
    border: author.thumbnail_border,
    background: author.thumbnail_background,
    letter: author.thumbnail_letter,
  } || {};
  const test = state;
  return {
    currentUserId: state.session.currentUserId,
    editableComment: state.commentUI.editableComment,
    username,
    thumbnailInfo,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createEditComment: commentId => dispatch(createEditComment(commentId)),
    deleteComment: (videoId, comment) =>
      dispatch(deleteComment(videoId, comment)),
  };
};

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.editComment = this.editComment.bind(this);
    this.revertForm = this.revertForm.bind(this);
    this.removeComment = this.removeComment.bind(this);
  }

  editComment(e) {
    e.preventDefault();
    this.props.createEditComment(this.props.comment.id);
  }

  revertForm(e) {
    e.preventDefault();
    this.setState({ status: 'read-only' });
  }

  removeComment(e) {
    e.preventDefault();
    const confirmDelete = prompt(
      'Are you sure you want to delete your comment? (Y/N)'
    );
    if (confirmDelete.toUpperCase()[0] === 'Y') {
      this.props.deleteComment(this.props.comment.video_id, this.props.comment);
    } else {
      return null;
    }
  }

  renderEditButton() {
    if (this.props.comment.author_id === this.props.currentUserId) {
      return (
        <>
          <button className="edit-comment" onClick={this.editComment}>
            EDIT
          </button>
          <button className="delete-comment" onClick={this.removeComment}>
            DELETE
          </button>
        </>
      );
    } else {
      return null;
    }
  }

  render() {
    if (this.props.editableComment === this.props.comment.id) {
      return (
        <>
          <EditCommentForm comment={comment} />
        </>
      );
    }
    const comment = this.props.comment;
    return (
      <li className="comment">
        <figure className="author-thumbnail">
          <DefaultUserThumbnail username={this.props.username} thumbnailInfo={this.props.thumbnailInfo} />
        </figure>
        <section className="comment-info">
          <div className="author-age">
            <p className="comment-author">{comment.authorName}</p>
            <p className="comment-age">{comment.age}</p>
          </div>
          <p className="comment-body">{comment.body}</p>
          {this.renderEditButton()}
        </section>
      </li>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comment);
