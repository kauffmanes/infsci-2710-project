const express = require('express');
const productsRouter = express.Router();
const Product = require('../models/Product');

productsRouter.get('/', (req, res) => {
	const options = {
		offset: parseInt(req.query.offset, 10) || 0,
		limit: parseInt(req.query.limit, 10) || 10,
		priceSort: req.query.price,
		query: req.query.q,
		categoryId: req.query.cat || null
	};
	Product.getAll(options, function (err, response) {
		if (err) {
			return res.send(err);
		}
		return res.send(response);
	});
});

productsRouter.get('/id/:id', (req, res) => {

	const productId = req.params.id;
	
	Product.getProductById(productId, function (err, response) {
		if (err) {
			return res.send(err);
		}
		return res.send(response);
	});
});

module.exports = productsRouter;