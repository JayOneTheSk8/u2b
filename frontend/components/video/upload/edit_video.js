import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Upload from './upload';
import { updateVideo, fetchVideo, removeVideoErrors, receiveVideoErrors, clearVideos } from '../../../actions/video_actions';

const mapStateToProps = (state, ownProps) => {
  const video = state.entities.videos[ownProps.match.params.videoId];
  const videoUrl = (video.videoUrl || null);
  const accessAllowed = video.uploader_id === state.session.currentUserId;
  video.videoFile = true;
  return {
    video,
    videoUrl,
    accessAllowed,
    videoId: parseInt(ownProps.match.params.videoId),
    editForm: true,
    buttonText: 'Update Video',
    errors: state.errors.videos
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateVideo: (video) => dispatch(updateVideo(video)),
    fetchVideo: (id) => dispatch(fetchVideo(id)),
    removeVideoErrors: () => dispatch(removeVideoErrors()),
    receiveVideoErrors: (errors) => dispatch(receiveVideoErrors(errors)),
    clearVideos: () => dispatch(clearVideos())
  };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Upload));
