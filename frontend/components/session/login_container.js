import { connect } from 'react-redux';
import SessionForm from './session_form';
import {
  login,
  REMOVE_ERRORS,
  removeErrors,
} from '../../actions/session_actions';

const mapStateToProps = state => {
  return {
    defaultState: { username: '', password: '' },
    user: { username: '', password: '' },
    formType: 'Log In',
    errors: state.errors.session,
    loggedIn: Boolean(state.session.currentUserId),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    action: user => dispatch(login(user)),
    demoLogin: () =>
      dispatch(login({ username: 'Demo User', password: 'starwars' })),
    removeErrors: () => dispatch(removeErrors()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm);
