import React from 'react';
import SearchIcon from './search_icon';
import { fetchResults, clearResults } from '../../../actions/search_actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    queryResults: state.search.resultList,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchResults: search => dispatch(fetchResults(search)),
    clearResults: () => dispatch(clearResults()),
  };
};

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { query: '', hideResults: false, lastSearch: null };
    this.queryText = this.queryText.bind(this);
    this.hideList = this.hideList.bind(this);
    this.showList = this.showList.bind(this);
    this.fullSearch = this.fullSearch.bind(this);
    this.listSearch = this.listSearch.bind(this);
    this.prepToClick = this.prepToClick.bind(this);
    this.unprepToClick = this.unprepToClick.bind(this);
  }

  queryText(e) {
    this.setState({ query: e.target.value });
    if (e.target.value) {
      this.props.fetchResults(e.target.value);
    }
  }

  hideList(e) {
    if (!this.state.liHovered) {
      this.setState({ hideResults: true });
      this.props.clearResults();
    }
  }

  showList(e) {
    this.setState({ hideResults: false });
  }

  prepToClick(e) {
    this.setState({ liHovered: true });
  }

  unprepToClick(e) {
    this.setState({ liHovered: false });
  }

  listSearch(e) {
    e.preventDefault();
    const search_query = encodeURIComponent(e.currentTarget.innerText);
    this.props.history.push(`/results?search_query=${search_query}`);
  }

  fullSearch(e) {
    e.preventDefault();
    const search_query = encodeURIComponent(this.state.query);
    this.props.history.push(`/results?search_query=${search_query}`);
  }

  render() {
    const results = this.props.queryResults.map((result, idx) => {
      return (
        <li
          key={idx}
          onClick={this.listSearch}
          onMouseEnter={this.prepToClick}
          onMouseLeave={this.unprepToClick}
          className="result-list-item"
        >
          {result}
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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SearchBar)
);
