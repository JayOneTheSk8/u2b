import React from 'react';
import SignoutIcon from './signout_icon';
import { connect } from 'react-redux';
import * as SessionActions from '../../actions/session_actions';

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (e) => dispatch(SessionActions.logout())
  };
};

class UserDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = { status: "unhovered" };
    this.hover = this.hover.bind(this);
    this.unhover = this.unhover.bind(this);
  }

  hover(e) {
    this.setState({ status: "hovered" });
  }

  unhover(e) {
    this.setState({ status: "unhovered" });
  }

  render() {
    return (
      <ul className="user-dropdown">
        <li>Account Details</li>
        <li>Manage Subscriptions</li>
        <li className={`logout-li-${this.state.status}`}>
          <button onMouseEnter={this.hover} onMouseLeave={this.unhover} className={`logout-text`} onClick={this.props.logout}>
            <SignoutIcon />
            Log Out
          </button>
        </li>
      </ul>
    );
  }
}


export default connect(null, mapDispatchToProps)(UserDropdown);
