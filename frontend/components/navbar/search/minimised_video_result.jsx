import React from 'react';
import { withRouter, Link } from 'react-router-dom';

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
      <li>
        <Link to={`/videos/${this.video.id}`}>
          <div className="to-video"></div>
        </Link>
        <div className="searchlink-to-video">
          <img className="search-thumbnail" src={this.video.imageUrl} />
          <div className="search-info">
            <p className="search-title">{this.video.title}</p>
            <div className="uploader-views-age">
              <Link className="to-profile" to={`/users/${this.video.uploader_id}/videos`}>
                <p className="search-uploader">{this.video.uploaderName}</p>
              </Link>
              <p className="point-divider">.</p>
              <p>
                {this.video.views === 1 ? `${this.video.views} view` : `${this.video.views} views`}
              </p>
              <p className="point-divider">.</p>
              <p className="search-age">{this.video.age}</p>
            </div>
              <p className="search-description">
                {this.video.description}
              </p>
          </div>
        </div>
      </li>
    );
  }
}

export default withRouter(MinimisedVideoResult);
