import React from 'react';
import MinimisedVideo from './show/minimised_video';
import VideoListPanel from './video_list_panel';

class VideoIndex extends React.Component {
  componentDidMount() {
    this.props.clearVideos();
    this.props.fetchVideos();
  }

  render() {
    return (
      <>
        <p>Template</p>
      </>
    );
  }
}

export default VideoIndex;

// const videos = this.props.videos.map(video => {
//   return <MinimisedVideo key={video.id} video={video} />;
// });
// const username = this.props.currentUser.username;
// const recommendedTitle = (username ? `Recommended for ${username}` : "Recommended")
// return (
//   <>
//     <VideoListPanel videos={videos} title={recommendedTitle} />
//   </>
// );
