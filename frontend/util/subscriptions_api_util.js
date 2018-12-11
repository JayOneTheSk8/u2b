export const fetchSubscriptions = (userId) => {
  return $.ajax({
    method: 'GET',
    url: `/api/users/${userId}/subscription_videos`
  });
};
