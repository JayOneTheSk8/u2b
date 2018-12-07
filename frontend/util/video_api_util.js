export const fetchVideos = () => {
  return $.ajax({
    method: 'GET',
    url: `/api/videos/`,
  });
};

export const fetchVideo = id => {
  return $.ajax({
    method: 'GET',
    url: `/api/videos/${id}`,
  });
};

export const postVideo = video => {
  return $.ajax({
    method: 'POST',
    url: `/api/videos/`,
    data: video,
    contentType: false,
    processData: false,
  });
};

export const updateVideo = video => {
  return $.ajax({
    method: 'PATCH',
    url: `/api/videos/${video.id}`,
    data: { video },
  });
};

export const deleteVideo = id => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/videos/${id}`,
  });
};

export const fetchUserVideos = userId => {
  return $.ajax({
    method: 'GET',
    url: `/api/users/${userId}/videos`,
  });
};

export const addView = videoId => {
  return $.ajax({
    method: 'POST',
    url: `/api/videos/${videoId}/add_view`,
  });
};

export const fetchLatest = () => {
  return $.ajax({
    method: 'GET',
    url: `/api/latest`,
  });
}
