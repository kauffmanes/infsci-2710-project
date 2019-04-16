import React from 'react';
import Placeholder from '../placeholder.jpg';

const Item = props => (
	<div className='c-products__item'>
		<img src={Placeholder} alt={props.name} />
		<h2>{props.name}</h2>
		<p>{`$${props.price.toFixed(2)}`}</p>
	</div>
);

export default Item;