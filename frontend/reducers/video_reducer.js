import {
  RECEIVE_VIDEO,
  RECEIVE_VIDEOS,
  REMOVE_VIDEO,
  CLEAR_VIDEOS,
  RECEIVE_USER_VIDEOS,
  RECEIVE_SUBSCRIPTIONS,
  RECEIVE_PLAYLIST,
} from '../actions/video_actions';
import { ADD_SUBSCRIPTION, REMOVE_SUBSCRIPTION } from '../actions/subscription_actions';
import { merge } from 'lodash';

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_PLAYLIST:
      return { [action.listName]: action.videos }
    case RECEIVE_VIDEOS:
      const recommended = action.recommended;
      const latest = action.latest;
      const trending = action.trending;
      return { recommended, latest, trending };
    case RECEIVE_USER_VIDEOS:
      const videoSlice = action.videos || {};
      videoSlice['subscribers'] = action.subscribers || {};
      return merge({}, videoSlice) //no state
    case RECEIVE_VIDEO:
      let subscribers = action.subscribers;
      if (!subscribers) {
        subscribers = {}
      }
      return merge({}, { related: action.related.videos }, { [action.video.id]: action.video }, { subscribers: subscribers });
    case ADD_SUBSCRIPTION:
      const subscription = { [action.subscription.user_id]: action.subscription };
      const newSubscribers = merge(state.subscribers, subscription);
      return merge({}, state, { subscribers: newSubscribers });
    case REMOVE_SUBSCRIPTION:
      let nextState = merge({}, state);
      delete nextState.subscribers[action.subscription.user_id];
      return nextState;
    case CLEAR_VIDEOS:
      return {};
    case RECEIVE_SUBSCRIPTIONS:
      return { subscriptions: action.subscribed_videos };
    case REMOVE_VIDEO:
      let newState = merge({}, state);
      delete newState[action.videoId];
      return newState;
    default:
      return state;
  }
};
