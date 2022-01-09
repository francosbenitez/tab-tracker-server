const db = require('../models');
const History = db.history;
const Song = db.song;
const _ = require('lodash')

module.exports = {
    async index (req, res) {
      try {
        const { userId } = req.query
        const histories = await History.findAll({
          where: {
            UserId: userId
          },
          include: [
            {
              model: Song
            }
          ]
        })
        res.send(histories)
      } catch (err) {
        console.log(err)
        res.status(500).send({
          error: 'An error has ocurred trying to get the histories'
        })
      }
    },

    async post (req, res) {
      try {
        console.log(req.body)
        const {songId, userId} = req.body
        // const history = await History.findOne({
        //   where: {
        //     SongId: songId,
        //     UserId: userId
        //   }
        // })
        // if (history) {
        //   return res.status(400).send({
        //     error: 'You already have this set as a history'
        //   })
        // }
        const history = await History.create({
          SongId: songId,
          UserId: userId
        })
        res.send(history) // Send to the back the object created
      } catch (err) {
        console.log(err)
        res.status(500).send({
          error: 'An error has ocurred trying to create the history'
        })
      }
    }
}