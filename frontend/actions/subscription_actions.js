import * as SubscriptionsApiUtil from '../util/subscriptions_api_util';

export const ADD_SUBSCRIPTION = 'ADD_SUBSCRIPTION';
export const REMOVE_SUBSCRIPTION = 'REMOVE_SUBSCRIPTION';
export const ATTACH_SUBSCRIPTION = 'ATTACH_SUBSCRIPTION';
export const DETATCH_SUBSCRIPTION = 'DETATCH_SUBSCRIPTION';

export const addSubscription = (channelId) => dispatch => {
  return SubscriptionsApiUtil.addSubscription(channelId).then((subscription) =>{
    return dispatch({ type: ADD_SUBSCRIPTION, subscription });
  });
};

export const removeSubscription = (channelId, subId) => dispatch => {
  return SubscriptionsApiUtil.removeSubscription(channelId, subId).then((subscription) =>{
    return dispatch({ type: REMOVE_SUBSCRIPTION, subscription });
  });
};

export const attachSubscription = (channelId) => dispatch => {
  return SubscriptionsApiUtil.addSubscription(channelId).then((subscription) =>{
    return dispatch({ type: ATTACH_SUBSCRIPTION, subscription });
  });
};

export const detachSubscription = (channelId, subId) => dispatch => {
  return SubscriptionsApiUtil.removeSubscription(channelId, subId).then((subscription) =>{
    return dispatch({ type: DETATCH_SUBSCRIPTION, subscription });
  });
};
