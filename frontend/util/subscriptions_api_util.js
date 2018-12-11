export const fetchSubscriptions = (userId) => {
  return $.ajax({
    method: 'GET',
    url: `/api/users/${userId}/subscription_videos`
  });
};

export const addSubscription = (channelId) => {
  return $.ajax({
    method: 'POST',
    url: `/api/users/${channelId}/subscriptions`
  });
};

export const removeSubscription = (channelId, subId) => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/users/${channelId}/subscriptions/${subId}`
  });
};
