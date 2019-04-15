import React, { Component } from 'react';

const styles = {
	textAlign: 'left',
	background: 'rgba(0,0,0,.05)',
	padding: '2rem 4rem',
	display: 'block'
};

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
			<aside style={styles}>
				<input style={inputStyles} type="search" placeholder='Start typing to search by product name or description...' />
				<button className='o-btn-link' type='button' onClick={() => this.setState({ showAdvanced: !this.state.showAdvanced })}>Advanced Search</button>
				{this.state.showAdvanced ? <div className='c-filters__adv'>
					more info
				</div> : null}
			</aside>
		)
	}
}

export default Filters;