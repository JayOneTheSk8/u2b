export const fetchVideo = (id) => {
  return $.ajax({
    method: 'GET',
    url: `/api/videos/${id}`
  });
};
