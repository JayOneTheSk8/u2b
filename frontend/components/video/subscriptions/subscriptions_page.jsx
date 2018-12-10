import React from 'react';
import MinimisedVideo from '../show/minimised_video';

class SubscriptionsPage extends React.Component {
  componentDidMount() {
    this.props.fetchSubscriptions(this.props.currentUserId);
  }

  render(){
    const videos = this.props.videos.map((video) => {
      return (
        <MinimisedVideo key={video.id} video={video}/>
      );
    });
    return (
      <>
        <p>Subscriptions Page</p>
        <ul>
          {videos}
        </ul>
      </>
    );
  }
}

export default SubscriptionsPage;
