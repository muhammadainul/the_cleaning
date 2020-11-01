'use strict'

const { isEmpty, reject } = require('lodash')
const debug = require('debug')

exports.isExistsByUsername = username =>
    new Promise(async (resolve, reject) => {
        let log = debug('the_cleaning:user:queries:isExistsByUsername')
        log('[The_cleaning][user] isExistsByUsername', username)
        try {
            let response = await conn.query(`SELECT * FROM tbl_userLocal WHERE username='${username}'`, (err, result) => {
                if (err) reject(err)

                log('results', result)
                resolve(result)
            })
            log('response', response)
        } catch (error){
            throw error
        }
    })

exports.isExistsByEmail = email =>
    new Promise(async (resolve, reject) => {
        let log = debug('the_cleaning:user:queries:isExistsByEmail')
        log('[The_cleaning][user] isExistsByEmail', email)
        try {
            let response = await conn.query(`SELECT * FROM tbl_userLocal WHERE email='${email}'`, (err, result) => {
                if (err) reject(err)

                log('results', result)
                resolve(result)
            })
            log('response', response)
        } catch (error) {
           throw error
        }
    })

exports.isExistsByPhone = phone =>
    new Promise(async (resolve, reject) => {
        let log = debug('the_cleaning:user:queries:isExistsByPhone')
        log('[The_cleaning][user] isExistsByPhone', phone)
        try {
            let response = await conn.query(`SELECT * FROM tbl_customer WHERE phone='${phone}'`, (err, result) => {
                if (err) reject(err)

                log('results', result)
                resolve(result)
            })
            log('response', response)
        } catch (error) {
           throw error
        }
    })

exports.findByEmail = (email, password)  =>
    new Promise(async (resolve, reject) => {
        let log = debug('the_cleaning:user:queries:findByEmail')
        log('[The_cleaning][user] findByEmail', { email, password })
        try {
            let response = await conn.query(`SELECT tbl_userLocal.email, tbl_userLocal.username, tbl_userLocal.password, tbl_userLocal.role,
                tbl_userLocal.isVerified, tbl_userLocal.isLoggedIn, tbl_userLocal.userSessionId, tbl_customer.id, tbl_customer.firstname, tbl_customer.lastname, tbl_customer.phone, tbl_customer.address, 
                tbl_customer.zipCode, tbl_customer.userLocalId, tbl_userSession.accessToken, tbl_userSession.refreshToken FROM tbl_userLocal INNER JOIN tbl_customer
                ON tbl_customer.userLocalid=tbl_userLocal.id
                LEFT JOIN tbl_userSession ON tbl_userSession.id=tbl_userLocal.userSessionId WHERE tbl_userLocal.email='${email}'`, (err, result) => {
                if (err) throw err
                
                if (isEmpty(result)) resolve(result)

                Object.keys(result).forEach(function(key){
                    const row = result[key]
                    log('row', row)
                    resolve(row)
                })
            })
            log('response', response)
        } catch (error) {
            throw (error)
        }
    })

exports.findById = (id) =>
    new Promise(async (resolve, reject) => {
        let log = debug('the_cleaning:user:queries:findById')
        log('[The_cleaning][user] findById', id)
        try {
            let response = await conn.query(`SELECT * FROM tbl_customer WHERE id='${id}'`, (err, result) => {
                if (err) throw err
                
                if (isEmpty(result)) resolve(result)

                Object.keys(result).forEach(function(key){
                    const row = result[key]
                    log('row', row)
                    resolve(row)
                })
            })
            log('response', response)
        } catch (error) {
            throw error
        }
    })

exports.updateById = ({ id, firstname, lastname, phone, address, zipCode }) =>
    new Promise(async (resolve, reject) => {
        let log = debug('the_cleaning:user:queries:updateById')
        log('[The_cleaning][user] updateById', { id, firstname, lastname, phone, address, zipCode })
        try {
            let response = await conn.query(`UPDATE tbl_customer SET firstname='${firstname}', lastname='${lastname}', phone='${phone}', 
                    address='${address}', zipCode='${zipCode}' WHERE id='${id}'`, (err, result) => {
                        if (err) throw err

                        log('result', result)
                        resolve(result)
                    })
            log('response', response)
        } catch (error) {
            throw error
        }
    })

exports.deleteById = (id) =>
    new Promise(async(resolve, reject) => {
        let log = debug('the_cleaning:user:queries:deleteById')
        log('[The_cleaning][user] deleteByid', id)
        try {
            let response = await conn.query(`DELETE FROM tbl_customer WHERE id='${id}'`, (err, result) => {
                if (err) throw err

                log('results', result)
                resolve(result)
            })
            log('response', response)
        } catch (error) {
            throw error
        }
    })

exports.deleteByUserlocalId = ({ userLocalId }) =>
    new Promise(async(resolve, rejct) => {
        let log = debug('the_cleaning:user:queries:deleteByUserlocalId')
        log('[The_cleaning][user][Query] deletByUserlocalid', userLocalId)
        try {
            let response = await conn.query(`DELETE FROM tbl_userlocal WHERE id='${userLocalId}'`, (err, result) => {
                if (err) throw err

                log('results', result)
                resolve(result)
            })
        } catch (error) {
            throw error
        }
    })

exports.updateUserLocal = ({  userLocalId, username, email, encryptedPassword }) =>
    new Promise(async (resolve, reject) => {
        let log = debug('the_cleaning:user:queries:updateUserLocal')
        log('[The_cleaning][user] updateUserLocal', { userLocalId, username, email, encryptedPassword })
        try {
            let response = await conn.query(`UPDATE tbl_userLocal SET username='${username}', email='${email}', password='${encryptedPassword}'
                    WHERE id='${userLocalId}'`, (err, result) => {
                        if (err) throw err

                        log('result', result)
                        resolve(result)
                    })
            log('response', response)
        } catch (error) {
            throw error
        }
    })

exports.updateUser = ({ id, isLoggedIn }) =>
    new Promise(async (resolve, reject) => {
        let log = debug('the_cleaning:user:queries:updateUser')
        log('[The_cleaning][user] updateUser', { id, isLoggedIn })
        try {
            let response = await conn.query(`UPDATE tbl_userLocal SET isLoggedIn='${isLoggedIn}', lastActive=NOW() WHERE id='${id}'`, (err, result) => {
                if (err) throw err

                log('result', result)
                resolve(result)
            })
            log('response', response)
        } catch (error) {
            throw(error)
        }
    })

exports.updateUserLogin = ({ id, isLoggedIn, userSessionId }) =>
    new Promise(async (resolve, reject) => {
        let log = debug('the_cleaning:user:queries:updateUserLogin')
        log('[The_cleaning][user] updateUserLogin', { id, isLoggedIn, userSessionId })
        try {
            let response = await conn.query(`UPDATE tbl_userLocal SET isLoggedIn='${isLoggedIn}', userSessionId='${userSessionId}', lastActive=NOW() WHERE id='${id}'`, (err, result) => {
                if (err) throw err

                log('result', result)
                resolve(result)
            })
            log('response', response)
        } catch (error) {
            throw(error)
        }
    })
    
exports.register = ({ id, firstname, lastname, phone, address, zipCode, userLocalId }) => 
    new Promise(async (resolve, reject) => {
        let log = debug('the_cleaning:user:queries:register')
        log('[The_cleaning][user] register', { id, firstname, lastname, phone, address, zipCode, userLocalId })
        try {
            let response = await conn.query(`INSERT INTO tbl_customer (id, firstname, lastname, phone, address, zipCode, userLocalId)
                    VALUES('${id}', '${firstname}', '${lastname}', '${phone}', '${address}', '${zipCode}', '${userLocalId}')`,
                    (err, result) => {
                        if (err) reject(err)
                        log('err', err)
                        log('results', result)
                        resolve(result)   
                    })
        } catch (error){
            reject(error)
        }
    })

exports.addUserLocal = ({ id, email, username, password, role, isVerified, userTokenId }) =>
    new Promise(async (resolve, reject) => {
        let log = debug('the_cleaning:user:queries:addUserLocal')
        log('[The_cleaning][user] addUserLocal', { id, email, username, password, role, isVerified, userTokenId  })
        try {
            let response = await conn.query(`INSERT INTO tbl_userLocal (id, email, username, password, role, isVerified, userTokenId)
                    VALUES('${id}', '${email}', '${username}', '${password}', '${role}', '${isVerified}', '${userTokenId}')`, (err, result) => {
                        if (err) reject(err)

                        log("result", result)
                        resolve(result)
                    })
            
        } catch (error){
            reject(error)
        }
    })

exports.createTokenCode = ({ id, tokenCode }) => 
    new Promise(async (resolve, reject) => {
        let log = debug('the_cleaning:user:queries:createTokenCode')
        log('[The_cleaning][user] createTokenCode', { id, tokenCode })
        try {
            let response = await conn.query(`INSERT INTO tbl_userToken (id, tokenCode) VALUES('${id}', '${tokenCode}')`, (err, result) => {
                if (err) throw err

                log('result', result)
                resolve(result)
            })
            log('response', response)
        } catch (error) {
            throw error
        }
    })

exports.findToken = ({ tokenCode }) => 
    new Promise(async (resolve, reject) => {
        let log = debug('the_cleaning:user:queries:findToken')
        log('[The_cleaning][user] findToken', tokenCode)
        try {
            let response = await conn.query(`SELECT * FROM tbl_userToken INNER JOIN tbl_userLocal ON tbl_userToken.id=tbl_userLocal.userTokenId WHERE tbl_userToken.tokenCode='${tokenCode}'`, 
                    (err, result) => {
                        if (err) throw err

                        if (isEmpty(result)) resolve(result)
                        
                        Object.keys(result).forEach(function(key){
                            const row = result[key]
                            log('row', row)
                            resolve(row)
                        })
                    })
            log('response', response)
        } catch (error) {
            throw error
        }
    })

exports.verifiedUser = ({ userTokenId, isVerified }) =>
    new Promise(async (resolve, reject) => {
        let log = debug('the_cleaning:user:queries:verifiedUser')
        log('[The_cleaning][user] verifiedUser', { userTokenId, isVerified })
        try {
            let response = await conn.query(`UPDATE tbl_userLocal SET isVerified='${isVerified}' WHERE userTokenId='${userTokenId}'`, 
                    (err, result) => {
                        if (err) throw err

                        log('result', result)
                        resolve(result)
                    })
            log('response', response)
        } catch (error) {
            throw error
        }
    })

exports.getDataCustomer =  data => 
    new Promise(async (resolve, reject) => {
        let log = debug('the_cleaning:user:queries:getDataCustomer')
        log('[The_cleaning][user] getDataCustomer', data)
        try {
            let response = await conn.query(`SELECT tbl_customer.id, tbl_customer.firstname, tbl_customer.lastname,
                 tbl_userLocal.email, tbl_customer.phone, tbl_customer.address, tbl_customer.zipCode, tbl_userLocal.username,
                 tbl_userLocal.role, tbl_userLocal.isVerified, tbl_userLocal.isLoggedIn, tbl_customer.createdAt, tbl_customer.updatedAt
                 FROM tbl_customer INNER JOIN tbl_userLocal
                 ON tbl_customer.userLocalId=tbl_userLocal.id`, (err, result) => {
                if (err) throw (err)

                log("customer", result)
                resolve(result)
            })
            log('query', response)
        } catch (error) {
            throw error
        }
    })