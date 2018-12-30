import React from 'react';
import HamburgerIcon from '../hamburger_icon';
import { Link } from 'react-router-dom';
import SubIcon from './icons/sub_icon';
import LikeIcon from '../../video/show/icons/like.jsx';

class DropdownMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { burgerColor: 'original', subIcon: 'grey', likeIcon: 'grey' };
    this.darkenColor = this.darkenColor.bind(this);
    this.lightenColor = this.lightenColor.bind(this);
    this.toSubscriptions = this.toSubscriptions.bind(this);
    this.toLikedVideos = this.toLikedVideos.bind(this);
  }

  darkenColor(e) {
    this.setState({ burgerColor: 'darkened' });
  }

  lightenColor(e) {
    this.setState({ burgerColor: 'original' });
  }

  reddenLi(field) {
    return (e) => {
      this.setState({ [field]: "red" });
    }
  }

  greyLi(field) {
    return (e) => {
      this.setState({ [field]: "grey" });
    }
  }

  toSubscriptions(e) {
    this.props.fetchSubscriptions(this.props.currentUserId).then(
      (action) => this.props.history.push(`/users/${this.props.currentUserId}/subscriptions`)
    );
  }

  toLikedVideos(e) {
    return;
  }

  subscriptions() {
    if (this.props.loggedIn) {
      return (
        <div onMouseEnter={this.reddenLi('subIcon')} onMouseLeave={this.greyLi('subIcon')} className="dropdown-link" onClick={this.toSubscriptions}>
          <li key="1" className="dropdown-li">
            <SubIcon color={this.state.subIcon}/>
            Subscriptions
          </li>
        </div>
      );
    } else {
      return null;
    }
  }

  likedVideos() {
    if (this.props.loggedIn) {
      return (
        <div onMouseEnter={this.reddenLi('likeIcon')} onMouseLeave={this.greyLi('likeIcon')} className='dropdown-link' onClick={this.toLikedVideos}>
          <li key="2" className="dropdown-li">
            <LikeIcon dropdown={true} color={this.state.likeIcon}/>
            Liked Videos
          </li>
        </div>
      )
    } else {
      return null;
    }
  }

  render() {
    return (
      <aside className={'dropdown-menu-' + this.props.sideDrawer}>
        <div className="burger-logo">
          <figure className="clickable-area" onMouseEnter={this.darkenColor} onMouseLeave={this.lightenColor} onClick={this.props.clearScreen}>
            <HamburgerIcon comp="dropdown" color={this.state.burgerColor}/>
          </figure>
          <Link to="/">
            <div className='logo'/>
          </Link>
        </div>
        <ul>
          { this.subscriptions() }
          { this.likedVideos() }
        </ul>
      </aside>
    );
  }
}

export default DropdownMenu;
