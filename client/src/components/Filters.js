import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updatePriceSort, updateQuery } from '../actions/productsActions';

const inputStyles = {
	width: '100%',
	padding: `1rem`,
	marginBottom: '.5rem'
};


class Filters extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showAdvanced: false
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleQuery = this.handleQuery.bind(this);
	}

	handleChange(evt) {
		console.log(evt.target.value)
		this.props.updatePriceSort(evt.target.value);
	}

	handleQuery(evt) {
		console.log(evt.target.value);
		this.props.updateQuery(evt.target.value);
	}

	render() {
		return (
			<aside className='c-filters'>
				
				<input style={inputStyles} type="search" onChange={this.handleQuery} placeholder='Start typing to search by product name or description...' />
				
				<button style={{display: 'block', padding: 0}} className='o-btn-link' type='button' onClick={() => this.setState({ showAdvanced: !this.state.showAdvanced })}>Advanced Search</button>
				
				{this.state.showAdvanced ? <div className='c-filters__adv'>
					<div>
						<label>

							<strong style={{ display: 'block', marginBottom: '1rem'}}>Order by:</strong>
							
							<div className='c-filters__input'>
								<input onChange={this.handleChange} type='radio' value='ASC' checked={this.props.priceSort === 'ASC'}/> Price (low)
							</div>
							
							<div className='c-filters__input'>
								<input onChange={this.handleChange} type='radio' value='DESC' checked={this.props.priceSort !== 'ASC'}/> Price (high)
							</div>

						</label>
					</div>
					{/* <div>
						<label>
							<strong style={{ display: 'block', marginBottom: '1rem'}}>Vendor:</strong>
							<div className='c-filters__input'><input type='radio' value='asc'/> Alphabetically</div>
							<div className='c-filters__input'><input type='radio' value='price-low'/> Price (low)</div>
							<div className='c-filters__input'><input type='radio' value='price-high'/> Price (high)</div>
						</label>
					</div> */}
				</div> : null}
			</aside>
		)
	}
}

const mapStateToProps = state => ({
	priceSort: state.products.priceSort
});

export default connect(mapStateToProps, {
	updatePriceSort,
	updateQuery
})(Filters);