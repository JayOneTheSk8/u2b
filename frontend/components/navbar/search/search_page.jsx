import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearResults } from '../../../actions/search_actions';

const mapStateToProps = (state, ownProps) => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearResults: () => dispatch(clearResults()),
  };
};

class SearchPage {
  constructor() {

  }
}
