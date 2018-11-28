import { connect } from 'react-redux';
import UserVideoIndex from './user_video_index';
import { updateVideo, fetchUserVideos, deleteVideo, clearVideos } from '../../../actions/video_actions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => {
  const currentUserId = state.session.currentUserId;
  const currentUser = state.entities.users[currentUserId];
  const videoUploaderId = ownProps.match.params.userId;
  const videoUploader = state.entities.users[videoUploaderId] || { username: '' };
  const editSession = (currentUserId == videoUploaderId);
  const videos = Object.keys(state.entities.videos).map((id) => state.entities.videos[id]);
  const loggedIn = Boolean(state.session.currentUserId);
  return { currentUserId, videoUploader, editSession, videos, currentUser, loggedIn, videoUploaderId };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUserVideos: (userId) => dispatch(fetchUserVideos(userId)),
    deleteVideo: (id) => dispatch(deleteVideo(id)),
    clearVideos: () => dispatch(clearVideos())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserVideoIndex));
