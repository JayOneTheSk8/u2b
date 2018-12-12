import React from 'react';
import MinimisedVideo from '../show/minimised_video';
import VideoGroup from '../video_group';

class SubscriptionsPage extends React.Component {
  componentDidMount() {
    this.props.fetchSubscriptions(this.props.currentUserId);
  }

  render() {
    const todayVideos = this.props.videos
      .filter(video => video.time_ago === 'today')
      .map(video => {
        return <MinimisedVideo key={video.id} video={video} />;
      });

    const yesterdayVideos = this.props.videos
      .filter(video => video.time_ago === 'yesterday')
      .map(video => {
        return <MinimisedVideo key={video.id} video={video} />;
      });

    const weekVideos = this.props.videos
      .filter(video => video.time_ago === 'this week')
      .map(video => {
        return <MinimisedVideo key={video.id} video={video} />;
      });

    const earlierVideos = this.props.videos
      .filter(video => video.time_ago == 'earlier')
      .map(video => {
        return <MinimisedVideo key={video.id} video={video} />;
      });
    if (this.props.videos.length === 0) {
      return (
        <div className="subscriptions">
          <VideoGroup
            message="No Subscribed Videos Yet :("
            title=""
            videos={this.props.videos}
          />
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
