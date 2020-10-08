'use strict'

const { result, reject, isEmpty } = require('lodash')
const _ = require('lodash')

exports.isExistsByName = ({ priceName }) =>
    new Promise(async (resolve, reject) => {
        try {
            let response = await conn.query(`SELECT * FROM tbl_priceList WHERE priceName='${priceName}'`, (err, result) => {
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

exports.findById = id =>
    new Promise(async (resolve, reject) => {
        try {
            let response = await conn.query(`SELECT * FROM tbl_priceList WHERE id='${id}'`, (err, result) => {
                if (err) throw err

                console.log(result)
                resolve(result)
            })
            console.log('response', response)
        } catch (error) {
            throw error
        }
    })

exports.create = ({ id, priceName, priceDesc, price, duration }) =>
    new Promise(async (resolve, reject) => {
        try {
            let response = await conn.query(`INSERT INTO tbl_priceList (id, priceName, priceDesc, price, duration) VALUES('${id}', '${priceName}', 
                '${priceDesc}', '${price}', '${duration}')`, (err, result) => {
                    if (err) throw err

                    console.log('result', result)
                    resolve(result)
                })
            console.log('response', response)
        } catch (error) {
            throw error
        }
    })

exports.updateById = ({ id, priceName, priceDesc, price, duration }) =>
    new Promise(async (resolve, reject) => {
        try {
            let response = await conn.query(`UPDATE tbl_priceList SET priceName='${priceName}', priceDesc='${priceDesc}', price='${price}', 
                duration='${duration}' WHERE id='${id}'`, (err, result) => {
                    if (err) throw err

                    console.log('result', result)
                    resolve(result)
                })
            console.log('response', response)
        } catch (error) {
            throw error
        }
    })

exports.deleteById = id =>
    new Promise(async (resolve, reject) => {
        try {
            let response = await conn.query(`DELETE FROM tbl_priceList WHERE id='${id}'`, (err, result) => {
                if (err) throw err

                console.log(result)
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
            let response = await conn.query(`SELECT id, priceName, priceDesc, price, duration, createdAt, updatedAt FROM tbl_priceList`, (err, result) => {
                if (err) throw err
                
                if (isEmpty(result)) resolve(result)
                
                Object.keys(result).forEach(function(key){
                    const row = result[key]
                    console.log('row', row)
                    resolve(result)
                })
                // console.log(result)
            })
            console.log('response', response)
        } catch (error) {
            throw error
        }
    })