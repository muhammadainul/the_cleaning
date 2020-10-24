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
const Token = require('../queries/token')
const { myConfig } = require('../config/config')

async function register (req, res, next){
    let data = req.body

    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.send({ statusCode: 400, message: "Not a valid input!", error: errors })

    console.log('body', data)
    try {
        // CHECK IF USER ALREADY EXISTS
        let { username, email, phone } = req.body

        const checkUsername = await User.isExistsByUsername(username)
        if (!isEmpty(checkUsername)) return res.send({ statusCode: 400, message: "Username already used." })

        const checkEmail = await User.isExistsByEmail(email)
        if (!isEmpty(checkEmail)) return res.send({ statusCode: 400, message: "Email already used." })

        const checkPhone = await User.isExistsByPhone(phone)
        if (!isEmpty(checkPhone)) return res.send({ statusCode: 400, message: "Phone already used." })

        let uniqid
        uniqid = new Puid()

        let token = {
            id: uniqid.generate(),
            tokenCode: crypto.randomBytes(50).toString('hex')
        }

        let createTokenCode = await User.createTokenCode(token)
        console.log('createTokenCode', createTokenCode)

        let encryptedPassword = bcrypt.hashSync(data.password, salt)
        let userLocal = {
            id: uniqid.generate(),
            email: data.email,
            username: data.username,
            password: encryptedPassword,
            role: 'user',
            isVerified: 0,
            userTokenId: token.id
        }
        let createUserLocal = await User.addUserLocal(userLocal)
        console.log('userLocal', createUserLocal)

        let newCustomer = {
            id: uniqid.generate(),
            firstname: data.firstname,
            lastname: data.lastname,
            phone: data.phone,
            address: data.address,
            zipCode: data.zipCode,
            userLocalId: userLocal.id
        }

        let result = await User.register(newCustomer)
        console.log('result', result)

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            service: 'gmail',
            auth: {
                user: "ainulsaya@gmail.com",
                pass: "17005402"
            }
        })
        console.log('transporter', transporter)

        let mailOptions = {
            from: "no-reply@the_cleaning.com",
            to: userLocal.email,
            subject: "Account Verification Token",
            text: 
                "Hallo <b>" + userLocal.username + "</b>, \n\n" +
                "Please verify your account by click the link: \nhttp:\/\/" +
                req.headers.host + "\/user\/confirmation\/token\/" +
                token.tokenCode + "\n" +
                "If you don't register this, you can ignore this email. Thank you :)"
        }
        console.log('mailOptions', mailOptions)
        transporter.sendMail(mailOptions, function (err){
            if (err) return res.send({ statusCode: 500, error: err })

            const token = Token.createEvent()
            console.log('token', token)
            
            return res.send({ statusCode: 200, message: "Verification email has been send to " + userLocal.email + "." })
        })

        // return res.send({ statusCode: 200, message: 'Register account success!', data: createUserLocal })
    } catch (error) {
        return res.send({ statusCode: 400, message: 'Register failed! please try again.', error })
        // throw error
    }
}

async function confirmVerification (req, res, next) {
    let param = req.params
    console.log('[TheCleaning] params', { param })
    try {
        let tokenCode = param.tokencode
        console.log('tokenCode', tokenCode)
        let checkToken = await User.findToken({ tokenCode })
        console.log('checkToken', checkToken)
        if (isEmpty(checkToken)) return res.send({ statusCode: 400, message: 'We were unable to find a valid token. Your token might be expired.'})
        
        if (checkToken.isVerified) return res.send({ statusCode: 400, message: 'This user has been already verified.' })

        let userTokenId = checkToken.userTokenId    
        let isVerified = 1
        let result = await User.verifiedUser({ userTokenId, isVerified })
        console.log('result', result)

        return res.send({ statusCode: 200, message: 'Your account has been verified. Please login' })
    } catch (error) {
        throw error
    }
}

async function resendToken (req, res, next) {
    
}

async function login (req, res, next) {
    let data = req.body
    console.log('[TheCleaning] login', data)
    try {
        let { email, password } = req.body

        const userFound = await User.findByEmail(email)
        console.log('userfound', userFound)
        if (isEmpty(userFound)) return res.send({ statusCode: 400, message: "User not found! Please try again." })

        if (!userFound.isVerified) return res.send({ statusCode: 400, message: "Your account has not been verified." })

        let passwordValid = bcrypt.compare(password, userFound.password, function (err, result){
            if (err) throw err

            console.log('passwordValid', passwordValid)
            console.log('result', result)
            if (!result) return res.send({ statusCode: 400, message: "Invalid password! Please try again." })

            console.log('email', userFound.email)
            const createAccessToken = jwt.sign({ id: userFound.id, email: userFound.email }, myConfig.sessionSecret, { expiresIn: myConfig.expiredSessionTime })
            const createRefreshToken = jwt.sign({ id: userFound.id, email: userFound.email }, myConfig.refreshSessionSecret, { expiresIn: myConfig.expiredRefreshSessionTime })
            console.log('accessToken', createAccessToken)
            console.log('refreshAccessToken', createRefreshToken)

            let uniqid
            uniqid = new Puid()

            const makeSession = {
                id: uniqid.generate(),
                accessToken: createAccessToken,
                refreshToken: createRefreshToken
            }

            const existingSession = Session.findBySessionId(makeSession.id)
            console.log('existinSession', existingSession)
            if (isEmpty(existingSession)) {
                const newSession = Session.createSession(makeSession)
                console.log('newSession', newSession)
            } else {
                const newSession = Session.updateBySessionId(makeSession)
                console.log('updateSession', newSession)
            }

            let updateUser = {
                id: userFound.userLocalId,
                isLoggedIn: true,
                userSessionId: makeSession.id
            } 

            console.log('id', userFound.id)

            let updateUserLocal = User.updateUserLogin(updateUser)
            console.log('[TheCleaning] updateUserLocal', updateUserLocal)

            return res.send({
                statusCode: 200, 
                message: "Login Success.", 
                accessToken: createAccessToken,
                refreshToken: createRefreshToken,
                data: userFound 
            })
        })
    } catch (error) {
        throw (error)
    }
}

async function logout (req, res, next) {
    const { logout } = req.body
    const user = req.user
    console.log('logout', logout)
    try {
        const userAccount = await User.findByEmail(user.email)
        if (isEmpty(userAccount)) return res.send({ statusCode: 400, message: "User not found." })

        const foundSession = await Session.findBySessionId({ id: userAccount.userSessionId })
        if (isEmpty(foundSession)) return res.send({ statusCode: 400, message: "Session not found" })

        const deleteSession = await Session.deleteBySessionId({ id: foundSession.id })
        console.log('deleteSession', deleteSession)

        let toUpdate = {
            id: userAccount.userLocalId,
            isLoggedIn: false,
        }
        const isLoggedIn = await User.updateUser(toUpdate)
        console.log('isLoggedIn', isLoggedIn
        )
        req.logout()
        return res.send({ statusCode: 200, data: {
            logout: true
        }})
    } catch (error) {
        throw error;
    }
}

module.exports = {
    register,
    login,
    logout,
    confirmVerification
}