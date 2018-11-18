import React from 'react';
import HamburgerIcon from '../hamburger_icon';

const DropdownMenu = (props) => {
  return (
    <aside className={("dropdown-menu-" + props.onStatus)}>
      <HamburgerIcon />
      <p>LOGOHERE</p>
    </aside>
  );
};

export default DropdownMenu;
