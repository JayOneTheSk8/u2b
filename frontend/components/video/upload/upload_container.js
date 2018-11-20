import { connect } from 'react-redux';
import Upload from './upload';
import { postVideo, removeVideoErrors } from '../../../actions/video_actions';

const mapStateToProps = state => {
  return {
    video: { title: '', description: '', videoFile: null, videoUrl: null },
    errors: state.errors.videos
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postVideo: (video) => dispatch(postVideo(video)),
    removeVideoErrors: () => dispatch(removeVideoErrors())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Upload);
