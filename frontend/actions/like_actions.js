import * as LikeAPIUtil from '../util/like_api_util';

export const ADD_LIKE = 'ADD_LIKE';
export const REMOVE_LIKE = 'REMOVE_LIKE';

export const addLike = (videoId) => dispatch => {
  return LikeAPIUtil.addLike(videoId).then(
    (like) => dispatch({ type: ADD_LIKE, like })
  );
};

export const removeLike = (videoId, like) => dispatch => {
  return LikeAPIUtil.removeLike(videoId, like).then(
    (like) => dispatch({ type: REMOVE_LIKE, likeId: like.id })
  );
};
