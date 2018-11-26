export const DROPDOWN_WITH_MODAL = 'DROPDOWN_WITH_MODAL';
export const DROPDOWN_WITHOUT_MODAL = 'DROPDOWN_WITHOUT_MODAL';
export const OPEN_USER_DRAWER = 'OPEN_USER_DRAWER';
export const CLEAR_SCREEN = 'CLEAR_SCREEN';
export const MODAL_ONLY = 'MODAL_ONLY';


export const openModalDropdownMenu = () => dispatch => {
  return dispatch({ type: DROPDOWN_WITH_MODAL });
};

export const openOnlyDropdownMenu = () => dispatch => {
  return dispatch({ type: DROPDOWN_WITHOUT_MODAL });
};

export const openUserDrawer = () => dispatch => {
  return dispatch({ type: OPEN_USER_DRAWER });
};

export const clearScreen = () => dispatch => {
  return dispatch({ type: CLEAR_SCREEN });
};

export const modalOnly = () => dispatch => {
  return dispatch({ type: MODAL_ONLY })
};
