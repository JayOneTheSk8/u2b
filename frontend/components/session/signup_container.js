import { connect } from 'react-redux';
import SessionForm from './session_form';
import {
  signup,
  login,
  REMOVE_ERRORS,
  removeErrors,
  receiveErrors,
} from '../../actions/session_actions';

const mapStateToProps = state => {
  return {
    defaultState: { username: '', password: '', passVerify: '' },
    user: { username: '', password: '', passVerify: '' },
    formType: 'Sign Up',
    errors: state.errors.session,
    loggedIn: Boolean(state.session.currentUserId),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    action: user => dispatch(signup(user)),
    demoLogin: () =>
      dispatch(login({ username: 'Demo User', password: 'starwars' })),
    removeErrors: () => dispatch(removeErrors()),
    passwordMatchError: () =>
      dispatch(receiveErrors([`Those passwords didn't match. Try again.`])),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm);
