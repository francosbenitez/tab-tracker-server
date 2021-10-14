const db = require('../models');
const Song = db.song;

module.exports = {
    async index (req, res) {
        try {
            const songs = await Song.findAll({
                limit: 10
            })
            res.send(songs)
        } catch (err) {
            res.status(500).send({
                error: 'An error has ocurred trying to get the songs'
            })
        }
    },

    async show (req, res) {
        try {
            const song = await Song.findByPk(req.params.songId)
            res.send(song)
        } catch (err) {
            console.log(err)
            res.status(500).send({
                error: 'An error has ocurred trying to show the song'
            })
        }
    },

    async post (req, res) {
        try {
            const song = await Song.create(req.body)
            res.send(song)
        } catch (err) {
            res.status(500).send({
                error: 'An error has ocurred trying to create the song'
            })
        }
    },

    async put (req, res) {
        try {
            await Song.update(req.body, {
                where: {
                    id: req.params.songId
                }
            })
            //res.send(song)
            res.send(req.body)
        } catch (err) {
            res.status(500).send({
                error: 'An error has ocurred trying to update the song'
            })
        }
    }
}