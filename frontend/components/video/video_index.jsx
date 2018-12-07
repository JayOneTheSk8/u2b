import React from 'react';
import MinimisedVideo from './show/minimised_video';
import VideoListPanel from './video_list_panel';

class VideoIndex extends React.Component {
  componentDidMount() {
    this.props.clearVideos();
    this.props.fetchVideos();
  }

  render() {
    const videos = this.props.videos.map(video => {
      return <MinimisedVideo key={video.id} video={video} />;
    });
    return (
      <>
        <VideoListPanel videos={videos} title={`Recommended for ${this.props.currentUser.username}`} />
      </>
    );
  }
}

export default VideoIndex;
