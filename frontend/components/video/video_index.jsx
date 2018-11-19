import React from 'react';
import { Link } from 'react-router-dom';

class VideoIndex extends React.Component {

  componentDidMount() {
    this.props.fetchVideos();
  }

  render() {
    const videos = this.props.videos.map((video) => {
      return (
        <li key={video.id}>{JSON.stringify(video)}</li>
      );
    });
    return (
      <>
        <h1 className="greeting">Welcome to U2B! {this.props.currentUser.username}</h1>
        <ul>
          {videos}
        </ul>
      </>
    );
  }
}

export default VideoIndex;
