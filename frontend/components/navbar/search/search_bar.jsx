import React from 'react';
import SearchIcon from './search_icon';
import { fetchResults, clearResults } from '../../../actions/search_actions';
import { withRouter, Redirect } from 'react-router-dom';
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
    this.state = { query: '', hideResults: false, lastSearch: null, pickedLi: -1, cachedQuery: '' };
    this.queryText = this.queryText.bind(this);
    this.hideList = this.hideList.bind(this);
    this.showList = this.showList.bind(this);
    this.fullSearch = this.fullSearch.bind(this);
    this.listSearch = this.listSearch.bind(this);
    this.prepToClick = this.prepToClick.bind(this);
    this.unprepToClick = this.unprepToClick.bind(this);
    this.selectLi = this.selectLi.bind(this);
  }

  queryText(e) {
    this.setState({ pickedLi: -1, query: e.target.value, cachedQuery: e.target.value });
    if (e.target.value) {
      this.props.fetchResults(e.target.value);
    }
  }

  hideList(e) {
    if (!this.state.liHovered) {
      this.setState({ hideResults: true });
      this.props.clearResults();
    }
    window.removeEventListener('keydown', this.selectLi);
  }

  showList(e) {
    this.setState({ hideResults: false });
    window.addEventListener('keydown', this.selectLi);
  }

  selectLi(e) {
    let nextLi, last;
    switch (e.keyCode) {
      case 38: // up
        nextLi = this.state.pickedLi - 1;
        if (nextLi === -1) {
          this.setState({ query: this.state.cachedQuery, pickedLi: nextLi });
        } else if (nextLi < -1) {
          last = this.props.queryResults.length - 1;
          this.setState({ query: this.props.queryResults[last], pickedLi: last });
        } else {
          this.setState({ query: this.props.queryResults[nextLi], pickedLi: nextLi });
        }
        return;
      case 40: // down
        nextLi = this.state.pickedLi + 1;
        if (nextLi >= this.props.queryResults.length) {
          this.setState({ query: this.state.cachedQuery, pickedLi: -1 });
        } else {
          this.setState({ query: this.props.queryResults[nextLi], pickedLi: nextLi });
        }
        return;
      default:
        return null;
    }
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
          className={`result-list-item ${this.state.pickedLi === idx ? 'selected' : '' }`}
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
            onFocus={this.showList}
            onBlur={this.hideList}
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
