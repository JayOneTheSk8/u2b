import { ADD_RATING, REMOVE_RATING, RECEIVE_RATINGS } from '../actions/rating_actions';
import { RECEIVE_VIDEO } from '../actions/video_actions';
import { merge } from 'lodash';
import { combineReducers } from 'redux';

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_RATINGS:
      return (action.ratings || {});
    case RECEIVE_VIDEO:
      if (!action.ratings) { return {}; }
      return merge({}, state, action.ratings);
    case ADD_RATING:
      return merge({}, state, { [action.rating.user_id]: action.rating });
    case REMOVE_RATING:
      let newState = merge({}, state);
      delete newState[action.userId];
      return newState;
    default:
      return state;
  }
};
