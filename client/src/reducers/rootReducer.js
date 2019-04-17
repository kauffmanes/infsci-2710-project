import { combineReducers } from 'redux';
import products from './productsReducer';
import user from './userReducer';

const rootReducer = combineReducers({
	products,
	user
});

export default rootReducer;