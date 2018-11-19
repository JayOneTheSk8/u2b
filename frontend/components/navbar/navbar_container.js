import { connect } from 'react-redux';
import NavBar from './navbar';
import * as SessionActions from '../../actions/session_actions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state) => {
  const currentUser = state.entities.users[state.session.currentUserId];
  return {
    currentUser: currentUser || {}
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (e) => dispatch(SessionActions.logout())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
