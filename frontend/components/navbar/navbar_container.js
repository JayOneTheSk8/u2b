import { connect } from 'react-redux';
import NavBar from './navbar';
import { withRouter } from 'react-router-dom';
import { openModalDropdownMenu, clearScreen } from '../../actions/ui_actions';

const mapStateToProps = (state) => {
  const currentUser = state.entities.users[state.session.currentUserId];
  return {
    modalStatus: state.ui.modal,
    currentUser: currentUser || {}
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openModalDropdownMenu: () => dispatch(openModalDropdownMenu()),
    clearScreen: () => dispatch(clearScreen())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
