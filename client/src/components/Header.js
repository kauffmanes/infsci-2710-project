import React from 'react';
import { Link } from 'react-router-dom';

const styles = {
	textAlign: `left`,
	borderBottom: 'solid 1px rgba(0,0,0,.1)',
	padding: '0 4rem',
	background: 'var(--PrimaryBlue)',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between'
};

const Header = () => (
	<header style={styles}>
		<Link to={'/'}><h1>Robot &amp; Components Store</h1></Link>
		<Link to='/sign-up'>Sign Up / Login</Link>
	</header>
);

export default Header;