import { connect } from 'react-redux';
import { fetchVideo } from '../../../actions/video_actions';
import { addView } from '../../../util/video_api_util';
import Show from './show';

const mapStateToProps = (state, ownProps) => {
  const currentUserId = state.session.currentUserId || "" ;
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
  return { video, uploader, comments, currentUserId };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchVideo: id => dispatch(fetchVideo(id)),
    addView: (videoId) => addView(videoId),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Show);
