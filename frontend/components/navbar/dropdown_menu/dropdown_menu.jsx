import React from 'react';
import HamburgerIcon from '../hamburger_icon';
import { Link } from 'react-router-dom';
import { clearScreen } from '../../../actions/ui_actions';
import { connect } from 'react-redux';
import SubIcon from './icons/sub_icon';

const mapDispatchToProps = dispatch => {
  return {
    clearScreen: (e) => dispatch(clearScreen())
  };
};

class DropdownMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { burgerColor: 'original', sub_icon: 'grey' }
    this.darkenColor = this.darkenColor.bind(this);
    this.lightenColor = this.lightenColor.bind(this);
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

  subscriptions() {
    if (this.props.loggedIn) {
      return (
        <Link onMouseEnter={this.reddenLi('sub_icon')} onMouseLeave={this.greyLi('sub_icon')} className="dropdown-link" to={`/users/${this.props.currentUserId}/subscriptions`}>
          <li key={this.props.currentUserId} className="dropdown-li">
            <SubIcon color={this.state.sub_icon}/>
            Subscriptions
          </li>
        </Link>
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
          <li className="dropdown-li">
            <Link to="/upload">Upload</Link>
          </li>
          { this.subscriptions() }
        </ul>
      </aside>
    );
  }
}

// const DropdownMenu = props => {
// };

export default connect(null, mapDispatchToProps)(DropdownMenu);
