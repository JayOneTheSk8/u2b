import * as VideoApiUtil from '../util/video_api_util';
import * as SubscriptionsApiUtil from '../util/subscriptions_api_util';
import * as PlaylistApiUtil from '../util/playlist_api_util';

export const RECEIVE_VIDEO = 'RECEIVE_VIDEO';
export const RECEIVE_VIDEOS = 'RECEIVE_VIDEOS';
export const REMOVE_VIDEO = 'REMOVE_VIDEO';
export const RECEIVE_VIDEO_ERRORS = 'RECEIVE_VIDEO_ERRORS';
export const REMOVE_VIDEO_ERRORS = 'REMOVE_VIDEO_ERRORS';
export const CLEAR_VIDEOS = 'CLEAR_VIDEOS';
export const RECEIVE_USER_VIDEOS = 'RECEIVE_USER_VIDEOS';
export const RECEIVE_SUBSCRIPTIONS = 'RECEIVE_SUBSCRIPTIONS';
export const RECEIVE_PLAYLIST = 'RECEIVE_PLAYLIST';

const receiveVideo = ({
  video,
  uploader,
  comments,
  authors,
  likes,
  dislikes,
  ratings,
  related,
  subscribers,
}) => {
  return {
    type: RECEIVE_VIDEO,
    video,
    uploader,
    comments,
    authors,
    ratings,
    likes,
    dislikes,
    related,
    subscribers,
  };
};

const receiveUserVideos = ({ likes, videos, uploaders, subscribers }) => {
  return {
    type: RECEIVE_USER_VIDEOS,
    videos,
    uploaders,
    subscribers,
    likes,
  };
};

const receiveVideos = (payload) => {
  return {
    type: RECEIVE_VIDEOS,
    recommended: payload.recommended.videos,
    latest: payload.latest.videos,
    trending: payload.trending.videos,
    uploaders: Object.assign({}, payload.latest.uploaders, payload.recommended.uploaders, payload.trending.uploaders),
  };
};

const removeVideo = video => {
  return {
    type: REMOVE_VIDEO,
    videoId: video.id,
  };
};

export const receiveVideoErrors = errors => {
  return {
    type: RECEIVE_VIDEO_ERRORS,
    errors,
  };
};

export const removeVideoErrors = () => {
  return {
    type: REMOVE_VIDEO_ERRORS,
  };
};

export const receiveSubscriptions = ({ subscribed_videos, uploaders }) => {
  return {
    type: RECEIVE_SUBSCRIPTIONS,
    subscribed_videos,
    uploaders,
  };
};

export const receivePlaylist = (listName, playlist) => {
  return {
    type: RECEIVE_PLAYLIST,
    uploaders: playlist.uploaders,
    videos: playlist.videos,
    listName,
  };
};

export const fetchVideos = () => dispatch => {
  return VideoApiUtil.fetchVideos().then(payload =>
    dispatch(receiveVideos(payload))
  );
};

export const fetchVideo = id => dispatch => {
  return VideoApiUtil.fetchVideo(id).then(payload => {
    return dispatch(receiveVideo(payload));
  });
};

export const postVideo = video => dispatch => {
  return VideoApiUtil.postVideo(video).then(
    payload => dispatch(receiveVideo(payload)),
    errors => dispatch(receiveVideoErrors(errors.responseJSON))
  );
};

export const updateVideo = video => dispatch => {
  return VideoApiUtil.updateVideo(video).then(
    payload => dispatch(receiveVideo(payload)),
    errors => dispatch(receiveVideoErrors(errors.responseJSON))
  );
};

export const deleteVideo = id => dispatch => {
  return VideoApiUtil.deleteVideo(id).then(video =>
    dispatch(removeVideo(video))
  );
};

export const fetchUserVideos = userId => dispatch => {
  return VideoApiUtil.fetchUserVideos(userId).then(videos =>
    dispatch(receiveUserVideos(videos))
  );
};

export const clearVideos = () => dispatch => {
  return dispatch({ type: CLEAR_VIDEOS });
};

export const fetchSubscriptions = (userId) => dispatch => {
  return SubscriptionsApiUtil.fetchSubscriptions(userId).then(
    (subs) => {
      return dispatch(receiveSubscriptions(subs))
    }
  );
};

export const fetchLikedVideos = (userId) => dispatch => {
  return PlaylistApiUtil.fetchLikedVideos(userId).then(
    (likes) => {
      return dispatch(receivePlaylist('likes', likes))
    }
  );
};
