import React from 'react';

const LikeIcon = props => {
  const color = props.color;
  return (
    <div className="like">
      <div>
        <div className={'thumb-' + color} />
      </div>
      <div className="hand-area">
        <div className={'cuff-' + color} />
        <div className={'palm-' + color} />
        <div className={'fingers-' + color} />
      </div>
    </div>
  );
};

export default LikeIcon;
