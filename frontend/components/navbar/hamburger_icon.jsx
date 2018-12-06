import React from 'react';

const HamburgerIcon = props => {
  return (
    <figure className={`${props.comp}-hamburger-button`}>
      <div className={'hamburger-line-' + props.color} />
      <div className={'hamburger-line-' + props.color} />
      <div className={'hamburger-line-' + props.color} />
    </figure>
  );
};

export default HamburgerIcon;
