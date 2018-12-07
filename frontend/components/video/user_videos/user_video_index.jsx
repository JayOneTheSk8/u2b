import React from 'react';
import MinimisedVideo from '../show/minimised_video';

class UserVideoIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = { lastPage: null, videoCount: 0 };
  }

  componentDidMount() {
    this.props.clearVideos();
    this.props.fetchUserVideos(this.props.videoUploaderId);
  }

  componentDidUpdate() {
    if (this.state.lastPage !== this.props.location.pathname) {
      this.setState({ lastPage: this.props.location.pathname });
      this.props.clearVideos();
      this.props.fetchUserVideos(this.props.match.params.userId);
    }
  }

  render() {
    const videos = this.props.videos.map(video => {
      return (
        <MinimisedVideo
          editable={this.props.editSession}
          key={video.id}
          video={video}
        />
      );
    });
    return (
      <>
        <h1 className="uploader-name">{this.props.videoUploader.username} Uploads</h1>
        <ul className="user-video-list">{videos.reverse()}</ul>
      </>
    );
  }
}

export default UserVideoIndex;
