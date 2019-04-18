const express = require('express');
const purchasesRouter = express.Router();
const Transaction = require('../models/Transaction');
const Purchase = require('../models/Purchase');

const verifyToken = require('./utils').verifyToken;

purchasesRouter.post('/', verifyToken, (req, res) => {

	// insert into purchase table, get the purchase ID
	// insert that into transactions table
	const purchases = req.body.items;
	const shipping = req.body.shipping;
	const payment = req.body.payment;

	const purchaseDate = new Date();

	console.log(purchases, shipping, payment);

	for (let i=0;i<purchases.length;i++) {
		const purchase = new Purchase({
			product_id: purchases[i].product_id,
			quantity: purchases[i].quantity
		});

		Purchase.createPurchase(purchase, function (err, purchaseId) {
			if (err || !purchaseId) {
				return res.status(500).json(err && err.sqlMessage || 'Unable to complete purchase.');
			}
			
			const transaction = new Transaction({
				customer_id: req.decoded.id,
				purchase_id: purchaseId,
				date_of_transaction: purchaseDate
			});

			Transaction.createTransaction(transaction, function (err, transactionId) {

				if (err || !transactionId) {
					return res.status(500).json(err && err.sqlMessage || 'Unable to complete purchase.');
				}

				// delete everything from cart where user ID matches
				return res.status(200).json(transactionId);
			});

		});
	}
	
});

purchasesRouter.get('/', verifyToken, (req, res) => {
	Purchase.getAll(req.decoded.id, function (err, response) {
		if (err) {
			return res.status(500).json(err);
		}
		return res.status(200).json(response);
	});
});

module.exports = purchasesRouter;