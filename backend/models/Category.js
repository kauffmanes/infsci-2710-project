'use strict';

const sql = require('./db');

const Category = function(product) {
	this.name = product.name;
	this.created_at = new Date();
};

Category.getAll = function (options, result) {
	const query = `SELECT * FROM Category`;
	sql.query(query, function (err, rows) {
		if (err) {
			console.log(err);
			result(err, null);
			return;
		}
		result(null, rows);
	});
};

module.exports = Category;