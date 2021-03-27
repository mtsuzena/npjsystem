const express = require("express");
const app = express();

app.use(express.json());
app.use('/', require('./server/routes/role.route.js'));
app.use('/', require('./server/routes/profile.route.js'));

app.use(function (error, req, res, next) {
	if (error.message === 'Role already exists') {
		return res.status(409).send(e.message);
	}
	if (error.message === 'Role not found') {
		return res.status(404).send(e.message);
	}
	if (error.message === 'Profile already exists') {
		return res.status(409).send(e.message);
	}
	if (error.message === 'Profile not found') {
		return res.status(404).send(e.message);
	}
	
	res.status(500).send(e.message);
});

// const db = require("./server/models");

// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });

app.listen(3000);

