import * as SessionApiUtil from '../util/session_api_util';

export const RECEIVE_USER = 'RECEIVE_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const SESSION_ERRORS = 'SESSION_ERRORS';
export const REMOVE_ERRORS = 'REMOVE_ERRORS';
export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';

export const receiveUser = currentUser => {
  return {
    type: RECEIVE_USER,
    currentUser,
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
  };
};

export const receiveErrors = errors => {
  return {
    type: SESSION_ERRORS,
    errors,
  };
};

export const removeErrors = () => {
  return {
    type: REMOVE_ERRORS,
  };
};

export const receiveCurrentUser = (currentUser) => {
  return {
    type: RECEIVE_CURRENT_USER,
    currentUser,
  };
};

export const signup = user => dispatch => {
  return SessionApiUtil.signup(user).then(
    user => dispatch(receiveUser(user)),
    errors => dispatch(receiveErrors(errors.responseJSON))
  );
};

export const login = user => dispatch => {
  return SessionApiUtil.login(user).then(
    user => dispatch(receiveUser(user)),
    errors => dispatch(receiveErrors(errors.responseJSON))
  );
};

export const logout = () => dispatch => {
  return SessionApiUtil.logout().then(user => dispatch(logoutUser()));
};

export const updateUser = (user) => dispatch => {
  return SessionApiUtil.updateUser(user).then(user => dispatch(receiveCurrentUser(user)));
};
