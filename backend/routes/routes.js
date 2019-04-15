module.exports = function(app, connection){

	// User resource
	app.route('/users')
		.get((req, res) => {
			connection.query('SELECT * FROM `iotstore`.Customer', (err, data) => {
				err ? res.status(404).send(err) : res.json({ users: data });
			});
		});

	// Product Resource
	app.route('./products').get((req, res) => {
		connection.query('SELECT * FROM `iotstore`.Products', (err, data) => {
			err ? res.status(404).send(err) : res.json({ users: data });
		});
	});

	// If no matching route is found default to index.html
	app.get('/', function(req, res) {
		res.send('Hello from simple-react project');
	});
}
