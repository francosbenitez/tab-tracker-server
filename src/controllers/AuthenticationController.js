//const { User } = require('../models')
const db = require('../models');
const User = db.user;
const jwt = require('jsonwebtoken')
const config = require('../config')
const bcrypt = require("bcrypt");

function jwtSignUser (user) {
    const ONE_WEEK = 60 * 60 * 24 * 7
    return jwt.sign(user, config.authentication.jwtSecret, {
      expiresIn: ONE_WEEK
    })
  }

module.exports = {
    async register (req, res) {
        try {
            req.body.password = bcrypt.hashSync(req.body.password, 10);
            const user = await User.create(req.body)
            //res.send(user.toJSON())
            const userJson = user.toJSON()
            res.send({
                user: userJson,
                token: jwtSignUser(userJson)
            })
        } catch (err) {
            res.status(400).send({
                error: "This email account is already in use."
            })
        }
        //res.send({
        //    message: `Hello ${req.body.email}! Your user was registered! Have fun!`
        //})
    },
    async login (req, res) {
        try {
            const {email, password} = req.body
            const user = await User.findOne({
                where: {
                    email: email
                }
            })
            if (!user) {
                return res.status(403).send({
                    error: 'The login information was incorrect 1'
                })
            }

            if (user) {
                console.log(password, user.password)
                const equals = bcrypt.compareSync(password, user.password);
                if (equals) {
                    const userJson = user.toJSON()
                    res.send({
                        user: userJson,
                        token: jwtSignUser(userJson)
                    })
                } else {
                    res.json({ error: "Error en usuario y/o contraseña 1" });
                }
            } else {
                res.json({ error: "Error en usuario y/o contraseña 2" });
            }
            // const isPasswordValid = await user.comparePassword(password)
            // console.log(password, isPasswordValid)
            // if (!isPasswordValid) {
            //     return res.status(403).send({
            //         error: 'The login information was incorrect 2'
            //     })
            // }
        } catch (err) {
            //console.log(err)
            res.status(500).send({
                error: "An error has ocurred trying to log in"
            })
        }
    }
}