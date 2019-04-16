import React from 'react';

const Pagination = (props) => {
	return (
		<div className='c-pagination'>
			<button type='button' disabled={!props.offset || props.offset <= 0} onClick={props.prev} className='c-pagination__btn'>Previous</button>
			<button type='button' disabled={!(props.offset + props.limit < props.count)} onClick={props.next} className='c-pagination__btn'>Next</button>
		</div>
	);
};

export default Pagination;