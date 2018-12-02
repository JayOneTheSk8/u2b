import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearResults, fetchFullResults } from '../../../actions/search_actions';

const mapStateToProps = (state, ownProps) => {
  debugger
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
    fetchResults: (search) => dispatch(fetchResults(search)),
  };
};

class SearchPage extends React.Component {

  componentDidMount() {
    debugger
  }

  render() {
    return (
      <>
        <h1>This is the search page</h1>
      </>
    );
  }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchPage));
