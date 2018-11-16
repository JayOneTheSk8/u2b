import { connect } from 'react-redux';
import NavBar from './navbar';
import * as SessionActions from '../../actions/session_actions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state) => {
  const currentUserId = state.session.currentUserId
  return {
    currentUser: state.entities.users[currentUserId] || {}
  };
};

export default withRouter(connect(mapStateToProps, null)(NavBar));
