import React from 'react';
import { Link } from 'react-router-dom';

const RelatedVideoItem = (props) => {
  const video = props.video
  return (
    <li className="related-item">
      <Link className="related-link" to={`/videos/${video.id}`}>
        <img className="related-image" src={video.imageUrl}/>
        <section className="related-info">
          <p className="related-title">{video.title}</p>
          <p className="related-uploader">{video.uploaderName}</p>
          <p className="related-views">{video.views}{video.views === 1 ? " view" : " views"}</p>
        </section>
      </Link>
    </li>
  );
};

export default RelatedVideoItem;
