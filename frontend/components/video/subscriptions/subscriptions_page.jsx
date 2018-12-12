import React from 'react';
import MinimisedVideo from '../show/minimised_video';
import VideoGroup from '../video_group';

class SubscriptionsPage extends React.Component {
  componentDidMount() {
    this.props.fetchSubscriptions(this.props.currentUserId);
  }

  render() {
    const todayVideos = this.props.videos
      .filter(
        video => video.age.includes('minute') || video.age.includes('hour')
      )
      .map(video => {
        return <MinimisedVideo key={video.id} video={video} />;
      });

    const yesterdayVideos = this.props.videos
      .filter(video => video.age.startsWith('1 day'))
      .map(video => {
        return <MinimisedVideo key={video.id} video={video} />;
      });

    const weekVideos = this.props.videos
      .filter(
        video =>
          video.age.startsWith('2 day') ||
          video.age.startsWith('3 day') ||
          video.age.startsWith('4 day') ||
          video.age.startsWith('5 day') ||
          video.age.startsWith('6 day')
      )
      .map(video => {
        return <MinimisedVideo key={video.id} video={video} />;
      });

    const earlierVideos = this.props.videos
      .filter(
        video =>
          !video.age.startsWith('1 day') &&
          !video.age.includes('minute') &&
          !video.age.includes('hour') &&
          !video.age.startsWith('2 day') &&
          !video.age.startsWith('3 day') &&
          !video.age.startsWith('4 day') &&
          !video.age.startsWith('5 day') &&
          !video.age.startsWith('6 day')
      )
      .map(video => {
        return <MinimisedVideo key={video.id} video={video} />;
      });
    if (this.props.videos.length === 0) {
      return (
        <div className="null-area">
          <p className="no-results">No Subscriptions Yet :(</p>
        </div>
      );
    }
    return (
      <div className="subscriptions">
        <VideoGroup title="Today" videos={todayVideos} />
        <VideoGroup title="Yesterday" videos={yesterdayVideos} />
        <VideoGroup title="This Week" videos={weekVideos} />
        <VideoGroup title="Earlier" videos={earlierVideos} />
      </div>
    );
  }
}

export default SubscriptionsPage;
