import { combineReducers } from 'redux';
import UsersReducer from './users_reducer';
import VideoReducer from './video_reducer';
import CommentsReducer from './comments_reducer';
import LikesReducer from './likes_reducer';
import RatingsReducer from './ratings_reducer';

export default combineReducers({
  users: UsersReducer,
  videos: VideoReducer,
  comments: CommentsReducer,
  likes: LikesReducer,
  ratings: RatingsReducer
});
