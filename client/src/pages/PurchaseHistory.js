import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getPurchaseHistory } from '../actions/cartActions';
import Layout from '../components/Layout';

class PurchaseHistory extends Component {
	constructor(props) {
		super(props);
		this.state = {  };
	}

	componentDidMount() {
		this.props.getPurchaseHistory();
	}

	render() {
		return (
			<Layout>
				{this.props.purchaseHistory && this.props.purchaseHistory.length > 0 ? (
					<table>
						<thead>
							<tr>
								<th>Product</th>
								<th>Quantity</th>
								<th>Purchase Date</th>
							</tr>
						</thead>
						<tbody>
							{this.props.purchaseHistory.map(item => {
								return (
									<tr key={item.purchase_id}>
										<td><Link to={`/products/id/${item.product_id}`}>{item.name}</Link></td>
										<td>{item.quantity_sold}</td>
										<td>{item.date_of_transaction}</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				) : <p>No purchases found.</p>}
			</Layout>
		);
	}
}

const mapStateToProps = state => ({
	purchaseHistory: state.cart.purchaseHistory
});

export default connect(mapStateToProps, {
	getPurchaseHistory
})(PurchaseHistory);