export const fetchVideo = (id) => {
  return $.ajax({
    method: 'GET',
    url: `/api/videos/${id}`
  });
};

export const postVideo = (video) => {
  return $.ajax({
    method: 'POST',
    url: `/api/videos/`,
    data: video,
    contentType: false,
    processData: false
  });
}
