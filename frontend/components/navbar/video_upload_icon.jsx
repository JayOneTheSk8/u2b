import React from 'react';
import { Link } from 'react-router-dom';

// create a route for upload in app
// make a video upload and link it to the create ajax request

const VideoUploadIcon = (props) => {
  return (
    <Link className="whole-camera" to="/upload">
      <div className="camera-body"></div>
      <div className="lens"></div>
      <div className="plus">+</div>
    </Link>
  );
};

export default VideoUploadIcon;
