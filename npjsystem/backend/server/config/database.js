 db = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "art",
    DB: "npjsystem",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };

module.exports = db;