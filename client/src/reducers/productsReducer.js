import {
	UPDATE_PRICE_SORT,
	UPDATE_QUERY,
	UPDATE_PRODUCTS,
	UPDATE_QUERY_PARAMS,
	FAILED_TO_UPDATE_PRODUCTS,
	UPDATE_OFFSET,
	UPDATE_COUNT,
	UPDATE_LIMIT
} from '../actions/types';

const initialState = {
	priceSort: 'ASC',
	query: '',
	products: [],
	offset: 0,
	limit: 12,
	count: 0
};

export default (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_PRODUCTS:
			return { ...state, products: action.products };
		case UPDATE_PRICE_SORT:
			return { ...state, priceSort: action.priceSort };
		case UPDATE_QUERY_PARAMS:
			return { ...state, queryParams: action.queryParams };
		case UPDATE_QUERY:
			return { ...state, query: action.query };
		case FAILED_TO_UPDATE_PRODUCTS:
			return { ...state, products: [] };
		case UPDATE_OFFSET:
			return { ...state, offset: action.offset };
		case UPDATE_COUNT:
			return { ...state, count: action.count };
		case UPDATE_LIMIT:
			return { ...state, limit: action.limit };
		default:
      return state;
	}
};