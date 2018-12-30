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

const defaultState = { users: { subscribers: {} }, videos: {}, resultList: [] };

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
      let laterState = merge({}, state);
      if (laterState.users.subscribers[action.subscription.channel_id]) {
        laterState.users.subscribers[action.subscription.channel_id][
          action.subscription.user_id
        ] = action.subscription;
      } else {
        laterState.users.subscribers[action.subscription.channel_id] = {};
        laterState.users.subscribers[action.subscription.channel_id][
          action.subscription.user_id
        ] = action.subscription;
      }
      return laterState;
    case DETATCH_SUBSCRIPTION:
      const pickedChannel = action.subscription.channel_id;
      const pickedUser = action.subscription.user_id;
      let secondState = merge({}, state);
      delete secondState.users.subscribers[pickedChannel][pickedUser];
      return secondState;
    case RECEIVE_FULL_RESULTS:
      let results = {
        users: merge({}, (action.results.users || {}), {
          subscribers: action.results.subscribers || {},
        }),
        videos: action.results.videos || {},
        uploaders: action.results.uploaders || {},
        resultList: [],
      };
      return results;
    default:
      return state;
  }
};
