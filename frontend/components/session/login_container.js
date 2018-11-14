import { connect } from 'react-redux';
import SessionForm from './session_form';
import { login } from '../../actions/session_actions';

const mapStateToProps = state => {
  return {
    user: { username: '', password: '' },
    formType: "Log In",
    errors: state.errors.session,
    loggedIn: Boolean(state.session.currentUserId)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    action: (user) => dispatch(login(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
