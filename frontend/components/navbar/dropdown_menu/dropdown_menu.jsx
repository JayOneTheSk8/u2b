import React from 'react';
import HamburgerIcon from '../hamburger_icon';
import { Link } from 'react-router-dom';
import { clearScreen } from '../../../actions/ui_actions';
import { fetchSubscriptions } from '../../../actions/video_actions';
import { connect } from 'react-redux';
import SubIcon from './icons/sub_icon';

const mapDispatchToProps = dispatch => {
  return {
    clearScreen: (e) => dispatch(clearScreen()),
    fetchSubscriptions: (userId) => dispatch(fetchSubscriptions(userId)),
  };
};

class DropdownMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { burgerColor: 'original', sub_icon: 'grey' }
    this.darkenColor = this.darkenColor.bind(this);
    this.lightenColor = this.lightenColor.bind(this);
    this.toSubscriptions = this.toSubscriptions.bind(this);
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

  subscriptions() {
    if (this.props.loggedIn) {
      return (
        <div onMouseEnter={this.reddenLi('sub_icon')} onMouseLeave={this.greyLi('sub_icon')} className="dropdown-link" onClick={this.toSubscriptions}>
          <li key={this.props.currentUserId} className="dropdown-li">
            <SubIcon color={this.state.sub_icon}/>
            Subscriptions
          </li>
        </div>
      );
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
        </ul>
      </aside>
    );
  }
}

export default connect(null, mapDispatchToProps)(DropdownMenu);
