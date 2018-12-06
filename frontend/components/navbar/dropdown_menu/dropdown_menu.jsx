import React from 'react';
import HamburgerIcon from '../hamburger_icon';
import { Link } from 'react-router-dom';
import { clearScreen } from '../../../actions/ui_actions';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => {
  return {
    clearScreen: (e) => dispatch(clearScreen())
  };
};

class DropdownMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { burgerColor: 'original' }
    this.darkenColor = this.darkenColor.bind(this);
    this.lightenColor = this.lightenColor.bind(this);
  }

  darkenColor(e) {
    this.setState({ burgerColor: 'darkened' });
  }

  lightenColor(e) {
    this.setState({ burgerColor: 'original' });
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
        </ul>
      </aside>
    );
  }
}

// const DropdownMenu = props => {
// };

export default connect(null, mapDispatchToProps)(DropdownMenu);
