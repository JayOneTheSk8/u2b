import * as RatingAPIUtil from '../util/rating_api_util';

export const ADD_RATING = 'ADD_RATING';
export const REMOVE_RATING = 'REMOVE_RATING';
export const RECEIVE_RATINGS = 'RECEIVE_RATINGS';

export const fetchRatings = (videoId) => dispatch => {
  return RatingAPIUtil.fetchRatings(videoId).then(
    (ratings) => dispatch({ type: RECEIVE_RATINGS, ratings })
  );
};

export const addRating = (videoId, rating) => dispatch => {
  return RatingAPIUtil.addRating(videoId, rating).then(
    (rating) => dispatch({ type: ADD_RATING, rating })
  );
};

export const updateRating = (videoId, rating) => dispatch => {
  return RatingAPIUtil.updateRating(videoId, rating).then(
    (rating) => dispatch({ type: ADD_RATING, rating })
  );
};

export const removeRating = (videoId, rating) => dispatch => {
  return RatingAPIUtil.removeRating(videoId, rating).then(
    (rating) => dispatch({ type: REMOVE_RATING, userId: rating.user_id })
  );
};
