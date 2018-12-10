import { connect } from 'react-redux';
import VideoIndex from './video_index';
import { logout } from '../../actions/session_actions';
import { fetchVideos, clearVideos } from '../../actions/video_actions';

function parseVideos(state, videoList, listName) {
  if (!videoList) { return null; }
  let videos = Object.keys(state.entities.videos[listName]).map((id) => state.entities.videos[listName][id]);
  for (let i = 0; i < videos.length; i++) {
    videos[i].uploaderName = state.entities.users[videos[i].uploader_id].username;
  }
  if (listName === "latest") {
    videos = videos.sort((a, b) => b.id - a.id);
  } else if (listName === "trending") {
    videos = videos.sort((a, b) => b.views - a.views);
  }
  return videos;
}

const mapStateToProps = state => {
  const currentUser = state.entities.users[state.session.currentUserId] || {
    username: '',
  };
  const recommended = parseVideos(state, state.entities.videos.recommended, "recommended") || [];
  const latest = parseVideos(state, state.entities.videos.latest, "latest") || [];
  const trending = parseVideos(state, state.entities.videos.trending, "trending") || [];
  return {
    currentUser,
    recommended,
    latest,
    trending,
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
