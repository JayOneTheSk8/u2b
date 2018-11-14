import { connect } from 'react-redux';
import VideoIndex from './video_index';
import { logout } from '../../actions/session_actions';

const mapStateToProps = state => {
  const currentUser = state.entities.users[state.session.currentUserId] || { username: "" }
  return {
    currentUser,
    loggedIn: Boolean(state.session.currentUserId)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(VideoIndex);
