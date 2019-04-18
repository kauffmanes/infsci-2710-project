import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
	getItemsFromCart,
	completePurchase
} from '../actions/cartActions';

class ShoppingCart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cartRedirect: false,
			error: null,
			invalid: false,
			items: [],
			shipping: {
				address: '',
				city: '',
				state: '',
				zip: ''
			},
			payment: {
				cardNumber: '',
				exp: '',
				code: '',
				fullname: ''
			}
		};
		this.validateInput = this.validateInput.bind(this);
		this.updatePayment = this.updatePayment.bind(this);
		this.updateShipping = this.updateShipping.bind(this);
	}

	componentDidMount() {
		this.props.getItemsFromCart();
		this.setState({ items: this.props.items });
	}

	componentDidUpdate(prevProps) {
		if (prevProps.items.length !== this.props.items.length) {
			this.setState({ items: this.props.items });
		}

		if (this.props.purchaseId && this.props.purchaseId !== prevProps.purchaseId) {
			this.setState({ transactionComplete: true });
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

	updateShipping(field, value) {
		let obj = this.state.shipping;
		obj[field] = value;
		this.setState({
			shipping: obj
		});
		console.log(this.state.shipping)
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

		if (this.state.transactionComplete) {
			return <Redirect to='/purchase-summary' />;
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
								<input type='text' onChange={(evt) => this.updateShipping('address', evt.target.value)} placeholder='address' value={this.state.shipping.address}/>
								<input type='text' onChange={(evt) => this.updateShipping('city', evt.target.value)} placeholder='city' value={this.state.shipping.city} />
								<input type='text' onChange={(evt) => this.updateShipping('state', evt.target.value)} placeholder='state' value={this.state.shipping.state} />
								<input type='text' onChange={(evt) => this.updateShipping('zip', evt.target.value)} placeholder='zip' value={this.state.shipping.zip} />
							</div>
						</div>
						<button onClick={() => this.props.completePurchase({
							payment: this.state.payment,
							items: this.state.items,
							shipping: this.state.shipping
						})} type='button'>Complete Purchase</button>
					</>
				) : <p>No items in cart.</p>}
			</>
		);
	}
}

const mapStateToProps = state => ({
	items: state.cart.items,
	purchaseId: state.cart.purchaseId
});

export default connect(mapStateToProps, {
	getItemsFromCart,
	completePurchase
})(ShoppingCart);