'use strict';

const sql = require('./db');

const User = function(user) {
	this.first_name = user.firstName;
	this.last_name = user.lastName;
	this.password = user.password;
	this.phone = user.phone;
	this.zipcode = user.zipcode;
	this.city = user.city;
	this.state_id = user.stateId;
	this.business_id = user.business_id;
	// this.created_at = new Date();
};

User.createUser = function createUser (newUser, result) {
	sql.query('INSERT INTO Customer SET ?', newUser, function (err, res) {
		if (err) {
			result(err, null);
		} else {
			result(null, res.insertId);
		}	
	});
}

module.exports = User;