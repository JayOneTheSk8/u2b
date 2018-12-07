import React from 'react';
import MinimisedVideo from './show/minimised_video';
import VideoListPanel from './video_list_panel';

class VideoIndex extends React.Component {
  componentDidMount() {
    this.props.clearVideos();
    this.props.fetchVideos();
  }

  render() {
    const recommended = this.props.recommended.map(video => {
      return <MinimisedVideo key={video.id} video={video} />;
    });
    const latest = this.props.latest.map(video => {
      return <MinimisedVideo key={video.id} video={video} />;
    });
    const trending = this.props.trending.map(video => {
      return <MinimisedVideo key={video.id} video={video} />;
    });
    const username = this.props.currentUser.username;
    const recommendedTitle = (username ? `Recommended for ${username}` : "Recommended")
    return (
      <>
        <VideoListPanel videos={recommended} title={recommendedTitle} />
        <VideoListPanel videos={latest} title={"Recently Uploaded"} />
        <VideoListPanel videos={trending} title={"Now Trending"} />
      </>
    );
  }
}

export default VideoIndex;
