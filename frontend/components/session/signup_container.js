import { connect } from 'react-redux';
import SessionForm from './session_form';
import { signup } from '../../actions/session_actions';

const mapStateToProps = state => {
  return {
    defaultState: { username: '', password: '', passVerify: '', passwordError: ""},
    user: { username: '', password: '', passVerify: '', passwordError: ""},
    formType: 'Sign Up',
    errors: state.errors.session,
    loggedIn: Boolean(state.session.currentUserId)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    action: (user) => dispatch(signup(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
