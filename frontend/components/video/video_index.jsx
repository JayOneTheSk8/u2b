import React from 'react';
import MinimisedVideo from './show/minimised_video';
import VideoListPanel from './video_list_panel';
import VideoGroup from './video_group';

class VideoIndex extends React.Component {
  componentWillMount() {
    this.props.fetchVideos();
  }

  render() {
    const recommended = this.props.recommended.map(video => {
      return <MinimisedVideo key={`recommended${video.id}`} video={video} />;
    });
    const latest = this.props.latest.map(video => {
      return <MinimisedVideo key={`latest${video.id}`} video={video} />;
    });
    const trending = this.props.trending.map(video => {
      return <MinimisedVideo key={`trending${video.id}`} video={video} />;
    });
    const username = this.props.currentUser.username;
    const recommendedTitle = (username ? `Recommended for ${username}` : "Recommended")
    return (
      <div className="video-index">
        <VideoGroup videos={recommended} title={recommendedTitle} />
        <VideoGroup videos={latest} title={"Recently Uploaded"} />
        <VideoGroup videos={trending} title={"Now Trending"} />
      </div>
    );
  }
}

export default VideoIndex;
