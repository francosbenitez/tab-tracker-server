module.exports = (sequelize, Sequelize) => {
  const Song = sequelize.define('Song', {
    title: Sequelize.STRING,
    artist: Sequelize.STRING,
    genre: Sequelize.STRING,
    album: Sequelize.STRING,
    albumImageUrl: Sequelize.STRING,
    youtubeId: Sequelize.STRING,
    lyrics: Sequelize.TEXT,
    tab: Sequelize.TEXT
  })
  return Song
}