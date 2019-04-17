import React from 'react';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';

import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import AuthEntry from './pages/AuthEntry';

export const Routes = () => (
	<Switch>
		<Route exact path='/home' component={Home} />
		<Route exact path='/products/id/:productId' component={ProductDetails} />
		<Route exact path='/login' component={AuthEntry} />
		<Route exact path="/" render={() => <Redirect to="/home" />} />
		<Redirect to="/" />
	</Switch>
);

export default withRouter(Routes);