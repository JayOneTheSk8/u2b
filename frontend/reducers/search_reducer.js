import {
  RECEIVE_RESULTS,
  CLEAR_RESULTS,
  RECEIVE_FULL_RESULTS,
} from '../actions/search_actions';
import {
  ATTACH_SUBSCRIPTION,
  DETATCH_SUBSCRIPTION,
} from '../actions/subscription_actions';
import { merge } from 'lodash';

const defaultState = { users: {}, videos: {}, resultList: [] };

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
      let nextState = merge({}, state);
      nextState.resultList = [];
      return nextState;
    case ATTACH_SUBSCRIPTION:
      // const newSub = { [action.subscription.user_id]: action.subscription };
      let laterState = merge({}, state);
      laterState.users.subscribers[action.subscription.channel_id][action.subscription.user_id] = action.subscription;
      return laterState;
    case DETATCH_SUBSCRIPTION:
      const pickedChannel = action.subscription.channel_id;
      const pickedUser = action.subscription.user_id;
      let secondState = merge({}, state);
      delete secondState[pickedChannel];
      return secondState;
    case RECEIVE_FULL_RESULTS:
      return merge({}, defaultState, action.results);
    default:
      return state;
  }
};
