import React from 'react';
import { connect } from 'react-redux';
import EditCommentForm from './edit_comment_form';
import { createEditComment, clearEdits } from '../../../../actions/comment_ui_actions';

const mapStateToProps = state => {
  return {
    currentUserId: state.session.currentUserId,
    editableComment: state.commentUI.editableComment
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createEditComment: (commentId) => dispatch(createEditComment(commentId))
  };
};

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.editComment = this.editComment.bind(this);
    this.revertForm = this.revertForm.bind(this);
  }

  editComment(e) {
    e.preventDefault();
    this.props.createEditComment(this.props.comment.id);
  }

  revertForm(e) {
    e.preventDefault();
    this.setState({ status: "read-only" });
  }

  renderEditButton() {
    if (this.props.comment.author_id === this.props.currentUserId) {
      return (
        <>
          <button className="edit-comment" onClick={this.editComment}>EDIT</button>
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
          <EditCommentForm comment={comment}/>
        </>
      );
    }
    const comment = this.props.comment;
    return (
      <li className="comment">
        <div className="author-age">
          <p className="comment-author">{comment.authorName}</p>
          <p className="comment-age">{comment.age}</p>
        </div>
        <p className="comment-body">{comment.body}</p>
        { this.renderEditButton() }
      </li>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
