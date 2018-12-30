import { connect } from 'react-redux';
import Playlist from './playlist';
import { fetchLikedVideos } from '../../../actions/video_actions';

const mapStateToProps = state => {
  const stateVideos = state.entities.videos.likes || {};
  const videos = Object.keys(stateVideos).map(
    id => state.entities.videos.likes[id]
  );
  for (let i = 0; i < videos.length; i++) {
    videos[i].uploaderName =
      state.entities.users[videos[i].uploader_id].username;
  }
  return {
    videos,
    title: 'Liked Videos',
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAction: userId => dispatch(fetchLikedVideos(userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Playlist);
