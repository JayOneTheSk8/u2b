import { RECEIVE_USER, LOGOUT_USER } from '../actions/session_actions';
const defaultState = { currentUserId: null };

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_USER:
      return { currentUserId: action.currentUser.id };
    case LOGOUT_USER:
      return defaultState;
    default:
      return state;
  }
};
