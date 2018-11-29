import React from 'react';
import MinimisedVideo from './show/minimised_video';

class VideoIndex extends React.Component {
  componentDidMount() {
    this.props.clearVideos();
    this.props.fetchVideos();
  }

  render() {
    const videos = this.props.videos.map((video) => {
      return (
        <MinimisedVideo key={video.id} video={video}/>
      );
    });
    return (
      <>
        <h1 className="greeting">Welcome to U2B! {this.props.currentUser.username}</h1>
        <ul className="video-list">
          {videos}
        </ul>
      </>
    );
  }
}

export default VideoIndex;
