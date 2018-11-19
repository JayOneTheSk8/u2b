import React from 'react';
import HamburgerIcon from '../hamburger_icon';

const DropdownMenu = (props) => {
  return (
    <aside className={("dropdown-menu-" + props.onStatus)}>
      <ul>
        <li>Trending</li>
        <li>Subscriptions</li>
        <li>{"Watch History"}</li>
      </ul>
    </aside>
  );
};

export default DropdownMenu;
