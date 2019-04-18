'use strict';

const sql = require('./db');

const Purchase = function(purchase) {
	this.product_id = purchase.product_id;
	this.quantity_sold = purchase.quantity;
};

// insert
Purchase.createPurchase = function createPurchase (newPurchase, result) {
	sql.query('INSERT INTO Purchases SET ?', newPurchase, function (err, res) {
		if (err) {
			result(err, null);
		} else {
			result(null, res.insertId);
		}	
	});
}

module.exports = Purchase;