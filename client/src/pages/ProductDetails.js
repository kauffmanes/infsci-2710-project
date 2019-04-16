import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProductDetails } from '../actions/productsActions';
import Layout from '../components/Layout';
import Placeholder from '../placeholder.jpg';
// import Breadcrumbs from '../components/Breadcrumbs';

class ProductDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			homeRedirect: false
		}
	}
 
	componentDidMount() {
		const oldProductId = this.props.match && this.props.match.params && this.props.match.params.productId;
		this.props.getProductDetails(oldProductId);
	}

  render() {
		let details = this.props.productDetails;
		return (
			<Layout>
				<div className='o-breadcrumbs'>
					<Link to='Products' /><Link to='/home'>Home</Link> / <Link to={`/home?cat=${details.category_id}`}>{details.category_name}</Link> / {details.name}
				</div>
				<div className="c-details">
					<div><img src={details.imgUrl || Placeholder} alt={this.props.name} /></div>
					<div className='c-details__about'>
						<h2>{details.name}</h2>
						<p>{details.description}</p>
						</div>
				</div>
			</Layout>
    );
  }
}

const mapStatetoProps = state => ({
	productDetails: state.products.productDetails
}); 

export default connect(mapStatetoProps, { getProductDetails })(ProductDetails);

