import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch, withRouter } from 'react-router-dom';

import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';

export const Routes = () => (
	<Router>
			<Switch>
			<Route exact path='/home' component={Home} />
			<Route exact path='/products/id/:productId' component={ProductDetails} />
			<Route exact path="/" render={() => <Redirect to="/home" />} />
			<Redirect to="/" />
		</Switch>
	</Router>
);

export default withRouter(Routes);