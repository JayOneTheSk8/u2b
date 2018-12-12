import React from 'react';
import SignoutIcon from './signout_icon';
import { connect } from 'react-redux';
import * as SessionActions from '../../actions/session_actions';
import { fetchUserVideos } from '../../actions/video_actions';
import AccountIcon from './account_icon';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => {
  return {
    currentUserId: state.session.currentUserId,
    status: state.ui.userMenu,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: e => dispatch(SessionActions.logout()),
    fetchUserVideos: userId => dispatch(fetchUserVideos(userId)),
  };
};

class UserDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = { status: 'unhovered' };
    this.hover = this.hover.bind(this);
    this.unhover = this.unhover.bind(this);
    this.toUserVideos = this.toUserVideos.bind(this);
  }

  hover(e) {
    this.setState({ status: 'hovered' });
  }

  unhover(e) {
    this.setState({ status: 'unhovered' });
  }

  toUserVideos(e) {
    const userId = this.props.currentUserId;
    this.props.fetchUserVideos(userId).then(
      (action) => this.props.history.push(`/users/${userId}/videos`)
    );
  }

  render() {
    return (
      <ul className={`user-dropdown-` + this.props.status}>
        <li className={`user-dropdown-li`}>
          <button className={`user-dropdown-text`} onClick={this.toUserVideos}>
            <AccountIcon />
            Your Account
          </button>
        </li>
        <li className={`user-dropdown-li`}>
          <button className={`user-dropdown-text`} onClick={this.props.logout}>
            <SignoutIcon />
            Log Out
          </button>
        </li>
      </ul>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(UserDropdown)
);
