'use strict'

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
            let response = await conn.query(`SELECT * FROM tbl_customer WHERE email='${email}'`, (err, result) => {
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

exports.findByUsernameAndPassword = (username, password) =>
    new Promise(async (resolve, reject) => {
        try {
            let response = await conn.query(`SELECT * FROM tbl_userLocal WHERE username='${username}' AND password='${password}'`, (err, result) => {
                if (err) reject(err)

                // console.log('result', result)
                resolve(result)
            })
            // console.log('response', response)
        } catch (error) {
            reject(error)
        }
    })

exports.updateUserLogin = ({ id, isLoggedIn, userSessionId }) =>
    new Promise(async (resolve, reject) => {
        try {
            let response = await conn.query(`UPDATE tbl_userLocal SET isLoggedIn='${isLoggedIn}', userSessionId='${userSessionId}', lastActive=NOW() WHERE id='${id}'`, (err, result) => {
                if (err) throw (err)

                console.log('result', result)
                resolve(result)
            })
            console.log('response', response)
        } catch (error) {
            throw(error)
        }
    })
    
exports.register = ({ id, firstname, lastname, email, phone, address, zipCode, userLocalId }) => 
    new Promise(async (resolve, reject) => {
        try {
            let response = await conn.query(`INSERT INTO tbl_customer (id, firstname, lastname, email, phone, address, zipCode, userLocalId)
                    VALUES('${id}', '${firstname}', '${lastname}', '${email}', '${phone}', '${address}', '${zipCode}', '${userLocalId}')`,
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

exports.addUserLocal = ({ id, username, password, role, isRegistered }) =>
    new Promise(async (resolve, reject) => {
        try {
            let response = await conn.query(`INSERT INTO tbl_userLocal (id, username, password, role, isRegistered)
                    VALUES('${id}', '${username}', '${password}', '${role}', '${isRegistered}')`, (err, result) => {
                        if (err) reject(err)

                        console.log("result", result)
                        resolve(result)
                    })
            
        } catch (error){
            reject(error)
        }
    })

exports.getDataCustomer =  data => 
    new Promise(async (resolve, reject) => {
        try {
            let response = await conn.query(`SELECT tbl_customer.id, tbl_customer.firstname, tbl_customer.lastname,
                 tbl_customer.email, tbl_customer.phone, tbl_customer.address, tbl_customer.zipCode, tbl_userLocal.username,
                 tbl_userLocal.role, tbl_userLocal.isRegistered, tbl_userLocal.isLoggedIn, tbl_customer.createdAt, tbl_customer.updatedAt
                 FROM tbl_customer INNER JOIN tbl_userLocal
                 ON tbl_customer.userLocalId=tbl_userLocal.id`, (err, result) => {
                if (err) reject(err)

                console.log("customer", result)
                resolve(result)
            })
            console.log('query', response)
        } catch (error) {
            throw error
        }
    })