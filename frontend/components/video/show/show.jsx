import React from 'react';

class Show extends React.Component {
  componentDidMount() {
    this.props.fetchVideo(this.props.match.params.videoId);
  }

  render() {
    if (!this.props.video.videoUrl) { return null; }
    return (
      <div>
        <video controls width="500">
          <source src={this.props.video.videoUrl}/>
        </video>
        <img src={this.props.video.videoUrl + "#t=0.4"}/>
      </div>
    );
  }
}

export default Show;
