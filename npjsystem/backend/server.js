const express = require("express");
const app = express();

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.use(express.json());
app.use('/api/', require('./server/routes/role.route'));
app.use('/api/', require('./server/routes/profile.route'));
app.use('/api/', require('./server/routes/user.route'));
app.use('/api/', require('./server/routes/authentication.route'));
app.use('/api/', require('./server/routes/privateRouteTest.route'));
app.use('/api/', require('./server/routes/customer.route'));
app.use('/api/', require('./server/routes/consultation.route'));

app.use(function (error, req, res, next) {
	if (error.message === 'Role already exists') {
		return res.status(409).send(error.message);
	}
	if (error.message === 'Role not found') {
		return res.status(404).send(error.message);
	}
	if (error.message === 'Customer not found') {
		return res.status(404).send(error.message);
	}
	if (error.message === 'Profile already exists') {
		return res.status(409).send(error.message);
	}
	if (error.message === 'Profile not found') {
		return res.status(404).send(error.message);
	}
	if (error.message === 'Email already exists') {
		return res.status(409).send(error.message);
	}
	if (error.message === 'User not found') {
		return res.status(404).send(error.message);
	}
	if (error.message === 'Email or password is wrong') {
		return res.status(400).send(error.message);
	}
	if (error.message === 'Email or password is wrong') {
		return res.status(400).send(error.message);
	}
	if (error.message === 'Email invalid') {
		return res.status(400).send(error.message);
	}
	if (error.message === 'Access Denied') {
		return res.status(401).send(error.message);
	}
	if (error.message === 'Consultation shall have a User') {
		return res.status(400).send(error.message);
	}
	if (error.message === 'Consultation shall have a Customer') {
		return res.status(400).send(error.message);
	}
	if (error.message === 'Consultation shall have a Date') {
		return res.status(400).send(error.message);
	}
	if (error.message === 'Consultation not found') {
		return res.status(404).send(error.message);
	}
	
	res.status(500).send(error.message);
});

const db = require("./server/models");

db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Database with { force: true }');
  initial();
});

app.listen(3000, () => console.log('Server up and running'));

