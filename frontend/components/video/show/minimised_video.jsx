import React from 'react';
import { Link } from 'react-router-dom';

const MinimisedVideo = (props) => {
  const video = props.video
  return (
    <li className="minimised-video">
      <Link to={`/videos/${video.id}`}>
        <video width='150'>
          <source src={video.videoUrl}/>
        </video>
        <p className="mini-title">{video.title}</p>
        <p className="mini-uploader">{video.uploader_name}</p>
        <p className="mini-age">{video.age}</p>
      </Link>
    </li>
  );
};

export default MinimisedVideo;
