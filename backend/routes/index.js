'use strict';

const express = require('express');
// const verifyToken = require('../utils').verifyToken;

const productRouter = require('./products');
const categoriesRouter = require('./categories');
const usersRouter = require('./users');
const cartRouter = require('./cart');
const transactionsRouter = require('./transactions');

const apiRouter = express.Router();

apiRouter
	.use('/products', productRouter)
	.use('/categories', categoriesRouter)
	.use('/users', usersRouter)
	.use('/cart', cartRouter)
	.use('/transactions', transactionsRouter)
	.use('/', (_, res) => res.send('API is up and running'));

module.exports = apiRouter;