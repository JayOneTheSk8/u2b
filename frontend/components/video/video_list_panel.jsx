import React from 'react';

const VideoListPanel = (props) => {
  return (
    <div className="list-panel">
      <h2 className="group-title">{props.title}</h2>
      <ul className="videos-list">
        {props.videos}
      </ul>
    </div>
  );
};

export default VideoListPanel;
