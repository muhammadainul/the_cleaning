'use strict'

const { isEmpty } = require('lodash')

exports.create = ({ id, employeeId, type, filename, data }) =>
    new Promise(async (resolve, reject) => {
        try {
            let response = await conn.query(`INSERT INTO tbl_files (id, employeeId, type, filename, data) VALUES
                ('${id}', '${employeeId}', '${type}', '${filename}', '${data}')`, (err, result) => {
                    if (err) throw err

                    console.log('result', result)
                    resolve(result)
                })
            console.log('response', response)
        } catch (error) {
            throw error
        }
    })

exports.editByEmployeeId = ({ employeeId, type, filename, data }) =>
    new Promise(async (resolve, reject) => {
        try {
            let response = await conn.query(`UPDATE tbl_files SET type='${type}', filename='${filename}', data='${data}' WHERE
                    employeeId='${employeeId}'`, (err, result) => {
                        if (err) throw err

                        console.log('result', result)
                        resolve(result)
                    })
        } catch (error) {
            throw error
        }
    })

exports.deleteByEmployeeId = ({ employeeId }) =>
    new Promise(async (resolve, reject) => {
        try {
            let response = await conn.query(`DELETE FROM tbl_files WHERE employeeId='${employeeId}'`, (err, result) => {
                        if (err) throw err

                        console.log('result', result)
                        resolve(result)
                    })
        } catch (error) {
            throw error
        }
    })
