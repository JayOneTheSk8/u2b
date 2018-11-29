import * as SearchAPIUtil from '../util/search_api_util';

export const RECEIVE_RESULTS = 'RECEIVE_RESULTS';

const receiveResults = results => {
  return {
    type: RECEIVE_RESULTS,
    results: results.items,
  };
};

export const fetchResults = search => dispatch => {
  return SearchAPIUtil.fetchResults(search).then(results =>
    dispatch(receiveResults(results))
  );
};
