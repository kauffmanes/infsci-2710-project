import {
	ADD_ITEM_TO_CART,
	// FAILED_TO_COMPLETE_PURCHASE,
	COMPLETED_TRANSACTION,
	UPDATE_PURCHASE_HISTORY,
} from '../actions/types';

const initialState = {
	items: [],
	error: '',
	purchaseId: null,
	purchaseHistory: []
};

export default (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_PURCHASE_HISTORY:
			return { ...state, purchaseHistory: action.purchaseHistory };
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