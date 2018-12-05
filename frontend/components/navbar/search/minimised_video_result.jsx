import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

class MinimisedVideoResult extends React.Component {
  constructor(props) {
    super(props);
    this.video = this.props.video;
  }

  directToProfile(uploaderId) {
    return e => {
      this.props.history.push(`/users/${uploaderId}/videos`);
    };
  }

  render() {
    return (
      <li className="search-result-video">
        <div className="searchlink-to-video">
          <Link to={`/videos/${this.video.id}`}><img className="search-thumbnail" src={this.video.imageUrl} /></Link>
          <div className="search-info">
            <Link to={`/videos/${this.video.id}`}><p className="search-title">{this.video.title}</p></Link>
            <div className="uploader-views-age">
              <Link
                to={`/users/${this.video.uploader_id}/videos`}
                className="search-to-profile"
                >
                <p className="search-uploader">{this.video.uploaderName}</p>
              </Link>
              <p className="point-divider">.</p>
              <Link to={`/videos/${this.video.id}`}>
                <p className="search-age">{this.video.age}</p>
              </Link>
            </div>
            <Link to={`/videos/${this.video.id}`}><p className="search-description">{this.video.description}</p></Link>
          </div>
        </div>
      </li>
    );
  }
}

export default withRouter(MinimisedVideoResult);
