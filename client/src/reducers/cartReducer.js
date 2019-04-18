import {
	ADD_ITEM_TO_CART,
	// FAILED_TO_COMPLETE_PURCHASE,
	COMPLETED_TRANSACTION
} from '../actions/types';

const initialState = {
	items: [],
	error: '',
	purchaseId: null
};

export default (state = initialState, action) => {
	switch (action.type) {
		case COMPLETED_TRANSACTION:
			return { ...state, purchaseId: action.purchaseId };
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