'use strict';

const express = require('express');
// const verifyToken = require('../utils').verifyToken;

const productRouter = require('./products');
const categoriesRouter = require('./categories');

const apiRouter = express.Router();

apiRouter
	.use('/products', productRouter)
	.use('/categories', categoriesRouter)
	.use('/', (_, res) => res.send('API is up and running'));

module.exports = apiRouter;