import React from 'react';

class Show extends React.Component {
  componentDidMount() {
    this.props.fetchVideo(this.props.match.params.videoId);
  }

  render() {
    if (!this.props.video.videoUrl) { return null; }
    return (
      <div className="video">
        <video className="playing-video" controls>
          <source src={this.props.video.videoUrl}/>
        </video>
        <div className="video-info">
          <p className="title">{this.props.video.title}</p>
          <div className="divider">
            <p className="uploader">{this.props.uploader.username}</p>
            <p className="date">Published on: {this.props.video.upload_date}</p>
            <p className="description">{this.props.video.description}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;
