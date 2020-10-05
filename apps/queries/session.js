'use strict'

const { isEmpty, reject, result } = require("lodash")

exports.createSession = ({ id, accessToken, refreshToken }) => 
    new Promise(async(resolve, reject) => {
        try {
            let response = await conn.query(`INSERT INTO tbl_userSession (id, accessToken, refreshToken) VALUES('${id}', '${accessToken}',
                    '${refreshToken}')`, (err, result) => {
                        if (err) throw err

                        console.log('result', result)
                        resolve(result)
                    })
            console.log('response', response)
        } catch (error) {
            throw error
        }
    })

exports.findBySessionId = ({ id }) => 
    new Promise(async(resolve, reject) => {
        try {
            let response = await conn.query(`SELECT * FROM tbl_userSession WHERE id='${id}'`, (err, result) => {
                        if (err) throw err

                        if (isEmpty(result)) resolve(result)
                        
                        Object.keys(result).forEach(function(key){
                            const row = result[key]
                            console.log('row', row)
                            resolve(row)
                        })
                    })
            console.log('response', response)
        } catch (error) {
            throw error
        }
    })


exports.updateBySessionId = ({ id, accessToken, refreshToken }) =>
    new Promise(async(resolve, reject) => {
        try {
            let response = await conn.query(`UPDATE tbl_userSession SET accessToken='${accessToken}', refreshToken='${refreshToken}'
                    WHERE id='${id}'`, (err, result) => {
                        if (err) reject(err)

                        console.log('result', result)
                        resolve(result)
                    })
            console.log('response', response)
        } catch (error) {
            throw error
        }
    })

exports.deleteBySessionId = ({ id }) => 
    new Promise(async (resolve, reject) => {
        try {
            let response = await conn.query(`DELETE FROM tbl_userSession WHERE id='${id}'`, (err, result) => {
                if (err) throw err

                console.log('result', result)
                resolve(result)
            })
            console.log('response', response)
        } catch (error) {
            throw error
        }
    }) 