'use strict'

const { isEmpty } = require('lodash')

exports.isExistsByPhone = ({ phone }) =>
    new Promise(async (resolve, reject) => {
        try {
            let response = await conn.query(`SELECT * FROM tbl_employee WHERE phone='${phone}'`, (err, result) => {
                if (err) reject(err)

                console.log('results', result)
                resolve(result)
            })
            console.log('response', response)
        } catch (error) {
            reject(error)
        }
    })

exports.create = ({ id, firstname, lastname, phone, address, files }) =>
    new Promise(async (resolve, reject) => {
        try {
            let response = await conn.query(`INSERT INTO tbl_employee (id, firstname, lastname, phone, address, files) VALUES
                ('${id}', '${firstname}', '${lastname}', '${phone}', '${address}', '${files}')`, (err, result) => {
                    if (err) throw err

                    console.log('result', result)
                    resolve(result)
                })
            console.log('response', response)
        } catch (error) {
            throw error
        }
    })

exports.findAll = () =>
    new Promise(async (resolve, reject) => {
        try {
            let response = await conn.query(`SELECT tbl_employee.id, tbl_employee.firstname, tbl_employee.lastname, tbl_employee.phone, tbl_employee.address, 
                    tbl_employee.createdAt, tbl_employee.updatedAt, tbl_files.data FROM tbl_employee INNER JOIN tbl_files 
                    ON tbl_employee.files=tbl_files.id`, (err, result) => {
                        if (err) throw err

                        console.log('result', result)
                        resolve(result)
                    })
            console.log('response', response)
        } catch (error) {
            throw error
        }
    }) 