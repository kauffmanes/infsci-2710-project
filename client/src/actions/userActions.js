import axios from 'axios';
import {
	CREATE_NEW_USER,
	FAILED_TO_CREATE_USER,
	CLEAR_USER_ERRORS
} from './types';

export const createUser = (user) => dispatch => {
	axios.post('/api/users', user).then((response) => {
		const newUser = response && response.data;
		dispatch({ type: CREATE_NEW_USER, newUser });
	}).catch(error => {
		dispatch({ type: FAILED_TO_CREATE_USER, error: error && error.response && error.response.data || 'Unable to make user' });
	});
};

export const clearUserErrors = () => dispatch => {
	dispatch({ type: CLEAR_USER_ERRORS });
};