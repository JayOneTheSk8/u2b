import React from 'react';

class UploadArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = { status: 'unhovered' };
    this.reddenBackground = this.reddenBackground.bind(this);
    this.revertBackground = this.revertBackground.bind(this);
  }

  reddenBackground(e) {
    this.setState({ status: 'hovered' });
  }

  revertBackground(e) {
    this.setState({ status: 'unhovered' });
  }

  render() {
    return (
      <label
        onMouseEnter={this.reddenBackground}
        onMouseLeave={this.revertBackground}
        className="upload-area"
        htmlFor="video-upload"
      >
        <div className="pointer" />
        <div className="arrow-body" />
        <div className={'border-' + this.state.status} />
        <div className="upload-message">
          <p>Click to Upload Videos</p>
        </div>
      </label>
    );
  }
}

export default UploadArea;
