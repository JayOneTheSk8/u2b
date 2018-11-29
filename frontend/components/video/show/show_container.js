import { connect } from 'react-redux';
import { fetchVideo } from '../../../actions/video_actions';
import Show from './show';

const mapStateToProps = (state, ownProps) => {
  const defaultState = {};
  const video =
    state.entities.videos[ownProps.match.params.videoId] || defaultState;
  const uploader = state.entities.users[video.uploader_id] || {};
  const comments = Object.keys(state.entities.comments).map(
    id => state.entities.comments[id]
  );
  for (let i = 0; i < comments.length; i++) {
    comments[i].authorName =
      state.entities.users[comments[i].author_id].username;
  }
  return { video, uploader, comments };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchVideo: id => dispatch(fetchVideo(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Show);
