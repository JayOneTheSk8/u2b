import React from 'react';
import Comment from './comments/comment';
import CreateCommentForm from './comments/create_comment_form';

class Show extends React.Component {
  componentDidMount() {
    this.props.fetchVideo(this.props.match.params.videoId);
  }

  commentList(){
    const comments = this.props.comments.map(comment => {
      return (
        <Comment key={comment.id} comment={comment}/>
      );
    });
    return comments.reverse();
  }

  render() {
    if (!this.props.video.videoUrl) { return null; }
    return (
      <div className="video">
        <video className="playing-video" controls>
          <source src={this.props.video.videoUrl}/>
        </video>
        <div className="video-info">
          <p className="title">{this.props.video.title}</p>
          <div className="divider">
            <p className="uploader">{this.props.uploader.username}</p>
            <p className="date">Published on: {this.props.video.upload_date}</p>
            <p className="description">{this.props.video.description}</p>
          </div>
        </div>
        <CreateCommentForm />
        <ul className="comment-list">
          { this.commentList() }
        </ul>
      </div>
    );
  }
}

export default Show;
