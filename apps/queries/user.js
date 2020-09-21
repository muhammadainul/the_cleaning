'use strict'

const { reject } = require('lodash')
const _ = require('lodash')

exports.isExistsByUsername = username =>
    new Promise(async (resolve, reject) => {
        try {
            let response = await conn.query(`SELECT * FROM tbl_userLocal WHERE username='${username}'`, (err, result) => {
                if (err) reject(err)
                console.log('err', err)
                console.log('results', result)
                resolve(result)
            })
            console.log('response', response)
        } catch (error){
            reject(error)
        }
    })

exports.isExistsByEmail = email =>
    new Promise(async (resolve, reject) => {
        try {
            let response = await conn.query(`SELECT * FROM tbl_userLocal WHERE email='${email}'`, (err, result) => {
                if (err) reject(err)

                console.log('results', result)
                resolve(result)
            })
            console.log('response', response)
        } catch (error) {
            reject(error)
        }
    })

exports.isExistsByPhone = phone =>
    new Promise(async (resolve, reject) => {
        try {
            let response = await conn.query(`SELECT * FROM tbl_customer WHERE phone='${phone}'`, (err, result) => {
                if (err) reject(err)

                console.log('results', result)
                resolve(result)
            })
            console.log('response', response)
        } catch (error) {
            reject(error)
        }
    })

exports.findByEmail = email  =>
    new Promise(async (resolve, reject) => {
        try {
            let response = await conn.query(`SELECT tbl_userLocal.email, tbl_userLocal.username, tbl_userLocal.password, tbl_userLocal.role,
                tbl_userLocal.isLoggedIn, tbl_userLocal.userSessionId, tbl_customer.firstname, tbl_customer.lastname, tbl_customer.phone, tbl_customer.address, 
                tbl_customer.zipCode, tbl_customer.userLocalId, tbl_userSession.accessToken, tbl_userSession.refreshToken FROM tbl_userLocal INNER JOIN tbl_customer
                ON tbl_customer.userLocalid=tbl_userLocal.id
                LEFT JOIN tbl_userSession ON tbl_userSession.id=tbl_userLocal.userSessionId AND tbl_userLocal.email='${email}'`, (err, result) => {
                if (err) throw err

                console.log('result', result)
                resolve(result)
            })
            console.log('response', response)
        } catch (error) {
            throw (error)
        }
    })

exports.findById = ({ id }) =>
    new Promise(async (resolve, reject) => {
        try {
            let response = await conn.query(`SELECT * FROM tbl_customer WHERE id='${id}'`, (err, result) => {
                if (err) throw err
                
                console.log('result', result)
                resolve(result)
            })
            console.log('response', response)
        } catch (error) {
            throw error
        }
    })
exports.updateById = ({ id, firstname, lastname, phone, address, zipCode }) =>
    new Promise(async (resolve, reject) => {
        try {
            let response = await conn.query(`UPDATE tbl_customer SET firstname='${firstname}', lastname='${lastname}', phone='${phone}', 
                    address='${address}', zipCode='${zipCode}' WHERE id='${id}'`, (err, result) => {
                        if (err) throw err

                        console.log('result', result)
                        resolve(result)
                    })
            console.log('response', response)
        } catch (error) {
            throw error
        }
    })

exports.updateUserLocal = ({  userLocalId, username, email, encryptedPassword }) =>
    new Promise(async (resolve, reject) => {
        try {
            let response = await conn.query(`UPDATE tbl_userLocal SET username='${username}', email='${email}', password='${encryptedPassword}'
                    WHERE id='${userLocalId}'`, (err, result) => {
                        if (err) throw err

                        console.log('result', result)
                        resolve(result)
                    })
            console.log('response', response)
        } catch (error) {
            throw error
        }
    })

exports.updateUser = ({ id, isLoggedIn }) =>
    new Promise(async (resolve, reject) => {
        try {
            let response = await conn.query(`UPDATE tbl_userLocal SET isLoggedIn='${isLoggedIn}', lastActive=NOW() WHERE id='${id}'`, (err, result) => {
                if (err) throw err

                console.log('result', result)
                resolve(result)
            })
            console.log('response', response)
        } catch (error) {
            throw(error)
        }
    })

exports.updateUserLogin = ({ id, isLoggedIn, userSessionId }) =>
    new Promise(async (resolve, reject) => {
        try {
            let response = await conn.query(`UPDATE tbl_userLocal SET isLoggedIn='${isLoggedIn}', userSessionId='${userSessionId}', lastActive=NOW() WHERE id='${id}'`, (err, result) => {
                if (err) throw err

                console.log('result', result)
                resolve(result)
            })
            console.log('response', response)
        } catch (error) {
            throw(error)
        }
    })
    
exports.register = ({ id, firstname, lastname, phone, address, zipCode, userLocalId }) => 
    new Promise(async (resolve, reject) => {
        try {
            let response = await conn.query(`INSERT INTO tbl_customer (id, firstname, lastname, phone, address, zipCode, userLocalId)
                    VALUES('${id}', '${firstname}', '${lastname}', '${phone}', '${address}', '${zipCode}', '${userLocalId}')`,
                    (err, result) => {
                        if (err) reject(err)
                        console.log('err', err)
                        console.log('results', result)
                        resolve(result)   
                    })
        } catch (error){
            reject(error)
        }
    })

exports.addUserLocal = ({ id, email, username, password, role, isVerified, userTokenId }) =>
    new Promise(async (resolve, reject) => {
        try {
            let response = await conn.query(`INSERT INTO tbl_userLocal (id, email, username, password, role, isVerified, userTokenId)
                    VALUES('${id}', '${email}', '${username}', '${password}', '${role}', '${isVerified}', '${userTokenId}')`, (err, result) => {
                        if (err) reject(err)

                        console.log("result", result)
                        resolve(result)
                    })
            
        } catch (error){
            reject(error)
        }
    })

exports.createTokenCode = ({ id, tokenCode }) => 
    new Promise(async (resolve, reject) => {
        try {
            let response = await conn.query(`INSERT INTO tbl_userToken (id, tokenCode) VALUES('${id}', '${tokenCode}')`, (err, result) => {
                if (err) throw err

                console.log('result', result)
                resolve(result)
            })
            console.log('response', response)
        } catch (error) {
            throw error
        }
    })

exports.findToken = ({ tokenCode }) => 
    new Promise(async (resolve, reject) => {
        try {
            let response = await conn.query(`SELECT * FROM tbl_userToken INNER JOIN tbl_userLocal ON tbl_userToken.id=tbl_userLocal.userTokenId AND tbl_userToken.tokenCode='${tokenCode}'`, 
                    (err, result) => {
                        if (err) throw err

                        console.log('result', result)
                        resolve(result)
                    })
            console.log('response', response)
        } catch (error) {
            throw error
        }
    })

exports.verifiedUser = ({ userTokenId, isVerified }) =>
    new Promise(async (resolve, reject) => {
        try {
            let response = await conn.query(`UPDATE tbl_userLocal SET isVerified='${isVerified}' WHERE userTokenId='${userTokenId}'`, 
                    (err, result) => {
                        if (err) throw err

                        console.log('result', result)
                        resolve(result)
                    })
            console.log('response', response)
        } catch (error) {
            throw error
        }
    })

exports.getDataCustomer =  data => 
    new Promise(async (resolve, reject) => {
        try {
            let response = await conn.query(`SELECT tbl_customer.id, tbl_customer.firstname, tbl_customer.lastname,
                 tbl_userLocal.email, tbl_customer.phone, tbl_customer.address, tbl_customer.zipCode, tbl_userLocal.username,
                 tbl_userLocal.role, tbl_userLocal.isVerified, tbl_userLocal.isLoggedIn, tbl_customer.createdAt, tbl_customer.updatedAt
                 FROM tbl_customer INNER JOIN tbl_userLocal
                 ON tbl_customer.userLocalId=tbl_userLocal.id`, (err, result) => {
                if (err) throw (err)

                console.log("customer", result)
                resolve(result)
            })
            console.log('query', response)
        } catch (error) {
            throw error
        }
    })