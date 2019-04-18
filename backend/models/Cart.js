'use strict';

const sql = require('./db');

const Cart = function(product) {
	this.customer_id = product.customer_id;
	this.product_id = product.product_id;
};

Cart.create = function create (newProdcct, result) {
	sql.query('INSERT INTO ShoppingCart SET ?', newProdcct, function (err, res) {
		if (err) {
			result(err, null);
		} else {
			result(null, res.insertId);
		}	
	});
}

Cart.getAll = function (options, result) {
	const query = `SELECT Products.* FROM ShoppingCart, Products, Customer WHERE ShoppingCart.product_id = Products.product_id AND ShoppingCart.customer_id = Customer.customer_id`;
	sql.query(query, function (err, rows) {
		if (err) {
			console.log(err);
			result(err, null);
			return;
		}
		result(null, rows);
	});
};
module.exports = Cart;