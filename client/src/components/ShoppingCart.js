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
			items: [],
			payment: {
				cardNumber: '',
				exp: '',
				code: '',
				fullname: ''
			}
		};
		this.validateInput = this.validateInput.bind(this);
		this.checkout = this.checkout.bind(this);
		this.updatePayment = this.updatePayment.bind(this);
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

	updatePayment(field, value) {
		let obj = this.state.payment;
		obj[field] = value;
		this.setState({
			payment: obj
		});

		console.log(this.state.payment)
	}

	checkout() {

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
				<h2>Items</h2>
				{this.props.items && this.props.items.length > 0 ? (
					<>
						<div className='c-cart__items'>
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
						</div>
						<hr />
						<h2>Payment Information</h2>
						<div className='c-cart__payment'>
							<input type='text' placeholder='full name as appears on card' onChange={(evt) => this.updatePayment('fullname', evt.target.value)} value={this.state.payment.fullname} />
							<input type="text" placeholder="XXXX XXXX XXXX XXXX" onChange={(evt) => this.updatePayment('cardNumber', evt.target.value)} value={this.state.payment.cardNumber} />
							<input type='date' placeholder='expiration date' onChange={(evt) => this.updatePayment('exp', evt.target.value)} value={this.state.payment.exp} />
							<input type='text' placeholder='security code' onChange={(evt) => this.updatePayment('code', evt.target.value)} value={this.state.payment.code} />
						</div>
						<hr/>
						<h2>Shipping</h2>

						<div className='c-card_shipping'>
							<button onClick={this.populateAddress}>Use Address on File</button>
							<div>
								<input type='text' placeholder='address' />
								<input type='text' placeholder='city' />
								<input type='text' placeholder='state' />
								<input type='text' placeholder='zip' />
							</div>
						</div>
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