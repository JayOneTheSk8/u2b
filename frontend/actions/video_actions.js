import * as VideoApiUtil from '../util/video_api_util';

export const RECEIVE_VIDEO = "RECEIVE_VIDEO";

const receiveVideo = ({video, uploader}) => {
  return {
    type: RECEIVE_VIDEO,
    video,
    uploader
  };
};

export const fetchVideo = (id) => dispatch => {
  return VideoApiUtil.fetchVideo(id).then(payload => dispatch(receiveVideo(payload)));
};
