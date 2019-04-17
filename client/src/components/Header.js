import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/userActions';

const styles = {
	textAlign: `left`,
	borderBottom: 'solid 1px rgba(0,0,0,.1)',
	padding: '0 4rem',
	background: 'var(--PrimaryBlue)',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between'
};

const Header = (props) => (
	<header style={styles}>
		<Link to={'/'}><h1>Robot &amp; Components Store</h1></Link>
		{props.currentUser && props.currentUser.firstName ? (<p>{`Hi ${props.currentUser.firstName}`}  (<button onClick={props.logout} style={{ color: 'white'	}} className='o-btn-link'>logout</button>)</p>) : (<Link to='/login'>Sign Up / Login</Link>)}
	</header>
);

const mapStateToProps = state => ({
	currentUser: state.user.currentUser
});

export default connect(mapStateToProps, { logout })(Header);