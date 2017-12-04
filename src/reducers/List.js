import { fromJS } from 'immutable';

const initialState = fromJS({
  isFetching: false,
  isFetchingError: false,
  error: {},
  data: {
    items: [],
    filters: [],
    originalItems: []
  }
});

export default function(state = initialState, action) {
  let updatedList, filterApplied, searchedFor;
  switch (action.type) {
    case 'FETCH_LIST_INIT':
      return state.merge({
        isFetching: true,
        isFetchingError: false,
        error: {}
      });

    case 'FETCH_LIST_SUCCESS':
      return state.merge({
        isFetching: false,
        data: {
          filters: action.data.filters,
          items: action.data.items,
          originalItems: action.data.items
        }
      });

    case 'FETCH_LIST_ERROR':
      return state.merge({
        isFetching: false,
        isFetchingError: true,
        error: action.error
      });

    case 'UPDATE_LIST':
      if (action.searchQuery) {
        updatedList = state.getIn(['data', 'originalItems']).filter(item => {
          return (action.searchQuery.name ? item.get('name').toLowerCase().indexOf(action.searchQuery.name.toLowerCase()) > -1 : true) &&
            (action.searchQuery.category ? item.get('category') === action.searchQuery.category : true);
        });
        filterApplied = action.searchQuery.category;
        searchedFor = action.searchQuery.name;
      } else {
        updatedList = state.getIn(['data', 'originalItems']);
      }

      return state.mergeIn(['data'], {
        items: updatedList,
        filterApplied,
        searchedFor
      });

    default:
      return state;
  }
}
