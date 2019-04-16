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

Product.getAll = function(options, result) {
	sql.query(`SELECT COUNT(*) as count FROM Products`, function (err, countRows) {
		
		if (err) {
			result(err, null);
			return;
		}

		if (!countRows || countRows.length < 1) {
			result('No rows were found.', null);
		}

		const count = countRows[0] && countRows[0].count;
		const priceSort = options.priceSort || 'ASC';


		sql.query(`SELECT * FROM Products ORDER BY price ${priceSort} LIMIT ${options.limit} OFFSET ${options.offset}`, function (err, productRows) {
			if (err) {
				console.log(err);
				result(err, null);
				return;
			}
			result(null, { products: productRows, count, limit: options.limit, offset: options.offset });
		});
	});
}

module.exports = Product;
