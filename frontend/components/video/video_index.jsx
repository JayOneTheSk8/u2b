import React from 'react';
import { Link } from 'react-router-dom';

class VideoIndex extends React.Component {

  render() {
    return (
      <>
        <h1 className="greeting">Welcome to U2B! {this.props.currentUser.username}</h1>
        
      </>
    );
  }
}

export default VideoIndex;
