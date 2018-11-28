import { connect } from 'react-redux';
import UserVideoIndex from './user_video_index';
import { updateVideo, fetchUserVideos, deleteVideo, clearVideos } from '../../../actions/video_actions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => {
  const currentUserId = state.session.currentUserId;
  const videoUploader = parseInt(ownProps.match.params.userId);
  const editSession = (currentUserId === videoUploader);
  const videos = Object.keys(state.entities.videos).map((id) => state.entities.videos[id]);
  return { currentUserId, videoUploader, editSession, videos };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUserVideos: (userId) => dispatch(fetchUserVideos(userId)),
    updateVideo: (video) => dispatch(updateVideo(video)),
    deleteVideo: (id) => dispatch(deleteVideo(id)),
    clearVideos: () => dispatch(clearVideos())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserVideoIndex));
