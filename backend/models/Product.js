'use strict';

const sql = require('./db');

const Product = function(product) {
	this.name = product.name;
	this.created_at = new Date();
};

Product.getProductById = function (_id, result) {
	sql.query('SELECT * FROM Products WHERE id = ? ', _id, function (err, res) {
		if (err) {
			console.log(err);
			result(err, null);
			return;
		}
		result(null, res);
	});
}

Product.getAll = function(result) {
	sql.query('SELECT * FROM Products', function (err, res) {
		if (err) {
			console.log(err);
			result(err, null);
			return;
		}
		result(null, res);
	});
}

module.exports = Product;