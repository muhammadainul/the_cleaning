'use strict'

const { isEmpty, reject, result } = require('lodash')

exports.isExistsByPhone = ({ phone }) =>
    new Promise(async (resolve, reject) => {
        try {
            let response = await conn.query(`SELECT * FROM tbl_employee WHERE phone='${phone}'`, (err, result) => {
                if (err) throw err

                console.log('results', result)
                resolve(result)
            })
            console.log('response', response)
        } catch (error) {
            throw error
        }
    })

exports.create = ({ id, firstname, lastname, phone, address }) =>
    new Promise(async (resolve, reject) => {
        try {
            let response = await conn.query(`INSERT INTO tbl_employee (id, firstname, lastname, phone, address) VALUES
                ('${id}', '${firstname}', '${lastname}', '${phone}', '${address}')`, (err, result) => {
                    if (err) throw err

                    console.log('result', result)
                    resolve(result)
                })
            console.log('response', response)
        } catch (error) {
            throw error
        }
    })

exports.findById = ({ id }) =>
    new Promise(async (resolve, reject) => {
        try {
            let response = await conn.query(`SELECT * FROM tbl_employee WHERE id='${id}'`, (err, result) => {
                if (err) throw err

                console.log('results', result)
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

exports.findAll = () =>
    new Promise(async (resolve, reject) => {
        try {
            let response = await conn.query(`SELECT tbl_employee.id, tbl_employee.firstname, tbl_employee.lastname, tbl_employee.phone, tbl_employee.address, 
                    tbl_employee.createdAt, tbl_employee.updatedAt, tbl_files.data FROM tbl_employee LEFT JOIN tbl_files 
                    ON tbl_files.employeeId=tbl_employee.id`, (err, result) => {
                        if (err) throw err

                        console.log('result', result)
                        resolve(result)
                    })
            console.log('response', response)
        } catch (error) {
            throw error
        }
    }) 

exports.updatedById = ({ id, firstname, lastname, phone, address }) => 
    new Promise(async (resolve, reject) => {
        try {
            let response = await conn.query(`UPDATE tbl_employee SET firstname='${firstname}', lastname='${lastname}', phone='${phone}', address='${address}'
                    WhERE id='${id}'`, (err, result) => {
                        if (err) throw err

                        console.log('result', result)
                        resolve(result)
                    })
            console.log('response', response)
        } catch (error) {
            throw error
        }
    })

exports.deleteById = ({ id }) =>
    new Promise(async (resolve, reject) => {
        try {
            let response = await conn.query(`DELETE FROM tbl_employee WHERE id='${id}'`, (err, result) => {
                if (err) throw err

                console.log('result', result)
                resolve(result)
            })
            console.log('response', response)
        } catch (error) {
            throw error
        }
    })