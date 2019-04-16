import React, { Component } from 'react';

const inputStyles = {
	width: '50vw',
	padding: `1rem`,
	marginBottom: '.5rem'
};


class Filters extends Component {
	state = {
		showAdvanced: false
	}
	render() {
		return (
			<aside className='c-filters'>
				<input style={inputStyles} type="search" placeholder='Start typing to search by product name or description...' />
				<button style={{display: 'block', padding: 0}} className='o-btn-link' type='button' onClick={() => this.setState({ showAdvanced: !this.state.showAdvanced })}>Advanced Search</button>
				{this.state.showAdvanced ? <div className='c-filters__adv'>
					<div>
						<label>
							<strong style={{ display: 'block', marginBottom: '1rem'}}>Order by:</strong>
							<div className='c-filters__input'><input type='radio' value='asc'/> Alphabetically</div>
							<div className='c-filters__input'><input type='radio' value='price-low'/> Price (low)</div>
							<div className='c-filters__input'><input type='radio' value='price-high'/> Price (high)</div>
						</label>
					</div>
					<div>
						<label>
							<strong style={{ display: 'block', marginBottom: '1rem'}}>Vendor:</strong>
							<div className='c-filters__input'><input type='radio' value='asc'/> Alphabetically</div>
							<div className='c-filters__input'><input type='radio' value='price-low'/> Price (low)</div>
							<div className='c-filters__input'><input type='radio' value='price-high'/> Price (high)</div>
						</label>
					</div>
				</div> : null}
			</aside>
		)
	}
}

export default Filters;