import React from 'react';

class VideoIndex extends React.Component {
  render() {
    return (
      <>
        <h1>Welcome {this.props.currentUser.username}</h1>
      </>
    );
  }
}

export default VideoIndex;
