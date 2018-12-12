import React from 'react';
import MinimisedVideo from './show/minimised_video';

const VideoGroup = props => {
  if (props.videos.length === 0 && !props.message) {
    return null;
  } else if (props.videos.length === 0) {
    return (
      <section className="video-group">
        <h1 className="group-title">{props.title}</h1>
        <div className="null-area">
          <p className="no-results">{props.message}</p>
        </div>
        <div className="group-divider null" />
      </section>
    );
  }
  return (
    <section className="video-group">
      <h1 className="group-title">{props.title}</h1>
      <ul className="grouped-videos">{props.videos}</ul>
      <div className="group-divider" />
    </section>
  );
};

export default VideoGroup;
