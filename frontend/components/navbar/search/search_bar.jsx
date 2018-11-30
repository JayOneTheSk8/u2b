import React from 'react';
import SearchIcon from './search_icon';
import { fetchResults } from '../../../actions/search_actions';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  const queryResults = Object.keys(state.search).map(id => state.search[id]);
  return {
    queryResults,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchResults: search => dispatch(fetchResults(search)),
  };
};

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { query: '', hideResults: false };
    this.queryText = this.queryText.bind(this);
    this.hideList = this.hideList.bind(this);
    this.showList = this.showList.bind(this);
    this.fullSearch = this.fullSearch.bind(this);
  }

  queryText(e) {
    this.setState({ query: e.target.value });
    if (e.target.value) {
      this.props.fetchResults(e.target.value);
    }
  }

  hideList(e) {
    this.setState({ hideResults: true });
  }

  showList(e) {
    this.setState({ hideResults: false });
  }

  fullSearch(e) {}

  render() {
    const results = this.props.queryResults.map(result => {
      return (
        <li
          key={result.id}
          onClick={this.fullSearch}
          className="result-list-item"
        >
          {result.title}
        </li>
      );
    });
    let resultList = () => {
      return (
        <>
          <ul className="result-list">{results}</ul>
        </>
      );
    };
    if (results.length === 0 || this.state.hideResults) {
      resultList = () => {
        return null;
      };
    }
    return (
      <div className="search-area">
        <form className="search-bar" onSubmit={this.fullSearch}>
          <input
            className="search-input"
            type="text"
            placeholder="Search U2B..."
            onChange={this.queryText}
            value={this.state.query}
            onBlur={this.hideList}
            onFocus={this.showList}
          />
          <SearchIcon />
        </form>
        {resultList()}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
