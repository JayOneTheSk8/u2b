import React from 'react';

const DefaultUserThumbnail = props => {
  if (Object.values(props.thumbnailInfo).indexOf(null) > -1) {
    return (
      <div className="default-user-circle">
        <p className="default-first-letter">{props.username[0].toUpperCase()}</p>
      </div>
    );
  } else {
    return null;
  }
};

export default DefaultUserThumbnail;
