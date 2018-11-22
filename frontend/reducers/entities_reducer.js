import { combineReducers } from 'redux';
import UsersReducer from './users_reducer';
import VideoReducer from './video_reducer';
import CommentsReducer from './comments_reducer';

export default combineReducers({
  users: UsersReducer,
  videos: VideoReducer,
  comments: CommentsReducer
});
