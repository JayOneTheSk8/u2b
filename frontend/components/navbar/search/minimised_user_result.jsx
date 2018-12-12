import React from 'react';
import { Link } from 'react-router-dom';
import SubscribeButton from '../../session/subscribe_button';

class MinimsedUserResult extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li className="found-user">
        <figure className={`found-user-border-${this.props.border}`}>
          <div className={`found-user-circle-${this.props.circle}`}>
            <p className={`found-user-letter-${this.props.letter}`}>{this.props.username[0].toUpperCase()}</p>
          </div>
        </figure>
        <section className="user-subs-videos">
          <Link to={`/users/${this.props.userId}/videos`}>
            <div className="to-user-profile"></div>
          </Link>
          <p className="found-username">{this.props.username}</p>
          <div className="subscriber-video-count">
            <p>{this.props.subCount === 1 ? `${this.props.subCount} subscriber` : `${this.props.subCount} subscribers`}</p>
            <p className="point-divider">.</p>
            <p>{this.props.videoCount === 1 ? `${this.props.videoCount} video` : `${this.props.videoCount} videos`}</p>
          </div>
        </section>
        <figure className="found-sub-button">
          <SubscribeButton found={true} subscriptions={this.props.subscriptions} channelId={this.props.userId}/>
        </figure>
      </li>
    );
  }
}

export default MinimsedUserResult;
