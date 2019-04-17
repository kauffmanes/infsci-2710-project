const express = require('express');
const usersRouter = express.Router();
const User = require('../models/User');


usersRouter.post('/', (req, res) => {

	const newUser = new User(req.body);
	User.createUser(newUser, function (err, user) {
		if (err) {
			return res.status(404).json(err && err.sqlMessage || 'Unable to create user.');
		}
		return res.status(200).json(user);
	});
});

usersRouter.get('/id/:id', (req, res) => {

	const userId = req.params.id;
	
	User.getUserById(userId, function (err, response) {
		if (err) {
			return res.status(500).json(err);
		}
		return res.status(200).json(response);
	});
});

module.exports = usersRouter;