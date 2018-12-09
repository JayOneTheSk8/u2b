import { RECEIVE_USER, LOGOUT_USER, RECEIVE_CURRENT_USER } from '../actions/session_actions';
const defaultState = { currentUserId: null };

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
    case RECEIVE_USER:
      return { currentUserId: action.currentUser.id,
        thumbnailInfo: {
          background: action.currentUser.thumbnail_background,
          letter: action.currentUser.thumbnail_letter,
          border: action.currentUser.thumbnail_border
        }
      };
    case LOGOUT_USER:
      return defaultState;
    default:
      return state;
  }
};
