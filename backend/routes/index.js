'use strict';

const express = require('express');
// const verifyToken = require('../utils').verifyToken;

const productRouter = require('./products');

const apiRouter = express.Router();

apiRouter
	.use('/products', productRouter)
	.use('/', (_, res) => res.send('API is up and running'));

module.exports = apiRouter;