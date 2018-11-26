import { ADD_RATING, REMOVE_RATING, RECEIVE_RATINGS, UPDATE_RATING } from '../actions/rating_actions';
import { RECEIVE_VIDEO } from '../actions/video_actions';
import { merge } from 'lodash';
import { size } from 'underscore';

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_VIDEO:
      if (!action.likes) {
        return {};
      }
      return { likeCount: _.size(action.likes), dislikeCount: _.size(action.dislikes) };
    case UPDATE_RATING:
      const otherRating = (action.rating.name === 'like' ? 'dislikeCount' : 'likeCount');
      if (action.rating.name === 'like') {
        const newCount = state.likeCount + 1;
        const otherRatingCount = state[otherRating] - 1;
        return merge({}, state, { likeCount: newCount, [otherRating]: otherRatingCount });
      } else if (action.rating.name === 'dislike') {
        const newCount = state.dislikeCount + 1;
        const otherRatingCount = state[otherRating] - 1;
        return merge({}, state, { dislikeCount: newCount, [otherRating]: otherRatingCount });
      }

    case ADD_RATING:
      if (action.rating.name === 'like') {
        const newCount = state.likeCount + 1;
        return merge({}, state, { likeCount: newCount });
      } else if (action.rating.name === 'dislike') {
        const newCount = state.dislikeCount + 1;
        return merge({}, state, { dislikeCount: newCount });
      }
    case REMOVE_RATING:
      if (action.name === 'like') {
        const newCount = state.likeCount - 1;
        return merge({}, state, { likeCount: newCount });
      } else if (action.name === 'dislike') {
        const newCount = state.dislikeCount - 1;
        return merge({}, state, { dislikeCount: newCount });
      }
    default:
      return state;
  }
};
