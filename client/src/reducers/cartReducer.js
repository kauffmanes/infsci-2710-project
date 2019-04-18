import {
	ADD_ITEM_TO_CART
} from '../actions/types';

const initialState = {
	items: []
};

export default (state = initialState, action) => {
	switch (action.type) {
		case ADD_ITEM_TO_CART:
			if (!(state.items.find(item => action.item.product_id === item.product_id))) {
				return { ...state, items: [...state.items, action.item ] };
			} else {
				return state;
			}
		default:
      return state;
	}
};