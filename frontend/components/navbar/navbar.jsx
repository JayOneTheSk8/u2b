import React from 'react';
import { Link } from 'react-router-dom';
import DropdownMenuContainer from './dropdown_menu/dropdown_menu_container';
import SearchBarContainer from './search/search_bar_container';
import HamburgerIcon from './hamburger_icon';
import UserDropdown from './user_dropdown';
import VideoUploadIcon from './video_upload_icon';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sideDrawerStatus: "closed",
      burgerColor: "original",
      userDrawerStatus: "closed"
    }
    this.changeStatus = this.changeStatus.bind(this);
    this.darkenColor = this.darkenColor.bind(this);
    this.lightenColor = this.lightenColor.bind(this);
    this.toggleUserDrawer = this.toggleUserDrawer.bind(this);
    this.userDropdown = this.userDropdown.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  // make a function that closes drawer after page changes

  changeStatus(e) {
    e.preventDefault();
    const newStatus = this.state.sideDrawerStatus === "closed" ? "open" : "closed";
    this.setState({ sideDrawerStatus: newStatus });
  }

  darkenColor(e) {
    this.setState({ burgerColor: "darkened" });
  }

  lightenColor(e) {
    this.setState({ burgerColor: "original" });
  }

  toggleUserDrawer(e) {
    const newState = this.state.userDrawerStatus === "closed" ? "opened" : "closed";
    this.setState({ userDrawerStatus: newState });
  }

  userDropdown() {
    if (this.state.userDrawerStatus === "opened") {
      return (
        <div className="user-menu">
          {/* create an optional video icon that is disabled */}
          <VideoUploadIcon />
          <figure onClick={this.toggleUserDrawer} className="user-button">
            {this.props.currentUser.username}
          </figure>
          <UserDropdown logout={this.props.logout}/>
        </div>
      );
    } else {
      return (
        <div className="user-menu">
          <VideoUploadIcon />
          <figure onClick={this.toggleUserDrawer} className="user-button">
            {this.props.currentUser.username}
          </figure>
        </div>
      );
    }
  }

  signIn() {
    return (
      <div className="register">
        <Link to="/signup">SIGN IN</Link>
      </div>
    );
  }

  userButton() {
    if (this.props.currentUser.id) {
      return this.userDropdown();
    } else {
      return this.signIn();
    }
  }

  render() {
    if (this.props.location.pathname === "/signup" || this.props.location.pathname === "/login") { return null; }
    return (
      <nav id='navbar'>
        <div className="main-hambuger-logo">
          <figure onMouseEnter={this.darkenColor} onMouseLeave={this.lightenColor} className="clickable-area" onClick={this.changeStatus}>
            <HamburgerIcon color={this.state.burgerColor} />
          </figure>
          <DropdownMenuContainer sideDrawer={this.state.sideDrawerStatus}/>
          <Link to="/">LOGO HERE</Link>
        </div>
        <SearchBarContainer />
        { this.userButton() }
      </nav>
    );
  }
}

export default NavBar;
