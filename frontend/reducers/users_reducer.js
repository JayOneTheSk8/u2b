import { RECEIVE_USER } from '../actions/session_actions';
import { merge } from 'lodash';

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_USER:
      return merge({}, state, { [action.currentUser.id]: action.currentUser })
    default:
      return state;
  }
};
