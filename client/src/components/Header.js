import React from 'react';

const styles = {
	textAlign: `left`,
	borderBottom: 'solid 1px rgba(0,0,0,.1)',
	padding: '0 4rem',
	background: 'var(--PrimaryBlue)'
};

const Header = () => (
	<header style={styles}>
		<a href='/home'><h1>Robot &amp; Components Store</h1></a>
	</header>
);

export default Header;