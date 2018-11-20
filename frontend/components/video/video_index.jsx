import React from 'react';
import { Link } from 'react-router-dom';

class VideoIndex extends React.Component {

  componentDidMount() {
    this.props.fetchVideos();
  }

  render() {

    const videos = this.props.videos.map((video) => {
      return (
        <li key={video.id}>
          <Link to={`/videos/${video.id}`}>
            <video width='100'>
              <source src={video.videoUrl}/>
            </video>
          </Link>
        </li>
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
