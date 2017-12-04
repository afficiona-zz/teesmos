import {
  fetchList as fetchListTApi
} from '../api';

const fetchList = () => dispatch => {
  dispatch({ type: 'FETCH_LIST_INIT' });
  return fetchListTApi().then(
    data => {
      dispatch({ type: 'FETCH_LIST_SUCCESS', data });
    },
    error => {
      dispatch({ type: 'FETCH_LIST_ERROR', error });
    }
  );
};

const updateList = (searchQuery) => dispatch => {
  dispatch({ type: 'UPDATE_LIST', searchQuery });
};

export default {
  fetchList,
  updateList
};
