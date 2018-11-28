import * as VideoApiUtil from '../util/video_api_util';

export const RECEIVE_VIDEO = "RECEIVE_VIDEO";
export const RECEIVE_VIDEOS = "RECEIVE_VIDEOS";
export const REMOVE_VIDEO = 'REMOVE_VIDEO';
export const RECEIVE_VIDEO_ERRORS = "RECEIVE_VIDEO_ERRORS";
export const REMOVE_VIDEO_ERRORS = "REMOVE_VIDEO_ERRORS";

const receiveVideo = ({video, uploader, comments, authors, likes, dislikes, ratings}) => {
  return {
    type: RECEIVE_VIDEO,
    video,
    uploader,
    comments,
    authors,
    ratings,
    likes,
    dislikes
  };
};

const receiveVideos = ({videos, uploaders}) => {
  return {
    type: RECEIVE_VIDEOS,
    videos,
    uploaders
  };
};

const removeVideo = (video) => {
  return {
    type: REMOVE_VIDEO,
    videoId: video.id
  };
};

export const receiveVideoErrors = (errors) => {
  return {
    type: RECEIVE_VIDEO_ERRORS,
    errors
  };
};

export const removeVideoErrors = () => {
  return {
    type: REMOVE_VIDEO_ERRORS
  };
};


export const fetchVideos = () => dispatch => {
  return VideoApiUtil.fetchVideos().then(payload => dispatch(receiveVideos(payload)));
};

export const fetchVideo = (id) => dispatch => {
  return VideoApiUtil.fetchVideo(id).then(payload => {
    return dispatch(receiveVideo(payload));
  });
};

export const postVideo = (video) => dispatch => {
  return VideoApiUtil.postVideo(video).then(
    payload => dispatch(receiveVideo(payload)),
    errors => dispatch(receiveVideoErrors(errors.responseJSON))
  );
};

export const updateVideo = (video) => dispatch => {
  return VideoApiUtil.updateVideo(video).then(
    payload => dispatch(receiveVideo(payload)),
    errors => dispatch(receiveVideoErrors(errors.responseJSON))
  );
};

export const deleteVideo = (id) => dispatch => {
  return VideoApiUtil.deleteVideo(id).then(
    (video) => dispatch(removeVideo(video))
  );
};
