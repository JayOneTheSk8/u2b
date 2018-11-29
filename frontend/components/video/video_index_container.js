import { connect } from 'react-redux';
import VideoIndex from './video_index';
import { logout } from '../../actions/session_actions';
import { fetchVideos, clearVideos } from '../../actions/video_actions';

const mapStateToProps = state => {
  const currentUser = state.entities.users[state.session.currentUserId] || {
    username: '',
  };
  const videos = Object.keys(state.entities.videos).map(
    id => state.entities.videos[id]
  );
  for (let i = 0; i < videos.length; i++) {
    videos[i].uploaderName =
      state.entities.users[videos[i].uploader_id].username;
  }
  return {
    currentUser,
    videos,
    loggedIn: Boolean(state.session.currentUserId),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchVideos: () => dispatch(fetchVideos()),
    logout: () => dispatch(logout()),
    clearVideos: () => dispatch(clearVideos()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoIndex);
