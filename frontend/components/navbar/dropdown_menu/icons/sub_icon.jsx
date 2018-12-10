import React from 'react';

const SubIcon = (props) => {
  return (
    <div className="sub-icon">
      <div className={`first-row-${props.color}`}></div>
      <div className={`second-row-${props.color}`}></div>
      <div className={`play-box-${props.color}`}>
        <div className={props.color === "red" ? `play-triangle-darken` : `play-triangle`}></div>
      </div>
    </div>
  );
};

export default SubIcon;
