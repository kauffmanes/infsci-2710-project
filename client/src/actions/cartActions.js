import axios from 'axios';

import {
	ADD_ITEM_TO_CART,
	// FAILED_TO_ADD_TO_CART
} from './types';

export const addToCart = item => () => {

	// if token exists, use it
	if (localStorage.getItem('token')) {
		axios.defaults.headers.common['x-access-token'] = localStorage.getItem('token');
	} else {
		delete axios.defaults.headers.common['x-access-token'];
	}

	axios.post('/api/cart', item).then(response => {
		console.log(response);
	}).catch(error => {
		console.log(error)
	});

};

export const getItemsFromCart = () => dispatch => {

	// if token exists, use it
	if (localStorage.getItem('token')) {
		axios.defaults.headers.common['x-access-token'] = localStorage.getItem('token');
	} else {
		delete axios.defaults.headers.common['x-access-token'];
	}

	axios.get('/api/cart').then(response => {
		const items = response && response.data;
		for (let i=0;i<items.length;i++) {
			dispatch({
				type: ADD_ITEM_TO_CART,
				item: { ...items[i], quantity: 1}
			});
		}
	});
};
