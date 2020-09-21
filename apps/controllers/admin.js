'use strict'

const { isEmpty } = require('lodash')
const Puid = require('puid')
const { validationResult } = require('express-validator')
const Admin = require('../queries/admin')

async function addEmployee (req, res, next) {
    let data = req.body

    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.send({ status_code: 400, message: "Not a valid input!", error: errors })

    console.log('body', { data })
    try {
        // const checkPhone = await 
    } catch (error) {
        throw error
    }
}