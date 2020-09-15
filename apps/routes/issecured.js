'use strict'

const passport = require('passport')
const jwt = require('jsonwebtoken')
const { escapeRegExp } = require('lodash')

const isSecured = async (req, res, next) => {
    passport.authenticate('jwt', (err, user, info) => {
        console.log('err, user', { err, user, info })
        if (err) return res.send(err)
        if (!user) return res.send({ status_code: 570, message: "Unauthorized access.", error: err })
        req.logIn(user, { session: false }, err => {
            if (err) return res.send(err)
            
            next()
        })
    })(req, res, next)
}

module.exports = isSecured