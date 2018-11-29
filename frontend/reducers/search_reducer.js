import { RECEIVE_RESULTS } from '../actions/search_actions';

export default (state = [], action) => {
  switch (action.type) {
    case RECEIVE_RESULTS:
      return action.results || {};
    default:
      return state;
  }
};
