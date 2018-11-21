import { connect } from 'react-redux';
import { fetchVideo } from '../../../actions/video_actions';
import Show from './show'

const mapStateToProps = (state, ownProps) => {
  const defaultState = {};
  const video = state.entities.videos[ownProps.match.params.videoId] || defaultState;
  const uploader = state.entities.users[video.uploader_id] || {}
  return { video, uploader };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchVideo: (id) => dispatch(fetchVideo(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Show);
