import React from 'react';
import { Link } from 'react-router-dom';
import SearchBarContainer from './search/search_bar_container';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.location.pathname === "/signup" || this.props.location.pathname === "/login") { return null; }
    return (
      <nav id='navbar'>
        <DropdownMenuContainer />
        <SearchBarContainer />
        <button className="user-menu">{this.props.currentUser.username}</button>
      </nav>
    );
  }
}

export default NavBar;
