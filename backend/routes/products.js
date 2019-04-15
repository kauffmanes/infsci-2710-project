const express = require('express');
const productsRouter = express.Router();
const Product = require('../models/Product');

productsRouter.get('/', (req, res) => {
	Product.getAll(function (err, products) {
		console.log('prod callback');
		if (err) {
			return res.send(err);
		}
		return res.send(products);
	});
});

module.exports = productsRouter;