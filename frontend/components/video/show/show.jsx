import React from 'react';
import { withRouter } from 'react-router-dom';
import Comment from './comments/comment';
import CreateCommentForm from './comments/create_comment_form';
import TitleArea from './title_area_container';
import RelatedVideoItem from './related_video';
import DefaultUserThumbnail from '../../session/default_user_thumbnail';
import SubscribeButton from '../../session/subscribe_button';

class Show extends React.Component {
  constructor(props) {
    super(props);
    this.state = { location: null };
    this.directToProfile = this.directToProfile.bind(this);
  }

  componentDidMount() {
    this.props.fetchVideo(this.props.match.params.videoId);
    this.setState({ location: this.props.location.pathname });
  }

  componentDidUpdate() {
    if (this.props.location.pathname !== this.state.location) {
      this.props.fetchVideo(this.props.match.params.videoId);
      this.setState({ location: this.props.location.pathname });
    }
  }

  commentList() {
    const comments = this.props.comments.map(comment => {
      return <Comment key={comment.id} comment={comment} />;
    });
    return comments.reverse();
  }

  directToProfile(e) {
    const userId = this.props.video.uploader_id;
    this.props.fetchUserVideos(userId).then(
      (action) => this.props.history.push(`/users/${userId}/videos`)
    );
  }

  render() {
    if (!this.props.video.videoUrl) {
      return null;
    }
    const relatedVideos = this.props.relatedVideos.map(video => {
      return <RelatedVideoItem key={video.id} video={video} />;
    });
    return (
      <div className="video-and-related">
        <div className="video">
          <video className="playing-video" controls>
            <source src={this.props.video.videoUrl} />
          </video>
          <div className="video-info">
            <TitleArea
              videoId={this.props.video.id}
              title={this.props.video.title}
              views={this.props.video.views}
            />
            <div className="divider">
              <div className="uploader-thumbnail-date">
                <section className="upload-info">
                  <figure className="uploader-thumbnail">
                    <DefaultUserThumbnail
                      username={this.props.uploader.username}
                      thumbnailInfo={this.props.thumbnailInfo}
                    />
                  </figure>
                  <article className="uploader-date">
                    <div className="to-uploader-profile" onClick={this.directToProfile}>
                      <p className="uploader">{this.props.uploader.username}</p>
                    </div>
                    <p className="date">
                      Published on: {this.props.video.upload_date}
                    </p>
                  </article>
                </section>
                <SubscribeButton
                  channelId={this.props.uploader.id}
                  subscribed={Boolean(this.props.subscriptions[this.props.currentUserId])}
                  subscriptions={this.props.subscriptions}
                  userId={this.props.currentUserId}
                  videoId={this.props.match.params.videoId}
                  subCount={
                    this.props.subscriptions
                    ? Object.keys(this.props.subscriptions).length
                    : 0
                  }
                />
              </div>
              <p className="description">{this.props.video.description}</p>
            </div>
          </div>
          <CreateCommentForm />
          <ul className="comment-list">{this.commentList()}</ul>
        </div>

        <ul className="related-video-list">{relatedVideos}</ul>
      </div>
    );
  }
}

export default withRouter(Show);
