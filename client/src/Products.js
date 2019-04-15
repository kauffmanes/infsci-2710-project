import React, { Component } from 'react';
import axios from 'axios';
import Item from './Item';

class Products extends Component {

	state = {
		products: []
	}
	componentDidMount() {
		axios.get('/api/products').then(response => {
			console.log(response)
			const products = response && response.data || [];
			this.setState({ products });
		});
	}
	render() {
		return (
			<main className='c-products'>
				{this.state.products && this.state.products.length > 0 ?
					this.state.products.map(item => <Item key={item.product_id} {...item} />) :
					<p>No items were found that match that search. Clear some filters to try again.</p>}
			</main>
		);
	}
}

export default Products;