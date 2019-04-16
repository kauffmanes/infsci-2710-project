import {
	UPDATE_PRICE_SORT
} from './actions/types';

const initialState = {
	priceSort: 'ASC'
};

export default (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_PRICE_SORT:
			return { ...state, priceSort: action.priceSort };
		default:
      return state;
	}
};