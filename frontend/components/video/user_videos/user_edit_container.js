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
  const borderColors = {
    red: (currentUser.thumbnailBorder === "red" ? true : false),
    orange: (currentUser.thumbnailBorder === "orange" ? true : false),
    yellow: (currentUser.thumbnailBorder === "yellow" ? true : false),
    green: (currentUser.thumbnailBorder === "green" ? true : false),
    blue: (currentUser.thumbnailBorder === "blue" ? true : false),
    purple: (currentUser.thumbnailBorder === "purple" ? true : false),
    black: (currentUser.thumbnailBorder === "black" ? true : false),
    pink: (currentUser.thumbnailBorder === "pink" ? true : false),
    brown: (currentUser.thumbnailBorder === "brown" ? true : false)
  };
  const circleColors = {
    red: (currentUser.thumbnailBackground === "red" ? true : false),
    orange: (currentUser.thumbnailBackground === "orange" ? true : false),
    yellow: (currentUser.thumbnailBackground === "yellow" ? true : false),
    green: (currentUser.thumbnailBackground === "green" ? true : false),
    blue: (currentUser.thumbnailBackground === "blue" ? true : false),
    purple: (currentUser.thumbnailBackground === "purple" ? true : false),
    white: (currentUser.thumbnailBackground === "white" ? true : false),
    black: (currentUser.thumbnailBackground === "black" ? true : false),
    pink: (currentUser.thumbnailBackground === "pink" ? true : false),
    brown: (currentUser.thumbnailBackground === "brown" ? true : false)
  };
  const letterColors = {
    red: (currentUser.thumbnailLetter === "red" ? true : false),
    orange: (currentUser.thumbnailLetter === "orange" ? true : false),
    yellow: (currentUser.thumbnailLetter === "yellow" ? true : false),
    green: (currentUser.thumbnailLetter === "green" ? true : false),
    blue: (currentUser.thumbnailLetter === "blue" ? true : false),
    purple: (currentUser.thumbnailLetter === "purple" ? true : false),
    white: (currentUser.thumbnailLetter === "white" ? true : false),
    black: (currentUser.thumbnailLetter === "black" ? true : false),
    pink: (currentUser.thumbnailLetter === "pink" ? true : false),
    brown: (currentUser.thumbnailLetter === "brown" ? true : false)
  };
  return {
    currentUser,
    defaultSettings,
    borderColors,
    circleColors,
    letterColors,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUser: user => dispatch(updateUser(user)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserEditForm));
