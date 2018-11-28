import React from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';

class MinimisedVideo extends React.Component {
  constructor(props) {
    super(props);
    this.video = this.props.video;
  }

  directToProfile(uploaderId) {
    return (e) => {
      this.props.history.push(`/users/${uploaderId}/videos`)
    };
  }

  editButtons() {
    return (
      <div className='editButtons'>
        <button className="edit-comment">EDIT</button>
        <button className="delete-comment">DELETE</button>
      </div>
    );
  }

  render() {
    const updateVideoButtons = (this.props.editable === true ? this.editButtons() : "");
    return (
      <li className="minimised-video">
        <Link to={`/videos/${this.video.id}`}>
          <video height='84' width='150'>
            <source src={this.video.videoUrl}/>
          </video>
          <p className="mini-title">{this.video.title}</p>
        </Link>
          <button className="video-to-profile" onClick={this.directToProfile(this.video.uploader_id)}>
            <p className="mini-uploader">{this.video.uploaderName}</p>
          </button>
        <Link to={`/videos/${this.video.id}`}>
          <p className="mini-age">{this.video.age}</p>
        </Link>
        { updateVideoButtons }
      </li>
    );
  }
}

{/*
const MinimisedVideo = (props) => {
  const video = props.video
  const updateVideoButtons = (props.editable === true ? editButtons() : "");
  return (
    <li className="minimised-video">
      <Link to={`/videos/${video.id}`}>
        <video height='84' width='150'>
          <source src={video.videoUrl}/>
        </video>
        <p className="mini-title">{video.title}</p>
      </Link>
        <button className="video-to-profile" onClick={directToProfile(video.uploader_id)}>
          <p className="mini-uploader">{video.uploaderName}</p>
        </button>
      <Link to={`/videos/${video.id}`}>
        <p className="mini-age">{video.age}</p>
      </Link>
      { updateVideoButtons }
    </li>
  );
};

function directToProfile(uploaderId) {
  return (e) => {
    return (
      <Redirect to={`/users/${uploaderId}/videos`} />
    );
  };
}

function editButtons() {
}
*/}

export default withRouter(MinimisedVideo);
