import React from 'react';

const LikeIcon = (props) => {
  const color = props.color;
  return (
    <div className="like">
      <div>
        <div className={"thumb-" + color}></div>
      </div>
      <div className="hand-area">
        <div className={"cuff-" + color}></div>
        <div className={"palm-" + color}></div>
        <div className={"fingers-" + color}></div>
      </div>
    </div>
  );
};

export default LikeIcon;
