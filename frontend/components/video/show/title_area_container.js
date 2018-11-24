import { connect } from 'react-redux';
import TitleArea from './title_area';
import * as LikeActions from '../../../actions/like_actions';

const mapStateToProps = state => {
  const currentUser = state.entities.users[state.session.currentUserId];
  const likes = Object.keys(state.entities.likes).map((id) => state.entities.likes[id]);
  let currentLike = null;
  for (let i = 0; i < likes.length; i++) {
    if (likes[i].user_id === currentUser.id) {
      currentLike = likes[i];
      break;
    }
  }
  return {
    currentLike,
    loggedIn: Boolean(state.session.currentUserId)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addLike: (videoId) => dispatch(LikeActions.addLike(videoId)),
    removeLike: (videoId, like) => dispatch(LikeActions.removeLike(videoId, like)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TitleArea);
