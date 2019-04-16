const express = require('express');
const categoriesRouter = express.Router();
const Category = require('../models/Category');

categoriesRouter.get('/', (req, res) => {
	Category.getAll(null, function (err, response) {
		if (err) {
			return res.send(err);
		}
		return res.send(response);
	});
});

module.exports = categoriesRouter;