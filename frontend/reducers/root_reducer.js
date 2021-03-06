import { combineReducers } from 'redux';
import EntitiesReducer from './entities_reducer';
import SessionReducer from './session_reducer';
import ErrorsReducer from './errors_reducer';
import UIReducer from './ui_reducer';
import CommentUIReducer from './comment_ui_reducer';
import SearchReducer from './search_reducer';

export default combineReducers({
  entities: EntitiesReducer,
  session: SessionReducer,
  errors: ErrorsReducer,
  ui: UIReducer,
  commentUI: CommentUIReducer,
  search: SearchReducer,
});
