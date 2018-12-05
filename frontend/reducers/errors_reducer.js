import { combineReducers } from 'redux';
import SessionErrorsReducer from './session_errors_reducer';
import VideoErrorsReducer from './video_errors_reducer';
import CommentErrorsReducer from './comment_errors_reducer';

export default combineReducers({
  session: SessionErrorsReducer,
  videos: VideoErrorsReducer,
  comments: CommentErrorsReducer,
});
