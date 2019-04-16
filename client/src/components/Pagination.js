import React from 'react';

const Pagination = (props) => {
	return (
		<div className='c-pagination'>
			<button type='button' onClick={props.prev} className='c-pagination__btn'>Previous</button>
			<button type='button' onClick={props.next} className='c-pagination__btn'>Next</button>
		</div>
	);
};

export default Pagination;