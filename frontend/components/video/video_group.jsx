import React from 'react';
import MinimisedVideo from './show/minimised_video';

const VideoGroup = (props) => {
  if (props.videos.length === 0) {
    return null;
  }
  return (
    <section className="video-group">
      <h1 className="group-title">{props.title}</h1>
      <ul className="grouped-videos">
        {props.videos}
      </ul>
      <div className="group-divider"></div>
    </section>
  );
};

export default VideoGroup;
