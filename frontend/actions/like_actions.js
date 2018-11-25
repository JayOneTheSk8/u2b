import * as LikeAPIUtil from '../util/like_api_util';

export const ADD_LIKE = 'ADD_LIKE';
export const REMOVE_LIKE = 'REMOVE_LIKE';
export const RECEIVE_LIKES = 'RECEIVE_LIKES';

export const addLike = (videoId) => dispatch => {
  return LikeAPIUtil.addLike(videoId).then(
    (like) => dispatch({ type: ADD_LIKE, like })
  );
};

export const removeLike = (videoId, likeId) => dispatch => {
  return LikeAPIUtil.removeLike(videoId, likeId).then(
    (like) => dispatch({ type: REMOVE_LIKE, userId: like.user_id })
  );
};

export const fetchLikes = (videoId) => dispatch => {
  return LikeAPIUtil.fetchLikes(videoId).then(
    (likes) => dispatch({ type: RECEIVE_LIKES, likes })
  );
};
