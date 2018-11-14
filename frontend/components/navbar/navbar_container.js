import { connect } from 'react-redux';
import NavBar from './navbar';
import * as SessionActions from '../../actions/session_actions';

const mapStateToProps = (state) => {
  const currentUserId = state.session.currentUserId
  return {
    currentUser: state.entities.users[currentUserId] || {}
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     login: (user) => dispatch(login(user)),
//     login: (user) => dispatch(login(user)),
//   };
// };

export default connect(mapStateToProps, null)(NavBar)
