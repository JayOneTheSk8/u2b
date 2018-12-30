import { connect } from 'react-redux';
import DropdownMenu from './dropdown_menu';
import { withRouter } from 'react-router-dom';
import { clearScreen } from '../../../actions/ui_actions';
import { fetchSubscriptions, fetchLikedVideos } from '../../../actions/video_actions';

const mapStateToProps = state => {
  const loggedIn = Boolean(state.session.currentUserId);
  const currentUserId = state.session.currentUserId || {};
  return {
    loggedIn,
    currentUserId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearScreen: () => dispatch(clearScreen()),
    fetchSubscriptions: (userId) => dispatch(fetchSubscriptions(userId)),
    fetchLikedVideos: (userId) => dispatch(fetchLikedVideos(userId)),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(DropdownMenu)
);
