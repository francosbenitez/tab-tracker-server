//const fs = require('fs')
//const path = require('path')
const Sequelize = require('sequelize')
const dbConfig = require('../config')
const db = {}

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

// fs
// .readdirSync(__dirname)
// .filter((file) =>
// file !== 'index.js'
// )
// .forEach((file) => {
// const model = sequelize.import(path.join(__dirname, file))
// db[model.name] = model
// })

// Object.keys(db).forEach(function (modelName) {
//   if ('associate' in db[modelName]) {
//     db[modelName].associate(db)
//   }
// })

db.sequelize = sequelize
db.Sequelize = Sequelize

db.user = require('./User')(sequelize, Sequelize);
db.song = require('./Songs')(sequelize, Sequelize);
db.bookmark = require('./Bookmark')(sequelize, Sequelize);
db.history = require('./History')(sequelize, Sequelize);

db.bookmark.belongsTo(db.user)
db.bookmark.belongsTo(db.song)

db.history.belongsTo(db.user)
db.history.belongsTo(db.song)

module.exports = db