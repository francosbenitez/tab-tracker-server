const db = require('../models');
const Bookmark = db.bookmark;

module.exports = {
    async index (req, res) {
        try {
            const { songId, userId } = req.query
            const bookmark = await Bookmark.findOne({
                where: {
                    SongId: songId,
                    UserId: userId
                }
            })
            res.send(bookmark)
        } catch (err) {
            console.log(err)
            res.status(500).send({
                error: 'An error has ocurred trying to get the bookmarks'
            })
        }
    },

    async post (req, res) {
        try {
            console.log(req.body)
            const {songId, userId} = req.body
            const bookmark = await Bookmark.findOne({
                where: {
                    SongId: songId,
                    UserId: userId
                }
            })
            if (bookmark) {
                return res.status(400).send({
                    error: 'You already have this set as a bookmark'
                })
            }
            const newBookmark = await Bookmark.create({
                SongId: songId,
                UserId: userId
            })
            res.send(newBookmark)
        } catch (err) {
            console.log(err)
            res.status(500).send({
                error: 'An error has ocurred trying to create the bookmark'
            })
        }
    },

    async delete (req, res) {
        try {
            const {bookmarkId} = req.params
            const bookmark = await Bookmark.findByPk(bookmarkId)
            console.log(bookmark)
            await bookmark.destroy()
            res.send(bookmark)
        } catch (err) {
            console.log(err)
            res.status(500).send({
                error: 'An error has ocurred trying to delete the bookmark'
            })
        }
    }
}