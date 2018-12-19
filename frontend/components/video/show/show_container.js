import { connect } from 'react-redux';
import { fetchVideo, fetchUserVideos } from '../../../actions/video_actions';
import { addView } from '../../../util/video_api_util';
import Show from './show';

function parseRelatedVideos(state, relatedVideos) {
  if (!relatedVideos) { return null; }
  const videos = Object.keys(relatedVideos).map(id => relatedVideos[id]);
  for (let i = 0; i < videos.length; i++) {
    videos[i].uploaderName = state.entities.users[videos[i].uploader_id].username;
  }
  return videos;
}

const mapStateToProps = (state, ownProps) => {
  const currentUserId = state.session.currentUserId || "" ;
  const defaultState = {};
  let relatedVideos = state.entities.videos.related;
  relatedVideos = parseRelatedVideos(state, relatedVideos) || [];
  const video =
    state.entities.videos[ownProps.match.params.videoId] || defaultState;
  const uploader = state.entities.users[video.uploader_id] || {};
  const thumbnailInfo = {
    border: uploader.thumbnail_border,
    background: uploader.thumbnail_background,
    letter: uploader.thumbnail_letter,
  } || {};
  const comments = Object.keys(state.entities.comments).map(
    id => state.entities.comments[id]
  );
  for (let i = 0; i < comments.length; i++) {
    comments[i].authorName =
      state.entities.users[comments[i].author_id].username;
  }
  const subscriptions = state.entities.videos.subscribers || {};
  return { video, uploader, comments, currentUserId, relatedVideos, thumbnailInfo, subscriptions };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchVideo: id => dispatch(fetchVideo(id)),
    fetchUserVideos: (userId) => dispatch(fetchUserVideos(userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Show);
