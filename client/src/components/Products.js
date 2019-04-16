import React, { Component } from 'react';
import axios from 'axios';
import queryString from 'query-string';
import { connect } from 'react-redux';

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
			offset: 0,
			price: 'ASC'
		}

		this.fetchAllProducts = this.fetchAllProducts.bind(this);
		this.next = this.next.bind(this);
		this.prev = this.prev.bind(this);
	}

	componentDidMount() {
		const urlParams =  queryString.parse(this.props.location && this.props.location.search);
		
		this.setState({
			limit: parseInt(urlParams.limit, 10) || 12,
			offset: parseInt(urlParams.offset, 10) || 0,
			price: urlParams.price || 'ASC'
		});

		this.fetchAllProducts(this.state.limit, this.state.offset);
	}

	componentDidUpdate(prevProps) {

		console.log('in update')
		let curr = this.props.location.search || {};
		let old = prevProps.location.search || {};

		if (curr.limit !== old.limit || curr.offset !== old.offset || prevProps.priceSort !== this.props.priceSort) {
			this.fetchAllProducts(this.state.limit, this.state.offset);
		}
	}

	fetchAllProducts(limit, offset) {
		axios.get(`/api/products?limit=${limit}&offset=${offset}&price=${this.props.priceSort}`).then(response => {
			const data = response && response.data;

			this.setState({
				products: data.products || [],
				count: data.count || 0,
				limit: data.limit || this.state.limit,
				offset: data.offset || this.state.offset
			});

		}).catch(err => {
			console.log(err);
		});
	}

	prev() {
    if (this.state.offset > 0) {
			history.push(`/home?limit=${this.state.limit}&offset=${this.state.offset - this.state.limit}`);
      this.fetchAllProducts(this.state.limit, this.state.offset - this.state.limit);
    }
	}
	
	next() {
    if (this.state.offset + this.state.limit < this.state.count) {
			history.push(`/home?limit=${this.state.limit}&offset=${this.state.offset + this.state.limit}`);
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
					<Pagination limit={this.state.limit} offset={this.state.offset} count={this.state.count} next={this.next} prev={this.prev}/>
				</main>
			);
		} else {
			return <p className='c-products--none'>No items were found that match that search. Clear some filters to try again.</p>;
		}
	}
}

const mapStateToProps = state => ({
	priceSort: state.priceSort
});

export default connect(mapStateToProps)(Products);