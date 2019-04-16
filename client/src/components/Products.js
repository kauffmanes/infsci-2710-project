import React, { Component } from 'react';
import axios from 'axios';
import queryString from 'query-string';

import { history } from '../CustomBrowserWrapper';
import Item from './Item';
import Pagination from './Pagination';

class Products extends Component {

	constructor(props) {
		super(props);
		this.state = {
			products: [],
			limit: 12,
			count: 0,
			offset: 0
		}

		this.fetchAllProducts = this.fetchAllProducts.bind(this);
		this.next = this.next.bind(this);
		this.prev = this.prev.bind(this);
	}

	componentDidMount() {
		const urlParams =  queryString.parse(this.props.location && this.props.location.search);
		console.log(urlParams)
		this.fetchAllProducts(urlParams.limit || this.state.limit, urlParams.offset || this.state.offset);
	}

	fetchAllProducts(limit, offset) {
		axios.get(`/api/products?limit=${limit}&offset=${offset}`).then(response => {
			const products = response && response.data && response.data.products || [];
			this.setState({ products, count: response && response.data && response.data.count || 0 });
		}).catch(err => {
			console.log(err);
		});
	}

	prev() {
    if (this.state.offset > 0) {
			history.push(`/api/products?limit=${this.state.limit}&offset=${this.state.offset - this.state.limit}`);
      this.fetchAllProducts(this.state.limit, this.state.offset - this.state.limit);
    }
	}
	
	next() {
    if (this.state.offset + this.state.limit < this.state.count) {
			history.push(`/api/products?limit=${this.state.limit}&offset=${this.state.offset + this.state.limit}`);
			this.fetchAllProducts(this.state.limit, this.state.offset + this.state.limit);
    }
  }

	render() {
		if (this.state.products && this.state.products.length > 0) {
			return (
				<main>
					<div className='c-products'>
						{this.state.products.map(item => <Item key={item.product_id} {...item} />)}
					</div>
					<Pagination next={this.next} prev={this.prev}/>
				</main>
			);
		} else {
			return <p className='c-products--none'>No items were found that match that search. Clear some filters to try again.</p>;
		}
	}
}

export default Products;