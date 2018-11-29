import { connect } from 'react-redux';
import Upload from './upload';
import {
  postVideo,
  removeVideoErrors,
  receiveVideoErrors,
  clearVideos,
} from '../../../actions/video_actions';

const mapStateToProps = state => {
  return {
    video: { title: '', description: '', videoFile: null, videoUrl: null },
    errors: state.errors.videos,
    buttonText: 'Post Video',
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postVideo: video => dispatch(postVideo(video)),
    removeVideoErrors: () => dispatch(removeVideoErrors()),
    receiveVideoErrors: errors => dispatch(receiveVideoErrors(errors)),
    clearVideos: () => dispatch(clearVideos()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Upload);
