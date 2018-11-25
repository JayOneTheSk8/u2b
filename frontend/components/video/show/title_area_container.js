import { connect } from 'react-redux';
import TitleArea from './title_area';
import * as LikeActions from '../../../actions/like_actions';
import { withRouter } from 'react-router-dom';
import { intersection } from 'underscore';

const mapStateToProps = (state, ownProps) => {
  const currentUser = state.entities.users[state.session.currentUserId];
  return {
    currentUser,
    loggedIn: Boolean(state.session.currentUserId),
    likeCount: Object.keys(state.entities.likes).length
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addLike: (videoId) => dispatch(LikeActions.addLike(videoId)),
    removeLike: (videoId, like) => dispatch(LikeActions.removeLike(videoId, like)),
    fetchLikes: (videoId) => dispatch(LikeActions.fetchLikes(videoId))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TitleArea));
