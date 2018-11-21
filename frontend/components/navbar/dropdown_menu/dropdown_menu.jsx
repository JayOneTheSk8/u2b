import React from 'react';
import HamburgerIcon from '../hamburger_icon';
import { Link } from 'react-router-dom';

const DropdownMenu = (props) => {
  return (
    <aside className={("dropdown-menu-" + props.sideDrawer)}>
      <ul>
        <li className="dropdown-li">
          <Link to="/upload">
            Upload
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default DropdownMenu;
