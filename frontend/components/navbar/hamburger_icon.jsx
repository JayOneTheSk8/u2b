import React from 'react';

const HamburgerIcon = (props) => {
  return (
    <figure className="hamburger-button">
      <div className={"hamburger-line-" + props.color}></div>
      <div className={"hamburger-line-" + props.color}></div>
      <div className={"hamburger-line-" + props.color}></div>
    </figure>
  );
}

export default HamburgerIcon;
