import React from 'react';
import { Link } from 'react-router-dom';
import DropdownMenuContainer from './dropdown_menu/dropdown_menu_container';
import SearchBarContainer from './search/search_bar_container';
import HamburgerIcon from './hamburger_icon';
import UserDropdown from './user_dropdown';
import VideoUploadIcon from './video_upload_icon';
import DefaultUserThumbnail from '../session/default_user_thumbnail';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      burgerColor: 'original',
      lastPage: null,
    };
    this.changeStatus = this.changeStatus.bind(this);
    this.darkenColor = this.darkenColor.bind(this);
    this.lightenColor = this.lightenColor.bind(this);
    this.toggleUserDrawer = this.toggleUserDrawer.bind(this);
    this.userDropdown = this.userDropdown.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  componentDidUpdate() {
    if (this.state.lastPage !== this.props.location.pathname) {
      this.setState({ lastPage: this.props.location.pathname });
      this.props.clearScreen();
      this.props.clearResults();
    }
  }

  changeStatus(e) {
    e.preventDefault();
    if (this.props.dropdownStatus === 'closed') {
      this.props.openModalDropdownMenu();
    } else {
      this.props.clearScreen();
    }
  }

  darkenColor(e) {
    this.setState({ burgerColor: 'darkened' });
  }

  lightenColor(e) {
    this.setState({ burgerColor: 'original' });
  }

  toggleUserDrawer(e) {
    e.preventDefault();
    if (this.props.userMenuStatus === 'hide') {
      this.props.openUserDrawer();
    } else {
      this.props.clearScreen();
    }
  }

  userDropdown() {
    return (
      <div className="user-menu">
        <VideoUploadIcon />
        <figure onClick={this.toggleUserDrawer} className="user-button">
          <DefaultUserThumbnail thumbnailInfo={this.props.thumbnailInfo} username={this.props.currentUser.username} />
        </figure>
        <UserDropdown />
      </div>
    );
  }

  signIn() {
    return (
      <div className="register">
        <Link to="/login">SIGN IN</Link>
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

  modal() {
    if (this.props.dropdownStatus === "open") {
      return (
        <div onClick={this.props.clearScreen} className="mini-modal">
        </div>
      );
    } else if (this.props.userMenuStatus === "show") {
      return (
        <div onClick={this.props.clearScreen} className="mini-clear-modal">
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    if (
      this.props.location.pathname === '/signup' ||
      this.props.location.pathname === '/login'
    ) {
      return null;
    }
    return (
      <nav id="navbar">
        <div className="main-hambuger-logo">
          <figure
            onMouseEnter={this.darkenColor}
            onMouseLeave={this.lightenColor}
            className="clickable-area"
            onClick={this.changeStatus}
          >
            <HamburgerIcon comp="navbar" color={this.state.burgerColor} />
          </figure>
          <DropdownMenuContainer currentUserId={this.props.currentUser.id || {}} sideDrawer={this.props.dropdownStatus} />
          <Link to="/">
            <div className="logo" />
          </Link>
        </div>
        <SearchBarContainer />
        { this.modal() }
        { this.userButton() }
      </nav>
    );
  }
}

export default NavBar;
