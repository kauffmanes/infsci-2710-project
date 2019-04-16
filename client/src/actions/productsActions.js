import axios from 'axios';
import configureStore from '../configureStore';

import {
	UPDATE_PRICE_SORT,
	UPDATE_QUERY,
	UPDATE_PRODUCTS,
	FAILED_TO_UPDATE_PRODUCTS,
	UPDATE_COUNT,
	UPDATE_LIMIT,
	UPDATE_OFFSET
} from './types';

const store = configureStore;

export function updatePriceSort(priceSort) {
	return { type: UPDATE_PRICE_SORT, priceSort }
}

export function updateQuery(query) {
	return { type: UPDATE_QUERY, query };
}

export const updateLimit = (limit) => dispatch => {
	dispatch({ type: UPDATE_LIMIT, limit });
};

export const updateOffset = (offset) => dispatch => {
	dispatch({ type: UPDATE_OFFSET, offset });
};

export const fetchAllProducts = () => dispatch => {

	let state = store.getState().products;

	axios.get(`/api/products?limit=${state.limit}&offset=${state.offset}&price=${state.priceSort}`).then(response => {
		const data = response && response.data;
		dispatch({ type: UPDATE_PRODUCTS, products: data.products });
		dispatch({ type: UPDATE_COUNT, count: data.count });
	}).catch(err => {
		console.log(err);
		dispatch({ type: FAILED_TO_UPDATE_PRODUCTS });
	});
}