const config = require("../config/database.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,
    logging: false,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model")(sequelize, Sequelize);
db.profile = require("../models/profile.model")(sequelize, Sequelize);
db.role = require("../models/role.model")(sequelize, Sequelize);
db.customer = require("../models/customer.model")(sequelize, Sequelize);
db.consultation = require("../models/consultation.model")(sequelize, Sequelize);
db.processType = require("../models/processType.model")(sequelize, Sequelize);
db.processChecklist = require("../models/processChecklist.model")(sequelize, Sequelize);
db.process = require("../models/process.model")(sequelize, Sequelize);

// ##
// RELATIONSHIPS

// USER RELATIONSHIPS
db.user.belongsTo(db.profile);
db.user.hasMany(db.consultation);
db.user.hasMany(db.process);


// PROCESS_TYPE RELATIONSHIPS
db.processType.hasMany(db.process);


// CUSTOMER RELATIONSHIPS
db.customer.hasMany(db.consultation);
db.customer.hasMany(db.process);


// PROCESS RELATIONSHIPS
db.process.belongsTo(db.user);
db.process.belongsTo(db.processType);
db.process.belongsTo(db.customer);
db.process.hasMany(db.processChecklist);


// PROCESS CHECKLIST RELATIONSHIPS
db.processChecklist.belongsTo(db.process);


// CONSULTATION RELATIONSHIPS
db.consultation.belongsTo(db.user);
db.consultation.belongsTo(db.customer);


// PROFILE RELATIONSHIPS
db.profile.belongsToMany(db.role, {
    through: "profile_roles",
    foreignKey: "profileId",
    otherKey: "roleId"
});
db.profile.hasMany(db.user);


// ROLE RELATIONSHIPS
db.role.belongsToMany(db.profile, {
  through: "profile_roles",
  foreignKey: "roleId",
  otherKey: "profileId"
});



db.ROLES = ["user", "admin", "moderator"];

module.exports = db;