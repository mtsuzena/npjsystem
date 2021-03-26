const database = require('../config/database');
const db = require("../models");
const Role = db.role;

db.sequelize.sync();

exports.getRoles = function () {
    return Role.findAll();
	// return database.query('select * from blog.post');
};

exports.saveRole = function (role) {
	return Role.create(role)
};

exports.deleteRole = function (idRole) {
	return Role.destroy({
        where: {
            id: idRole
        }
    })
};


// database
// const db = require("./server/models");
// const Role = db.role;

// const  = db.role;
// const Role = db.role;

// db.sequelize.sync();


// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });

// function initial() {
//   Role.create({
//     id: 1,
//     name: "user"
//   });
 
//   Role.create({
//     id: 2,
//     name: "moderator"
//   });
 
//   Role.create({
//     id: 3,
//     name: "admin"
//   });
// }