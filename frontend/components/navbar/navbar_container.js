import { connect } from 'react-redux';
import NavBar from './navbar';
import { withRouter } from 'react-router-dom';
import { clearResults } from '../../actions/search_actions';
import {
  openModalDropdownMenu,
  clearScreen,
  openUserDrawer,
} from '../../actions/ui_actions';

const mapStateToProps = state => {
  const currentUser = state.entities.users[state.session.currentUserId];
  const thumbnailInfo = state.session.thumbnailInfo;
  return {
    modalStatus: state.ui.modal,
    dropdownStatus: state.ui.dropdown,
    userMenuStatus: state.ui.userMenu,
    currentUser: currentUser || {},
    thumbnailInfo: thumbnailInfo || {},
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openModalDropdownMenu: () => dispatch(openModalDropdownMenu()),
    openUserDrawer: () => dispatch(openUserDrawer()),
    clearScreen: () => dispatch(clearScreen()),
    clearResults: () => dispatch(clearResults()),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NavBar)
);
