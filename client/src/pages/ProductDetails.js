import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
	getProductDetails,
	getCategoriesById
} from '../actions/productsActions';

import {
	addToCart
} from '../actions/cartActions';

import ShoppingCart from '../components/ShoppingCart';
import Layout from '../components/Layout';
import Placeholder from '../placeholder.jpg';

class ProductDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			homeRedirect: false,
			loginRedirect: false
		}
		this.addtoCart = this.addtoCart.bind(this);
	}
 
	componentDidMount() {
		const productId = this.props.match && this.props.match.params && this.props.match.params.productId;
		this.props.getProductDetails(productId);
	}

	componentDidUpdate(prevProps) {
		const oldProductId = prevProps.match && prevProps.match.params && prevProps.match.params.productId;
		const currProductId = this.props.match && this.props.match.params && this.props.match.params.productId;
		if (oldProductId !== currProductId) {
			this.props.getProductDetails(currProductId);
		}

		if ((prevProps.productDetails && prevProps.productDetails.category_id) !== (this.props.productDetails && this.props.productDetails.category_id)) {
			this.props.getCategoriesById(this.props.productDetails.category_id);
		}
	}

	addtoCart(details) {
		console.log(this.props.token)
		if (!this.props.token) {
			this.setState({ loginRedirect: true });
		}
		this.props.addToCart(details);
	}

  render() {
		let details = this.props.productDetails;
		if (this.state.loginRedirect) {
			return <Redirect to='/login'/>;
		}
		return (
			<Layout>
				<div className='o-breadcrumbs'>
					<Link to='Products' /><Link to='/home'>Home</Link> / <Link to={`/home?cat=${details.category_id}`}>{details.category_name}</Link> / {details.name}
				</div>
				<div className="c-details">
					<div className='c-details__img'><img src={details.imgUrl || Placeholder} alt={this.props.name} /></div>
					<div className='c-details__about'>
						<h2>{details.name}</h2>
						<p>{details.description}</p>
						<button className='o-btn-block' type='button' onClick={() => this.addtoCart(details)}>Add to Cart</button>
					</div>
					<div className='c-details__cart'>
						<ShoppingCart />
					</div>
				</div>
				<div className='c-related'>
					<h2>{`Other popular items in category "${details.category_name}"`}:</h2>
					<div className='c-related__items'>
						{this.props.relatedCategories.map(product => (
							<div className="c-details" key={product.product_id}>
								<div className='c-details__about'>
									<img src={product.imgUrl || Placeholder} alt={product.name} />
									<Link to={`/products/id/${product.product_id}`}><h2>{product.name}</h2></Link>
									<button className='o-btn-block' type='button' onClick={() => this.addtoCart(product)}>Add to Cart</button>
								</div>
							</div>
						))}
					</div>
				</div>
			</Layout>
    );
  }
}

const mapStatetoProps = state => ({
	productDetails: state.products.productDetails,
	relatedCategories: state.products.relatedCategories,
	token: state.user.token
}); 

export default connect(mapStatetoProps, {
	getProductDetails,
	getCategoriesById,
	addToCart
})(ProductDetails);

