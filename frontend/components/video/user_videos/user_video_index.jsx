import React from 'react';
import MinimisedVideo from '../show/minimised_video';
import VideoGroup from '../video_group';
import { Link } from 'react-router-dom';
import SubscribeButton from '../../session/subscribe_button';

class UserVideoIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = { lastPage: null, videoCount: 0 };
  }

  componentDidMount() {
    this.props.clearVideos();
    this.props.fetchUserVideos(this.props.videoUploaderId);
  }

  componentDidUpdate() {
    if (this.state.lastPage !== this.props.location.pathname) {
      this.setState({ lastPage: this.props.location.pathname });
      this.props.clearVideos();
      this.props.fetchUserVideos(this.props.match.params.userId);
    }
  }

  customizeUser() {
    if (this.props.videoUploader.id === this.props.currentUserId) {
      return (
        <Link className="to-edit-user" to={`/users/${this.props.currentUserId}/edit`}>
          <div>CUSTOMIZE</div>
        </Link>
      );
    } else {
      return (
        <SubscribeButton subscribed={Boolean(this.props.subscriptions[this.props.currentUserId])} subscriptions={this.props.subscriptions} channelId={this.props.videoUploaderId}/>
      );
    }
  }

  render() {
    const videos = this.props.videos.map(video => {
      return (
        <MinimisedVideo
          editable={this.props.editSession}
          key={video.id}
          video={video}
        />
      );
    });
    if (videos.length === 0) {
      return (
        <div className="user-index">
          <section className="uploader-edit">
            <h1 className="uploader-name">{this.props.videoUploader.username} Channel</h1>
            { this.customizeUser() }
          </section>
        </div>
      );
    }
    return (
      <div className="user-index">
        <section className="uploader-edit">
          <h1 className="uploader-name">{this.props.videoUploader.username} Channel</h1>
          { this.customizeUser() }
        </section>
        <VideoGroup videos={videos} title="Uploads"/>
      </div>
    );
  }
}

export default UserVideoIndex;
