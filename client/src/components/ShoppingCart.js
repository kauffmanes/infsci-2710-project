import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class ShoppingCart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cartRedirect: false
		};
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
							this.props.items.map(item => {
								return <div className='c-cart__item'key={item.product_id}>{item.name}</div>
							})
						}
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

export default connect(mapStateToProps)(ShoppingCart);