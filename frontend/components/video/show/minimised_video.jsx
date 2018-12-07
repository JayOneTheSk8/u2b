import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteVideo } from '../../../actions/video_actions';

const mapDispatchToProps = dispatch => {
  return {
    deleteVideo: id => dispatch(deleteVideo(id)),
  };
};

class MinimisedVideo extends React.Component {
  constructor(props) {
    super(props);
    this.video = this.props.video;
    this.redirectToForm = this.redirectToForm.bind(this);
    this.removeVideo = this.removeVideo.bind(this);
  }

  directToProfile(uploaderId) {
    return e => {
      this.props.history.push(`/users/${uploaderId}/videos`);
    };
  }

  redirectToForm(e) {
    this.props.history.push(`/videos/${this.video.id}/edit`);
  }

  removeVideo(e) {
    e.preventDefault();
    const confirmDelete = prompt(
      'Are you sure you want to delete your video? (Y/N)'
    );
    if (confirmDelete.toUpperCase()[0] === 'Y') {
      this.props
        .deleteVideo(this.video.id)
        .then(action => this.props.history.push('/'));
    } else {
      return null;
    }
  }

  editButtons() {
    return (
      <div className="editButtons">
        <button onClick={this.redirectToForm} className="edit-comment">
          EDIT
        </button>
        <button onClick={this.removeVideo} className="delete-comment">
          DELETE
        </button>
      </div>
    );
  }

  toProfileButton() {
    const pathArray = this.props.location.pathname.split('/').slice(1);
    if (pathArray.length === 3) {
      if (pathArray[0] === 'users' && pathArray[2] === 'videos') {
        return null;
      }
    }
    return (
      <button
        className="video-to-profile"
        onClick={this.directToProfile(this.video.uploader_id)}
      >
        <p className="mini-uploader">{this.video.uploaderName}</p>
      </button>
    );
  }

  render() {
    const updateVideoButtons =
      this.props.editable === true ? this.editButtons() : '';
    return (
      <li className="minimised-video">
        <Link to={`/videos/${this.video.id}`}>
          <img className="video-thumbnail" src={this.video.imageUrl} />
          <p className="mini-title">{this.video.title}</p>
        </Link>
        {this.toProfileButton()}
        <Link className="views-age" to={`/videos/${this.video.id}`}>
          <p className="mini-views">
            {this.video.views === 1 ? `${this.video.views} view` : `${this.video.views} views`}
          </p>
          <p className="mini-divider">.</p>
          <p className="mini-age">{this.video.age}</p>
        </Link>
        {updateVideoButtons}
      </li>
    );
  }
}

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(MinimisedVideo)
);
