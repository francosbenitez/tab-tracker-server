module.exports = {
  PORT: process.env.PORT || 8081,
  // HOST: "tab-tracker-db.cfd0h5xpluom.us-east-2.rds.amazonaws.com",
  HOST: "localhost",
  // USER: "kc5VqM2c",
  USER: "root",
  // PASSWORD: "YqWpXT5v",
  PASSWORD: "",
  DB: "tab_tracker_db",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  }
}
