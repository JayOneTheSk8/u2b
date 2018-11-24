export const addLike = (videoId) => {
  return $.ajax({
    method: 'POST',
    url: `/api/videos/${videoId}/likes`
  });
};

export const removeLike = (videoId) => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/videos/${videoId}/likes/`
  });
};
