module.exports = function(app, connection){
	// If no matching route is found default to index.html
	app.get('/', function(req, res) {
		res.send('Hello from simple-react project');
	});

	// handle user routes
	app.route('/users')
		.get((req, res) => {
			connection.query('SELECT * FROM `iotstore`.users', (err, data) => {
				err ? res.status(404).send(err) : res.json({ users: data });
			});
		});
}
