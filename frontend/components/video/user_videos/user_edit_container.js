import { connect } from 'react-redux';
import { updateUser } from '../../../actions/session_actions';
import UserEditForm from './user_edit';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => {
  const border = state.session.thumbnailInfo.border || 'black';
  const background = state.session.thumbnailInfo.background || 'green';
  const letter = state.session.thumbnailInfo.letter || 'white';
  const defaultSettings = {
    id: state.session.currentUserId,
    username: state.entities.users[state.session.currentUserId].username,
    thumbnail_border: 'black',
    thumbnail_background: 'green',
    thumbnail_letter: 'white',
  };
  const currentUser = {
    id: state.session.currentUserId,
    username: state.entities.users[state.session.currentUserId].username,
    thumbnailBorder: border,
    thumbnailBackground: background,
    thumbnailLetter: letter,
  };
  return {
    currentUser,
    defaultSettings,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUser: user => dispatch(updateUser(user)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserEditForm));
