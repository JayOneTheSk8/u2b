import React from 'react';
import MinimisedVideo from '../show/minimised_video';

class UserVideoIndex extends React.Component {
  componentDidMount() {
    this.props.fetchUserVideos(this.props.videoUploader);
  }

  componentWillUnmount() {
    this.props.clearVideos();
  }

  render() {
    const videos = this.props.videos.map((video) => {
      return (
        <MinimisedVideo key={video.id} video={video}/>
      );
    });
    return (
      <>
        <ul className="video-list">
          {videos}
        </ul>
      </>
    );
  }
}

export default UserVideoIndex;
