'use strict'

const { result, reject, isEmpty } = require('lodash')
const _ = require('lodash')
const { price } = require('../controllers/validation')

exports.isExistsByName = ({ jobType }) =>
    new Promise(async (resolve, reject) => {
        try {
            let response = await conn.query(`select tbl_pricelistjob.id, tbl_pricelistjob.jobType, tbl_pricelistjob.price, tbl_pricelistjob.unit, 
                tbl_pricelist.priceName, tbl_pricelist.id as priceListId, tbl_pricelist.idPriceJob from tbl_pricelistjob join tbl_pricelist on tbl_pricelistjob.id=tbl_pricelist.idPriceJob
                where jobType='${jobType}'`, (err, result) => {
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
            const query = `select distinct tbl_pricelist.priceName, tbl_pricelist.id, tbl_pricelistjob.id as idPriceList, tbl_priceList.createdAt, tbl_pricelist.updatedAt, tbl_pricelistjob.jobType, tbl_pricelistjob.price, tbl_pricelistjob.unit
                from tbl_pricelist join tbl_pricelistjob on tbl_pricelist.idPriceJob=tbl_pricelistjob.id where tbl_pricelist.id='${id}'`
            let response = await conn.query(query, (err, result) => {
                if (err) throw err

                if (isEmpty(result)) resolve(result)

                console.log('results', result[0])
                resolve(result[0])
            })
            console.log('response', response)
        } catch (error) {
            throw error
        }
    })

exports.create = ({ id, priceName, idPriceJob }) =>
    new Promise(async (resolve, reject) => {
        try {
            let response = await conn.query(`INSERT INTO tbl_priceList (id, priceName, idPriceJob) VALUES('${id}', '${priceName}', '${idPriceJob}')`, (err, result) => {
                    if (err) throw err

                    console.log('result', result)
                    resolve(result)
                })
            console.log('response', response)
        } catch (error) {
            throw error
        }
    })

exports.updateById = ({ id, jobType, price, unit }) =>
    new Promise(async (resolve, reject) => {
        try {
            let response = await conn.query(`update tbl_pricelistjob set jobType='${jobType}', price='${price}', unit='${unit}' where id='${id}'`, (err, result) => {
                    if (err) throw err

                    console.log('result', result)
                    resolve(result)
                })
            console.log('response', response)
        } catch (error) {
            throw error
        }
    })

exports.updateByIdPriceListJob = ({ id, priceName }) =>
    new Promise(async (resolve, reject) => {
        try {
            let response = await conn.query(`update tbl_pricelist set priceName='${priceName}' where idPriceJob='${id}'`, (err, result) => {
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

exports.deleteByIdPriceJob = ({ id }) =>
    new Promise(async(resolve, reject) => {
        try {
            const query = `delete from tbl_pricelistjob where id='${id}'`
            let response = await conn.query(query, (err, result) => {
                if (err) throw err
                
                console.log('results', result)
                resolve(result)
            })
        } catch (error) {
            throw error
        }
    })

exports.findAll = () =>
    new Promise(async (resolve, reject) => {
        try {
            const query = `select distinct tbl_pricelist.priceName, tbl_pricelist.id as idPriceList, tbl_priceList.createdAt, tbl_pricelistjob.jobType, tbl_pricelistjob.price, tbl_pricelistjob.unit from tbl_pricelist
                    join tbl_pricelistjob on tbl_pricelist.idPriceJob=tbl_pricelistjob.id`
            let response = await conn.query(query, (err, result) => {
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