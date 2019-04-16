import React from 'react';
import Placeholder from './placeholder.jpg';

const Item = props => (
	<div className='c-products__item'>
		<img src={Placeholder} alt={props.name} />
		{props.name}
	</div>
);

export default Item;