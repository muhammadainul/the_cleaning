'use strict'

const { isEmpty } = require('lodash')
const debug = require('debug')
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
const { toInt } = require('validator').default

async function editProfile (req, res, next) {
    let data = req.body
    let log = debug('the_cleaning:user:edifProfile')
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.send({ statusCode: 400, message: "Not a valid input!", error: errors })
    log('[TheCleaning] editProfile', data)
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

        log('user', user)
        const exists = await User.findById(id)
        if (isEmpty(exists)) return res.send({ statusCode: 404, message: 'User not found.' })
        if (exists.id !== user.id) return res.send({ statusCode: 400, message: 'Not your account.' }) 

        const updateCustomer = await User.updateById({ 
            id,
            firstname,
            lastname,
            phone,
            address,
            zipCode
        })
        log('updateCustomer', updateCustomer)

        const userLocalId = exists.userLocalId
        const encryptedPassword = bcrypt.hashSync(password, salt)
        const updateUserLocal = await User.updateUserLocal({ 
            userLocalId,
            username,
            email,
            encryptedPassword 
        })
        log('updateUserLocal', updateUserLocal)

        return res.send({ statusCode: 200, data: updateCustomer })
    } catch (error) {
        throw error
    }
}

async function getAllCustomer (req, res, next) {
    let log = debug('the_cleaning:user:getAllCustomer')
    let data = req.body
    log('[The_cleaning][user] getAllCustomer', data)
    try {
        const { start, length, draw } = req.body

        const offset = toInt(start)
        const numOfItems = toInt(length)
        
        const users = await User.getDataCustomer()
        if (isEmpty(users)) {
            return res.send({
                statusCode: 200,
                body: {
                    recordsFiltered: 0,
                    recordsTotal: 0,
                    data: [],
                    draw
                }

            })
        }

        const data = users
            .slice(offset, offset + numOfItems)
            .map(users => {
                const { id, ...userList } = users
                return {
                    id,
                    ...userList
                }
            })
        
        return res.send({ 
            statusCode: 200, 
            body: {
                recordsFiltered: data.length,
                recordsTotal: data.length,
                data: data,
                draw
            }
        })
    } catch (error) {
        throw error
    }
}

async function deleteCustomer (req, res, next) {
    let log = debug('the_cleaning:customer:deleteCustomer')
    let data = req.body
    log('[the_cleaning][customer] deleteCustomer', data)
    try {
        const id = data.id
        const exists = await User.findById(id)
        if (isEmpty(exists)) return res.send({ statusCode: 404, message: 'User not found.' })

        const deleteUserLocal = await User.deleteByUserlocalId({ userLocalId: exists.userLocalId })
        log('deleteUserLocal', deleteUserLocal)
        const deleted = await User.deleteById(id)
        if (deleted) {
            return res.send({ statusCode: 200, message: 'Customer has been successfully deleted.', body: deleted })
        } else {
            return res.send({ statusCode: 400, message: 'Failed to delete.' })
        }
    } catch (error) {
        throw error
    }
}

module.exports = {
    editProfile,
    getAllCustomer,
    deleteCustomer        
}