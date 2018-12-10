import React from 'react';

const DefaultUserThumbnail = props => {
  if (!props.username) {
    return (
      <div className="empty-account-background">
        <div className="empty-account-head"></div>
        <div className="empty-account-body"></div>
      </div>
    );
  } else if (Object.values(props.thumbnailInfo).indexOf(null) > -1) {
    return (
      <div className="default-user-border">
        <div className="default-user-circle">
          <p className="default-first-letter">{props.username[0].toUpperCase()}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className={`user-border-${props.thumbnailInfo.border}`}>
        <div className={`user-circle-${props.thumbnailInfo.background}`}>
          <p className={`first-letter-${props.thumbnailInfo.letter}`}>{props.username[0].toUpperCase()}</p>
        </div>
      </div>
    );
  }
};

export default DefaultUserThumbnail;
