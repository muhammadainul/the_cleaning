'use strict'

const { isEmpty } = require('lodash')

exports.create = ({ id, type, filename, data }) =>
    new Promise(async (resolve, reject) => {
        try {
            let response = await conn.query(`INSERT INTO tbl_files (id, type, filename, data) VALUES
                ('${id}', '${type}', '${filename}', '${data}')`, (err, result) => {
                    if (err) throw err

                    console.log('result', result)
                    resolve(result)
                })
            console.log('response', response)
        } catch (error) {
            throw error
        }
    })