export const fetchLikedVideos = (userId) => {
  return $.ajax({
    method: 'GET',
    url: `/api/users/${userId}/likes`,
  });
};
