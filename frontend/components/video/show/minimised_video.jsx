import React from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';

class MinimisedVideo extends React.Component {
  constructor(props) {
    super(props);
    this.video = this.props.video;
    this.redirectToForm = this.redirectToForm.bind(this);
  }

  directToProfile(uploaderId) {
    return (e) => {
      this.props.history.push(`/users/${uploaderId}/videos`)
    };
  }

  redirectToForm(e) {
    this.props.history.push(`/videos/${this.video.id}/edit`)
  }

  editButtons() {
    return (
      <div className='editButtons'>
        <button onClick={this.redirectToForm} className="edit-comment">EDIT</button>
        <button className="delete-comment">DELETE</button>
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
      <button className="video-to-profile" onClick={this.directToProfile(this.video.uploader_id)}>
        <p className="mini-uploader">{this.video.uploaderName}</p>
      </button>
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
          { this.toProfileButton() }
        <Link to={`/videos/${this.video.id}`}>
          <p className="mini-age">{this.video.age}</p>
        </Link>
        { updateVideoButtons }
      </li>
    );
  }
}

export default withRouter(MinimisedVideo);
