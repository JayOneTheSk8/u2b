import { SESSION_ERRORS, RECEIVE_USER, REMOVE_ERRORS } from '../actions/session_actions';

export default (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case SESSION_ERRORS:
      return action.errors;
    case RECEIVE_USER:
    case REMOVE_ERRORS:
      return [];
    default:
      return state;
  }
};
