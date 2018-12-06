import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearResults, fetchFullResults } from '../../../actions/search_actions';
import MinimisedVideoResult from './minimised_video_result';

const mapStateToProps = (state, ownProps) => {
  const users = Object.keys(state.search.users).map((id) => state.search.users[id]);
  const videos = Object.keys(state.search.videos).map((id) => state.search.videos[id]);
  for (let i = 0; i < videos.length; i++) {
    videos[i].uploaderName =
      state.search.uploaders[videos[i].uploader_id].username;
  }
  return {
    users,
    videos: videos.reverse(),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearResults: () => dispatch(clearResults()),
    fetchFullResults: (search) => dispatch(fetchFullResults(search)),
  };
};

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { location: this.props.location.search }
  }

  componentDidUpdate() {
    if (this.props.location.search !== this.state.location) {
      this.setState({ location: this.props.location.search });
    }
  }

  componentDidMount() {
    const searchKey = this.props.location.search.split('=')[1];
    const search = decodeURIComponent(searchKey);
    this.props.fetchFullResults(search);
  }

  render() {
    const videos = this.props.videos.map( (video) => {
      return (
        <MinimisedVideoResult key={video.id} video={video} />
      );
    });
    return (
      <div>
        <ul>
          {videos}
        </ul>
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
