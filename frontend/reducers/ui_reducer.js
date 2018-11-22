import { CLEAR_SCREEN, DROPDOWN_WITH_MODAL, DROPDOWN_WITHOUT_MODAL, OPEN_USER_DRAWER } from '../actions/ui_actions';

const defaultState = { modal: 'hide', dropdown: 'closed', userMenu: 'hide' }

export default (state = defaultState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case DROPDOWN_WITH_MODAL:
      return { modal: 'show', dropdown: 'open', userMenu: 'hide' };
    case DROPDOWN_WITHOUT_MODAL:
      return { modal: 'hide', dropdown: 'open', userMenu: 'hide' };
    case OPEN_USER_DRAWER:
      return { modal: 'clear', dropdown: 'closed', userMenu: 'show' };
    case CLEAR_SCREEN:
      return defaultState;
    default:
      return state;
  };
};
