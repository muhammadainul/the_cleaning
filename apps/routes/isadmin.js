'use strict'

const { isEmpty } = require('lodash')
const User = require('../queries/user')

const isAdmin = async (req, res, next) => {
    try {
        let { email } = req.user

        const isadmin = await User.findByEmail(email)
        if (isadmin[0].role !== 'admin') return res.send({ statusCode: 570, message: "Unauthorized access! Admin only." })

        next()
    } catch (error) {
        throw error
    }
}

module.exports = isAdmin