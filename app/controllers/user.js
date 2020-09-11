'use strict'

const { isEmpty } = require('lodash')
// const uniqid = require('uniqid')
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)
const Puid = require('puid')
const { validationResult } = require('express-validator')
const User = require('../queries/user')

async function register (req, res, next){
    let data = req.body

    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.send({ status_code: 400, message: "Not a valid input!", error: errors })

    console.log('body', data)
    try {
        // CHECK IF USER ALREADY EXISTS
        let { username, email, phone } = req.body

        const checkUsername = await User.isExistsByUsername(username)
        if (!isEmpty(checkUsername)) return res.send({ status_code: 400, message: "Username already used." })

        const checkEmail = await User.isExistsByEmail(email)
        if (!isEmpty(checkEmail)) return res.send({ status_code: 400, message: "Email already used." })

        const checkPhone = await User.isExistsByPhone(phone)
        if (!isEmpty(checkPhone)) return res.send({ status_code: 400, message: "Phone already used." })

        let uniqid
        uniqid = new Puid()
        let newCustomer = {
            id: uniqid.generate(),
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            phone: data.phone,
            address: data.address,
            zipCode: data.zipCode,
            userLocalId: uniqid.generate(),
        }

        let result = await User.register(newCustomer)
        console.log('result', result)
        
        let encryptedPassword = bcrypt.hashSync(data.password, salt)

        let userLocal = {
            id: newCustomer.userLocalId,
            username: data.username,
            password: encryptedPassword,
            role: 'user',
            isRegistered: true,
        }

        let createUserLocal = await User.addUserLocal(userLocal)
        console.log('userLocal', createUserLocal)

        return res.send({ status_code: 200, message: 'Register account success!', data: createUserLocal })
    } catch (error) {
        return res.send({ status_code: 400, message: 'Register failed! please try again.', error })
        // throw error
    }
}

async function login (req, res, next) {
    let { username, password } = req.body
    try {
        
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
    register,
    getAllCustomer        
}