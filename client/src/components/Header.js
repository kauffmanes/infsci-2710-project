import React from 'react';
import { Link } from 'react-router-dom';

const styles = {
	textAlign: `left`,
	borderBottom: 'solid 1px rgba(0,0,0,.1)',
	padding: '0 4rem',
	background: 'var(--PrimaryBlue)'
};

const Header = () => (
	<header style={styles}>
		<Link to={'/'}><h1>Robot &amp; Components Store</h1></Link>
	</header>
);

export default Header;