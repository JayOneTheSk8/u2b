import React from 'react';
import Like from './like';

const DislikeIcon = props => {
  return (
    <div className="dislike">
      <Like color={props.color} />
    </div>
  );
};

export default DislikeIcon;
