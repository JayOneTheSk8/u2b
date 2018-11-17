import React from 'react';
import { Link } from 'react-router-dom';

class VideoIndex extends React.Component {

  sessionButton(){
    if (this.props.loggedIn) {
      return(
        <button className="session-change" onClick={this.props.logout}>Logout</button>
      );
    } else {
      return(
        <Link className="session-change" to='/signup'>Sign Up</Link>
      );
    }
  }

  render() {
    return (
      <>
        <h1 className="greeting">Welcome to U2B! {this.props.currentUser.username}</h1>
        { this.sessionButton() }
      </>
    );
  }
}

export default VideoIndex;
