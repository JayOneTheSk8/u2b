import * as SubscriptionsApiUtil from '../util/subscriptions_api_util';

export const ADD_SUBSCRIPTION = 'ADD_SUBSCRIPTION';
export const REMOVE_SUBSCRIPTION = 'REMOVE_SUBSCRIPTION';

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
