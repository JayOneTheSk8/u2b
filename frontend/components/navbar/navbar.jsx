import React from 'react';
import { Link } from 'react-router-dom';
import DropdownMenuContainer from './dropdown_menu/dropdown_menu_container';
import SearchBarContainer from './search/search_bar_container';
import HamburgerIcon from './hamburger_icon';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onStatus: "closed"
    }
    this.changeStatus = this.changeStatus.bind(this);
  }

  changeStatus(e) {
    const result = this.state.onStatus == "closed" ? "open" : "closed";
    this.setState({ onStatus: result });
  }


  render() {
    if (this.props.location.pathname === "/signup" || this.props.location.pathname === "/login") { return null; }
    return (
      <nav id='navbar'>
        <figure className="main-hambuger-logo">
            <button onClick={this.changeStatus}>
              <HamburgerIcon />
            </button>
            <DropdownMenuContainer onStatus={this.state.onStatus}/>
          <p>LOGO HERE</p>
        </figure>
        <SearchBarContainer />
        <button className="user-menu">{this.props.currentUser.username}</button>
      </nav>
    );
  }
}

export default NavBar;
