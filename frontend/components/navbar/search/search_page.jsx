import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  clearResults,
  fetchFullResults,
} from '../../../actions/search_actions';
import MinimisedVideoResult from './minimised_video_result';
import MinimisedUserResult from './minimised_user_result';

function parseKeys(usersObject) {
  const allKeys = Object.keys(usersObject);
  const userKeys = [];
  for (let i = 0; i < allKeys.length; i++) {
    if (allKeys[i] !== 'subscribers') {
      userKeys.push(allKeys[i]);
    }
  }
  return userKeys;
}

const mapStateToProps = state => {
  const userKeys = parseKeys(state.search.users);
  const users = userKeys.map(id => state.search.users[id]);
  const currentUserId = state.session.currentUserId || {};
  const videos = Object.keys(state.search.videos).map(
    id => state.search.videos[id]
  );
  for (let i = 0; i < videos.length; i++) {
    videos[i].uploaderName =
      state.search.uploaders[videos[i].uploader_id].username;
  }
  for (let j = 0; j < users.length; j++) {
    let ownVideos = videos.filter(video => video.uploader_id === users[j].id);
    users[j].videoCount = ownVideos.length;
    if (state.search.users.subscribers) {
      users[j].subscribers = state.search.users.subscribers[users[j].id];
    }
  }
  return {
    currentUserId,
    users,
    videos: videos.reverse(),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearResults: () => dispatch(clearResults()),
    fetchFullResults: search => dispatch(fetchFullResults(search)),
  };
};

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { location: this.props.location.search };
  }

  componentDidUpdate() {
    if (this.props.location.search !== this.state.location) {
      const searchKey = this.props.location.search.split('=')[1];
      const search = decodeURIComponent(searchKey);
      this.props.fetchFullResults(search);
      this.setState({ location: this.props.location.search });
    }
  }

  componentWillMount() {
    const searchKey = this.props.location.search.split('=')[1];
    const search = decodeURIComponent(searchKey);
    if (!search) { return; }
    this.props.fetchFullResults(search);
    this.setState({ location: this.props.location.search });
  }

  render() {
    let key = -1;
    const videos = this.props.videos.map(video => {
      key++;
      return <MinimisedVideoResult key={key} video={video} />;
    });
    const users = this.props.users.map(user => {
      key++;
      return (
        <MinimisedUserResult
          key={key}
          currentUserId={this.props.currentUserId}
          userId={user.id}
          border={user.thumbnail_border}
          circle={user.thumbnail_background}
          letter={user.thumbnail_letter}
          username={user.username}
          subscriptions={user.subscribers ? user.subscribers : {}}
          subCount={user.subscribers ? Object.keys(user.subscribers).length : 0}
          videoCount={user.videoCount}
        />
      );
    });
    if (videos.length === 0 && users.length === 0) {
      return (
        <div className="null-area">
          <p className="no-results">No Results :(</p>
        </div>
      );
    } else if (videos.length === 0 && users.length !== 0) {
      return (
        <div className="results">
          <ul>
            {users}
          </ul>
        </div>
      );
    } else if (videos.length !== 0 && users.length === 0) {
      return (
        <div className="results">
          <ul>
            {videos}
          </ul>
        </div>
      );
    }
    return (
      <div className="results">
        <ul>
          {users}
            <div className="search-divider" />
          {videos}
        </ul>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPage);
