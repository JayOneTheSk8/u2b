import * as VideoApiUtil from '../util/video_api_util';

export const RECEIVE_VIDEO = "RECEIVE_VIDEO";
export const RECEIVE_VIDEOS = "RECEIVE_VIDEOS";

const receiveVideo = ({video, uploader}) => {
  return {
    type: RECEIVE_VIDEO,
    video,
    uploader
  };
};

const receiveVideos = ({videos, uploaders}) => {
  return {
    type: RECEIVE_VIDEOS,
    videos,
    uploaders
  };
}

export const fetchVideos = () => dispatch => {
  return VideoApiUtil.fetchVideos().then(payload => dispatch(receiveVideos(payload)));
};

export const fetchVideo = (id) => dispatch => {
  return VideoApiUtil.fetchVideo(id).then(payload => dispatch(receiveVideo(payload)));
};

export const postVideo = (video) => dispatch => {
  return VideoApiUtil.postVideo(video).then(payload => dispatch(receiveVideo(payload)))
};
