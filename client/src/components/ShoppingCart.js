import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
	getItemsFromCart
} from '../actions/cartActions';

class ShoppingCart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cartRedirect: false,
			error: null,
			invalid: false,
			items: []
		};
		this.validateInput = this.validateInput.bind(this);
	}

	componentDidMount() {
		this.props.getItemsFromCart();
		this.setState({ items: this.props.items });
	}

	componentDidUpdate(prevProps) {
		if (prevProps.items.length !== this.props.items.length) {
			this.setState({ items: this.props.items });
		}
	}

	validateInput(value, product) {
		let products = [];
		products = this.state.items.filter(item => item.product_id !== product.product_id);

		let thisProduct = this.state.items.find(item => item.product_id === product.product_id);

		if (value > product.quantity_remaining) {
			thisProduct.quantity = parseInt(product.quantity_remaining, 10);
		} else if (value) {
			thisProduct.quantity = parseInt(value, 10);
		} else {
			thisProduct.quantity = '';
		}

		products.push(thisProduct);

		this.setState({ items: products });
}

	render() {
		if (this.state.cartRedirect) {
			return <Redirect to='/checkout' />;
		}
		
		return (
			<>
				<h2>Shopping Cart</h2>
				{this.props.items && this.props.items.length > 0 ? (
					<>
						{
							this.state.items.map(item => {
								return (
									<ul className='c-cart__item'key={item.product_id}>
										{item.name}
										<ol>
											<input type="number" value={item.quantity}
												max={item.quantity_remaining} onChange={(evt) => {
													this.validateInput(evt.target.value, item)}}
												placeholder="quantity" />
												({item.quantity_remaining} remaining)
										</ol>
									</ul>
								);
							})
						}
					<p>{this.state.error}</p>
					<button className='o-btn-block' type='button' onClick={() => this.setState({ cartRedirect: true })}>Check out</button>
					</>
				) : <p>No items in cart.</p>}
			</>
		);
	}
}

const mapStateToProps = state => ({
	items: state.cart.items
});

export default connect(mapStateToProps, {
	getItemsFromCart
})(ShoppingCart);