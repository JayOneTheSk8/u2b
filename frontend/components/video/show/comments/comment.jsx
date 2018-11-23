import React from 'react';
import { connect } from 'react-redux';
import EditCommentForm from './edit_comment_form';

const mapStateToProps = state => {
  return {
    currentUserId: state.session.currentUserId
  };
};

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = { status: "read-only", comment: this.props.comment };
    this.editComment = this.editComment.bind(this);
    this.revertForm = this.revertForm.bind(this);
  }

  editComment(e) {
    e.preventDefault();
    this.setState({ status: "edit" });
  }

  revertForm(e) {
    e.preventDefault();
    this.setState({ status: "read-only" });
  }

  renderEditButton() {
    if (this.state.comment.author_id === this.props.currentUserId) {
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
    const comment = this.state.comment;

    if (this.state.status === "edit") {
      return (
        <>
          <EditCommentForm comment={comment}/>
          <button className="cancel-comment" onClick={this.revertForm}>CANCEL</button>
        </>
      );
    }

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

export default connect(mapStateToProps, null)(Comment);
