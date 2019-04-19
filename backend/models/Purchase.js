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
			sql.query('UPDATE Products SET quantity_remaining = (quantity_remaining - ?) WHERE product_id = ? ', [newPurchase.quantity_sold, newPurchase.product_id], function(err) {
				result(null, res.insertId);
			});
		}	
	});
}

// SELECT * FROM Purchases, Products, Transactions
// WHERE Purchases.product_id = Products.product_id
// AND Purchases.purchase_id = Transactions.purchase_id
// AND Transactions.customer_id = 60

Purchase.getAll = function getAll (customer_id, result) {
	const query = 'SELECT * FROM Purchases, Products, Transactions WHERE Purchases.product_id = Products.product_id AND Purchases.purchase_id = Transactions.purchase_id AND Transactions.customer_id = ?';
	console.log(query);
	sql.query(query, customer_id, function (err, rows) {
		if (err) {
			result(err, null);
		} else {
			console.log(rows)
			result(null, rows);
		}	
	});
}

module.exports = Purchase;