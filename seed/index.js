const db = require('../src/models');
//const sequelize = db.sequelize
const User = db.user;
const Song = db.song;
const Bookmark = db.bookmark;
const History = db.history;

const Promise = require('bluebird')
const songs = require('./songs.json')
const users = require('./users.json')
const bookmark = require('./bookmark.json')
const history = require('./history.json')

db.sequelize.sync({ force: true })
  .then(async function () {
    await Promise.all(
      users.map(user => {
        User.create(user)
      })
    )

    await Promise.all(
      songs.map(song => {
        Song.create(song)
      })
    )

    await Promise.all(
      bookmark.map(bookmark => {
        Bookmark.create(bookmark)
      })
    )

    await Promise.all(
      history.map(history => {
        History.create(history)
      })
    )
  })
