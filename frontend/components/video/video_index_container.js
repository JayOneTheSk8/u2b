import { connect } from 'react-redux';
import VideoIndex from './video_index';
import { logout } from '../../actions/session_actions';
import { fetchVideos } from '../../actions/video_actions';

const mapStateToProps = state => {
  const currentUser = state.entities.users[state.session.currentUserId] || { username: "" }
  return {
    currentUser,
    videos: Object.keys(state.entities.videos).map((id) => state.entities.videos[id]),
    loggedIn: Boolean(state.session.currentUserId)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchVideos: () => dispatch(fetchVideos()),
    logout: () => dispatch(logout())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(VideoIndex);
