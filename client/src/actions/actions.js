import { UPDATE_PRICE_SORT } from './types';

export function updatePriceSort(priceSort) {
	return { type: UPDATE_PRICE_SORT, priceSort }
}