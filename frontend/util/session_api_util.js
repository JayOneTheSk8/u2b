export const signup = user => {
  return $.ajax({
    method: 'POST',
    url: `api/users`,
    data: { user: { username: user.username, password: user.password } },
  });
};

export const login = user => {
  return $.ajax({
    method: 'POST',
    url: `api/session`,
    data: { user: { username: user.username, password: user.password } },
  });
};

export const logout = () => {
  return $.ajax({
    method: 'DELETE',
    url: `api/session`,
  });
};

export const updateUser = (user) => {
  return $.ajax({
    method: 'PATCH',
    url: `/api/users/${user.id}`,
    data: { user },
  });
};
