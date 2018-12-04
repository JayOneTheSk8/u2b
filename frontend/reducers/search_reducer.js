import {
  RECEIVE_RESULTS,
  CLEAR_RESULTS,
  RECEIVE_FULL_RESULTS,
} from '../actions/search_actions';
import { merge } from 'lodash';

const defaultState = { resultList: [] };

export default (state = defaultState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_RESULTS:
      let newState = merge({}, state);
      newState.resultList = [];
      if (action.resultList.length === 0) {
        return newState;
      } else {
        newState.resultList = action.resultList;
        return newState;
      }
    case CLEAR_RESULTS:
      newState = merge({}, state);
      newState.resultList = [];
      return newState;
    case RECEIVE_FULL_RESULTS:
      debugger
      return merge({}, action.results, { resultList: [] });
    default:
      return state;
  }
};
