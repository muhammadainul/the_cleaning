'use strict'

const { result } = require("lodash")

exports.createEvent = () =>
    new Promise(async (resolve, reject) => {
        try {
            let response = await conn.query(`CREATE EVENT expiredToken ON SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL 1 MINUTE DO 
                DELETE FROM tbl_userToken WHERE createdAt < DATE_SUB(NOW(), INTERVAL 1 MINUTE)`, (err, result) => {
                    if (err) throw err

                    console.log('result', result)
                    resolve(result)
                })
            console.log('response', response)
        } catch (error) {
            throw error
        }
    })

exports.deleteEvent = () => 
    new Promise(async (resolve, reject) => {
        try {
            let response = await conn.query(`DROP EVENT IF EXISTS expiredToken`, (err, result) => {
                    if (err) throw err

                    console.log('result', result)
                    resolve(result)
                })
            console.log('response', response)
        } catch (error) {
            throw error
        }
    })