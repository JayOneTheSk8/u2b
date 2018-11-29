import { connect } from 'react-redux';
import NavBar from './navbar';
import { withRouter } from 'react-router-dom';
import {
  openModalDropdownMenu,
  clearScreen,
  openUserDrawer,
} from '../../actions/ui_actions';

const mapStateToProps = state => {
  const currentUser = state.entities.users[state.session.currentUserId];
  return {
    modalStatus: state.ui.modal,
    dropdownStatus: state.ui.dropdown,
    userMenuStatus: state.ui.userMenu,
    currentUser: currentUser || {},
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openModalDropdownMenu: () => dispatch(openModalDropdownMenu()),
    openUserDrawer: () => dispatch(openUserDrawer()),
    clearScreen: () => dispatch(clearScreen()),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NavBar)
);
