import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearResults, fetchFullResults } from '../../../actions/search_actions';

const mapStateToProps = (state, ownProps) => {
  const users = Object.keys(state.search.users).map((id) => state.search.users[id]);
  const videos = Object.keys(state.search.videos).map((id) => state.search.videos[id]);
  for (let i = 0; i < videos.length; i++) {
    videos[i].uploaderName =
      state.search.uploaders[videos[i].uploader_id].username;
  }
  return {
    users,
    videos,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearResults: () => dispatch(clearResults()),
    fetchFullResults: (search) => dispatch(fetchFullResults(search)),
  };
};

class SearchPage extends React.Component {
  componentDidMount() {
    debugger
    const search = this.props.location.search.split('=')[1];
    this.props.fetchFullResults(search).then(
      (action) => {
        debugger
      }
    );
  }

  render() {

    return (
      <div>
        <h1>This is the search page</h1>
      </div>
    );
  }

}

// export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
export default connect(null, mapDispatchToProps)(SearchPage);
