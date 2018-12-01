import {
  RECEIVE_RESULTS,
  CLEAR_RESULTS,
  RECEIVE_FULL_RESULTS,
} from '../actions/search_actions';

export default (state = [], action) => {
  switch (action.type) {
    case RECEIVE_RESULTS:
      if (action.resultList.length === 0) {
        return [];
      } else {
        return action.resultList;
      }
    case CLEAR_RESULTS:
      return [];
    case RECEIVE_FULL_RESULTS:
      return action.results;
    default:
      return state;
  }
};
