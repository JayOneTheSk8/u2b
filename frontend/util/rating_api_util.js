export const addRating = (videoId, rating) => {
  return $.ajax({
    method: 'POST',
    url: `/api/videos/${videoId}/ratings`,
    data: { rating }
  });
};

export const removeRating = (videoId, rating) => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/videos/${videoId}/ratings/${rating.id}`
  });
};

export const updateRating = (videoId, rating) => {
  return $.ajax({
    method: 'PATCH',
    url: `/api/video/${videoId}/ratings/${rating.id}`
  });
};

export const fetchRatings = (videoId) => {
  return $.ajax({
    method: 'GET',
    url: `/api/videos/${videoId}/ratings`
  });
};
