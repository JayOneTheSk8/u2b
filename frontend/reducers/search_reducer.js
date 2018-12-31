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
  let nextState, pickedUser, pickedChannel;
  switch (action.type) {
    case RECEIVE_RESULTS:
      nextState = merge({}, state);
      nextState.resultList = [];
      if (action.resultList.length === 0) {
        return nextState;
      } else {
        nextState.resultList = action.resultList;
        return nextState;
      }
    case CLEAR_RESULTS:
      nextState = merge({}, state);
      nextState.resultList = [];
      return nextState;
    case ATTACH_SUBSCRIPTION:
      nextState = merge({}, state);
      if (nextState.users.subscribers[action.subscription.channel_id]) {
        nextState.users.subscribers[action.subscription.channel_id][
          action.subscription.user_id
        ] = action.subscription;
      } else {
        nextState.users.subscribers[action.subscription.channel_id] = {};
        nextState.users.subscribers[action.subscription.channel_id][
          action.subscription.user_id
        ] = action.subscription;
      }
      return nextState;
    case DETATCH_SUBSCRIPTION:
      pickedChannel = action.subscription.channel_id;
      pickedUser = action.subscription.user_id;
      nextState = merge({}, state);
      delete nextState.users.subscribers[pickedChannel][pickedUser];
      return nextState;
    case RECEIVE_FULL_RESULTS:
      nextState = {
        users: merge({}, action.results.users || {}, {
          subscribers: action.results.subscribers || {},
        }),
        videos: action.results.videos || {},
        uploaders: action.results.uploaders || {},
        resultList: [],
      };
      return nextState;
    default:
      return state;
  }
};
