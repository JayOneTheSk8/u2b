export const fetchResults = search => {
  return $.ajax({
    method: 'GET',
    url: `/api/search`,
    data: { search },
  });
};

export const fetchFullResults = search => {
  return $.ajax({
    method: 'GET',
    url: '/api/full_search',
    data: { search }
  });
};
