'use strict'

const { isEmpty } = require('lodash')
// const uniqid = require('uniqid')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)
const Puid = require('puid')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const { validationResult } = require('express-validator')
const User = require('../queries/user')
const Session = require('../queries/session')
const { myConfig } = require('../config/config')

async function editProfile (req, res, next) {
    let data = req.body

    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.send({ status_code: 400, message: "Not a valid input!", error: errors })
    console.log('[TheCleaning] editProfile', data)
    try {
        const user = req.user
        let {
            id,
            firstname,
            lastname,
            phone,
            address,
            zipCode,
            username,
            email,
            password,
            repassword
        } = req.body

        console.log('user', user)
        const exists = await User.findById({ id })
        if (isEmpty(exists)) return res.send({ status_code: 404, message: 'User not found.' })
        if (exists[0].id !== user.id) return res.send({ status_code: 400, message: 'Not your account.' }) 

        const updateCustomer = await User.updateById({ 
            id,
            firstname,
            lastname,
            phone,
            address,
            zipCode
        })
        console.log('updateCustomer', updateCustomer)

        const userLocalId = exists[0].userLocalId
        const encryptedPassword = bcrypt.hashSync(password, salt)
        const updateUserLocal = await User.updateUserLocal({ 
            userLocalId,
            username,
            email,
            encryptedPassword 
        })
        console.log('updateUserLocal', updateUserLocal)

        return res.send({ status_code: 200, data: updateCustomer })
    } catch (error) {
        throw error
    }
}

async function getAllCustomer (req, res, next) {
    try {
        let result = await User.getDataCustomer()
        console.log('results', result)
        
        return res.send({ status_code: 200, data: result })
    } catch (error) {
        throw error
    }
}

module.exports = {
    editProfile,
    getAllCustomer        
}