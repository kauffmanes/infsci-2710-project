import {
	FAILED_TO_CREATE_USER,
	CREATE_NEW_USER,
	CLEAR_USER_ERRORS
} from '../actions/types';

const initialState = {
	newUser: null,
	error: null
};

export default (state = initialState, action) => {
	switch (action.type) {
		case CLEAR_USER_ERRORS:
			return { ...state, error: null }
		case FAILED_TO_CREATE_USER:
			return { ...state, error: action.error };
		case CREATE_NEW_USER:
			return { ...state, newUser: action.newUser, error: null };
		default:
      return state;
	}
};