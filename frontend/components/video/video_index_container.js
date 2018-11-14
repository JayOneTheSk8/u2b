import { connect } from 'react-redux';
import VideoIndex from './video_index';

const mapStateToProps = state => {
  const currentUser = state.entities.users[state.session.currentUserId] || {username: ""}
  return {
    currentUser
  };
};

export default connect(mapStateToProps, null)(VideoIndex);
