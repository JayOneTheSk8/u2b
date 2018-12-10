import { connect } from 'react-redux';
import SubscriptionsPage from './subscriptions_page';
import { fetchSubscriptions } from '../../../actions/video_actions';

const mapStateToProps = state => {
  const loggedIn = Boolean(state.session.currentUserId);
  const currentUserId = state.session.currentUserId;
  let videos = state.entities.videos.subscriptions || [];
  videos = Object.keys(videos).map(
    id => state.entities.videos.subscriptions[id]
  );
  for (let i = 0; i < videos.length; i++) {
    videos[i].uploaderName = state.entities.users[videos[i].uploader_id].username;
  }
  return {
    loggedIn,
    currentUserId,
    videos,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSubscriptions: userId => dispatch(fetchSubscriptions(userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubscriptionsPage);
