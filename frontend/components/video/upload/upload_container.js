import { connect } from 'react-redux';
import Upload from './upload';
import { postVideo } from '../../../actions/video_actions';

const mapStateToProps = state => {
  return {
    video: { title: '', description: '', videoFile: null }
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postVideo: (video) => dispatch(postVideo(video))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Upload);
