import React, { Component } from 'react';
// import axios from 'axios';
import queryString from 'query-string';
import { connect } from 'react-redux';

import { history } from '../CustomBrowserWrapper';
import Item from './Item';
import Pagination from './Pagination';
import {
	fetchAllProducts,
	updateLimit,
	updateOffset
} from '../actions/productsActions';

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

		this.next = this.next.bind(this);
		this.prev = this.prev.bind(this);
	}

	componentDidMount() {
		const urlParams =  queryString.parse(this.props.location && this.props.location.search);
		if (urlParams.limit) this.props.updateLimit(urlParams.limit);
		if (urlParams.offset) this.props.updateOffset(urlParams.offset);
		this.props.fetchAllProducts();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.priceSort !== this.props.priceSort) {
			this.props.updateOffset(0);
			this.props.fetchAllProducts();
		}
	}

	prev() {
    if (this.props.offset > 0) {
			history.push(`/home?limit=${this.props.limit}&offset=${parseInt(this.props.offset, 10) - parseInt(this.props.limit, 10)}`);
			this.props.updateOffset(this.props.offset - this.props.limit);
      this.props.fetchAllProducts();
    }
	}
	
	next() {
    if (this.props.offset + this.props.limit < this.props.count) {
			history.push(`/home?limit=${this.props.limit}&offset=${parseInt(this.props.offset, 10) + parseInt(this.props.limit, 10)}`);
			this.props.updateOffset(this.props.offset + this.props.limit);
			this.props.fetchAllProducts();
    }
  }

	render() {
		if (this.props.products && this.props.products.length > 0) {
			return (
				<main>
					<div className='c-products'>
						{this.props.products.map(item => <Item key={item.product_id} {...item} />)}
					</div>
					<Pagination limit={this.props.limit} offset={this.props.offset} count={this.props.count} next={this.next} prev={this.prev}/>
				</main>
			);
		} else {
			return <p className='c-products--none'>No items were found that match that search. Clear some filters to try again.</p>;
		}
	}
}

const mapStateToProps = state => ({
	priceSort: state.products.priceSort,
	products: state.products.products,
	limit: state.products.limit,
	offset: state.products.offset,
	count: state.products.count
});

export default connect(mapStateToProps, {
	fetchAllProducts,
	updateLimit,
	updateOffset
})(Products);