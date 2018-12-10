import { connect } from 'react-redux';
import DropdownMenu from './dropdown_menu';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => {
  const loggedIn = Boolean(state.session.currentUserId);
  const currentUserId = state.session.currentUserId || {};
  return {
    loggedIn,
    currentUserId,
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(DropdownMenu)
);
