export const postComment = (videoId, comment) => {
  return $.ajax({
    method: 'POST',
    url: `/api/videos/${videoId}/comments`,
    data: { comment },
  });
};

export const editComment = (videoId, comment) => {
  return $.ajax({
    method: 'PATCH',
    url: `/api/videos/${videoId}/comments/${comment.id}`,
    data: { comment },
  });
};

export const removeComment = (videoId, comment) => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/videos/${videoId}/comments/${comment.id}`,
  });
};
