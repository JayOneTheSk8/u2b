import React from 'react';
import { connect } from 'react-redux';
import {
  addSubscription,
  removeSubscription,
} from '../../actions/subscription_actions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => {
  const loggedIn = Boolean(state.session.currentUserId);
  const currentUser = { id: "" };
  if (loggedIn) {
    currentUser.id = state.session.currentUserId;
  }
  return {
    loggedIn,
    currentUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addSubscription: channelId => dispatch(addSubscription(channelId)),
    removeSubscription: (channelId, subId) => dispatch(removeSubscription(channelId, subId)),
  };
};

class SubscribeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subscribed: Boolean(this.props.subscriptions[this.props.currentUser.id]),
      subscriptions: this.props.subscriptions,
      subCount: Object.keys(this.props.subscriptions).length,
      channelId: this.props.channelId,
      userId: this.props.currentUser.id,
    };
    this.subscribe = this.subscribe.bind(this);
    this.unsubscribe = this.unsubscribe.bind(this);
    this.redirectToLogin = this.redirectToLogin.bind(this);
    this.editVideo = this.editVideo.bind(this);
  }

  subscribe(e) {
    this.props.addSubscription(this.state.channelId);
    const newCount = this.state.subCount + 1;
    this.setState({ subscribed: true, subCount: newCount });
  }

  unsubscribe(e) {
    const subId = this.props.subscriptions[this.state.userId].id;
    this.props.removeSubscription(this.state.channelId, subId);
    const newCount = this.state.subCount - 1;
    this.setState({ subscribed: false, subCount: newCount });
  }

  redirectToLogin(e) {
    this.props.history.push('/login');
  }

  editVideo(e) {
    this.props.history.push(`/videos/${this.props.videoId}/edit`)
  }

  render() {
    if (!this.props.loggedIn) {
      return (
        <button className="subscribe-button" onClick={this.redirectToLogin}>{`SUBSCRIBE ${this.state.subCount}`}</button>
      );
    } else if (this.state.subscribed) {
      return (
        <button className="subscribed-button" onClick={this.unsubscribe}>{`SUBSCRIBED ${this.state.subCount}`}</button>
      );
    } else if (this.state.channelId === this.state.userId) {
      return (
        <button className="edit-video-button" onClick={this.editVideo}>EDIT VIDEO</button>
      );
    } else {
      return (
        <button className="subscribe-button" onClick={this.subscribe}>{`SUBSCRIBE ${this.state.subCount}`}</button>
      );
    }
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SubscribeButton));
