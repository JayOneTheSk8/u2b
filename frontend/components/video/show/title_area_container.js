import { connect } from 'react-redux';
import TitleArea from './title_area';
import * as RatingActions from '../../../actions/rating_actions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => {
  const currentUser = state.entities.users[state.session.currentUserId];
  const currentVideo = state.entities.videos[ownProps.videoId];
  return {
    currentUser,
    loggedIn: Boolean(state.session.currentUserId),
    likeCount: currentVideo.amount_of_likes,
    dislikeCount: currentVideo.amount_of_dislikes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchRatings: (videoId) => dispatch(RatingActions.fetchRatings(videoId)),
    addRating: (videoId, rating) => dispatch(RatingActions.addRating(videoId, rating)),
    updateRating: (videoId, rating) => dispatch(RatingActions.updateRating(videoId, rating)),
    removeRating: (videoId, rating) => dispatch(RatingActions.removeRating(videoId, rating))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TitleArea));
