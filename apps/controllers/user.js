'use strict'

const { isEmpty } = require('lodash')
// const uniqid = require('uniqid')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)
const Puid = require('puid')
const { validationResult } = require('express-validator')
const User = require('../queries/user')
const Session = require('../queries/session')
const { myConfig } = require('../config/config')

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
    let data = req.body
    console.log('[TheCleaning] login', data)
    try {
        // let { username, password } = req.body
        // const userFound = await User.findByUsernameAndPassword(username, password)
        // console.log('userfound', userFound)
        // if (isEmpty(userFound)) return res.send({ status_code: 400, message: "User not found! Please try again." })

        passport.authenticate("login", (err, user) => {
            if (err) return next(err)
            if (!user) return res.send({ status_code: 400, message: "User not found! Please try again." })
            req.logIn(user, err => {
                if (err) return next(err)
                
                const createAccessToken = jwt.sign({ id: user[0].id, password: user[0].password }, myConfig.sessionSecret, { expiresIn: myConfig.expiredSessionTime })
                const createRefreshToken = jwt.sign({ id: user[0].id, password: user[0].password }, myConfig.refreshSessionSecret, { expiresIn: myConfig.expiredRefreshSessionTime })
                console.log('accessToken', createAccessToken)
                console.log('refreshAccessToken', createRefreshToken)

                let uniqid
                uniqid = new Puid()

                let updateUser = {
                    id: user[0].id,
                    isLoggedIn: true,
                    userSessionId: uniqid.generate()
                } 

                console.log('id', user[0].id)
        
                let updateUserLocal = User.updateUserLogin(updateUser)
                console.log('[TheCleaning] updateUserLocal', updateUserLocal)

                const makeSession = {
                    id: updateUser.userSessionId,
                    accessToken: createAccessToken,
                    refreshToken: createRefreshToken
                }

                const existingSession = Session.findBySessionId(makeSession.id)
                console.log('existinSession', existingSession)
                if (isEmpty(existingSession)) {
                    const newSession = Session.updateBySessionId(makeSession)
                    console.log('updateSession', newSession)
                } else {
                    const newSession = Session.createSession(makeSession)
                    console.log('newSession', newSession)
                }

                return res.send({
                    status_code: 200, 
                    message: "Login Success.", 
                    accessToken: createAccessToken,
                    refreshToken: createRefreshToken,
                    data: user 
                })
            })
        })(req, res, next)
    } catch (error) {
        next(error)
    }
}

// async function logout (req, res, next) {
    
// }

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
    login,
    getAllCustomer        
}