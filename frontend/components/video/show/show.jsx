import React from 'react';

class Show extends React.Component {
  componentDidMount() {
    this.props.fetchVideo(this.props.match.params.videoId);
  }

  render() {
    return (
      <div>
        <p>
          { JSON.stringify(this.props.video) }
        </p>
      </div>
    );
  }
}

export default Show;
