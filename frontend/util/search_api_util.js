export const fetchResults = search => {
  return $.ajax({
    method: 'GET',
    url: `/api/search`,
    data: { search },
  });
};
