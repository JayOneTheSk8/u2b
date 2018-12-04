import * as SearchAPIUtil from '../util/search_api_util';

export const RECEIVE_RESULTS = 'RECEIVE_RESULTS';
export const CLEAR_RESULTS = 'CLEAR_RESULTS';
export const RECEIVE_FULL_RESULTS = 'RECEIVE_FULL_RESULTS';

const receiveResults = resultList => {
  return {
    type: RECEIVE_RESULTS,
    resultList,
  };
};

const receiveFullResults = results => {
  return {
    type: RECEIVE_FULL_RESULTS,
    results,
  };
};

export const fetchResults = search => dispatch => {
  return SearchAPIUtil.fetchResults(search).then(results => {
    const resultList = [];
    results.forEach(result => {
      if (result['title']) {
        resultList.push(result['title']);
      } else if (result['username']) {
        resultList.push(result['username']);
      }
    });
    return dispatch(receiveResults(resultList));
  });
};

export const fetchFullResults = search => dispatch => {
  return SearchAPIUtil.fetchFullResults(search).then(results => {
    debugger
    return dispatch(receiveFullResults(results));
  });
};

export const clearResults = () => dispatch => {
  return dispatch({ type: CLEAR_RESULTS });
};
