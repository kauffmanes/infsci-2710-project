const path = require('path');
const mysql = require('mysql');

module.exports = function (app, connection) {
	app.get('/', (req, res) => {
		connection.query('SELECT * FROM `iotstore`.user', (err, data) => {
			if (err) return res.status(500).send(err);
			return res.status(200).json({ users: data });
		});
	})
}