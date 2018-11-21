import { connect } from 'react-redux';
import NavBar from './navbar';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state) => {
  const currentUser = state.entities.users[state.session.currentUserId];
  return {
    currentUser: currentUser || {}
  };
};

export default withRouter(connect(mapStateToProps, null)(NavBar));
