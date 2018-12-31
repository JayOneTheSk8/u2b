import React from 'react';
import { connect } from 'react-redux';
import {
  addSubscription,
  removeSubscription,
  attachSubscription,
  detachSubscription,
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
    attachSubscription: channelId => dispatch(attachSubscription(channelId)),
    detachSubscription: (channelId, subId) => dispatch(detachSubscription(channelId, subId)),
  };
};

class SubscribeButton extends React.Component {
  constructor(props) {
    super(props);
    this.subscribe = this.subscribe.bind(this);
    this.unsubscribe = this.unsubscribe.bind(this);
    this.redirectToLogin = this.redirectToLogin.bind(this);
    this.editVideo = this.editVideo.bind(this);
    this.directToChannel = this.directToChannel.bind(this);
  }

  subscribe(e) {
    if (this.props.found) {
      this.props.attachSubscription(this.props.channelId).then(
        (action) => {
          const nextCount = this.state.subCount + 1;
        }
      );
      return;
    }
    this.props.addSubscription(this.props.channelId).then(
      (action) => {
        const newCount = this.state.subCount + 1;
        return;
      }
    );
  }

  unsubscribe(e) {
    if (this.props.found) {
      const subscriptionId = this.props.subscriptions[this.props.userId].id;
      this.props.detachSubscription(this.props.channelId, subscriptionId).then(
        (action) => {
          const nextCount = this.state.subCount - 1;
        }
      );
      return;
    }
    const subId = this.props.subscriptions[this.props.userId].id;
    this.props.removeSubscription(this.props.channelId, subId).then(
      (action) => {
        const newCount = this.state.subCount - 1;
        return;
      }
    );
  }

  redirectToLogin(e) {
    this.props.history.push('/login');
  }

  editVideo(e) {
    this.props.history.push(`/videos/${this.props.videoId}/edit`);
  }

  directToChannel(e) {
    this.props.history.push(`/users/${this.props.channelId}/videos`);
  }

  render() {
    if (!this.props.loggedIn) {
      return (
        <button className="subscribe-button" onClick={this.redirectToLogin}>{`SUBSCRIBE ${this.props.subCount}`}</button>
      );
    } else if (this.props.subscribed) {
      return (
        <button className="subscribed-button" onClick={this.unsubscribe}>{`SUBSCRIBED ${this.props.subCount}`}</button>
      );
    } else if (this.props.channelId === this.props.userId && this.props.videoId) {
      return (
        <button className="edit-video-button" onClick={this.editVideo}>EDIT VIDEO</button>
      );
    } else if (this.props.channelId === this.props.userId) {
      return (
        <button className="edit-video-button" onClick={this.directToChannel}>{`CHANNEL`}</button>
      );
    } else {
      return (
        <button className="subscribe-button" onClick={this.subscribe}>{`SUBSCRIBE ${this.props.subCount}`}</button>
      );
    }
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SubscribeButton));
