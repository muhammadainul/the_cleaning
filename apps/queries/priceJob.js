'use strict'

const { isEmpty } = require('lodash')
const debug = require('debug')

exports.create = ({ id, jobType, price, unit }) =>
    new Promise(async(resolve, reject) => {
        let log = debug('the_cleaning:pricelist:queries:create')
        log('[the_cleaning]pricelist][Query] create', { id, jobType, price, unit })
        try {
            const query = `insert into tbl_pricelistjob (id, jobType, price, unit) values ('${id}', '${jobType}', '${price}', '${unit}')`
            let response = await conn.query(query, (err, result) => {
                if (err) throw err

                console.log('results', result) 
                Object.keys(result).forEach(function(key){
                    const row = result[key]
                    console.log('row', row)
                    resolve(result)
                })
            }) 
            console.log('response', response)
        } catch (error) {
            throw error
        }
    })

exports.isExistsByName = ({ jobType }) =>
    new Promise(async (resolve, reject) => {
        let log = debug('the_cleaning:pricelist:queries:isExistsByName')
        log('[the_cleaning]pricelist][Query] isExistsByName', jobType)
        try {
            let response = await conn.query(`select tbl_pricelistjob.id, tbl_pricelistjob.jobType, tbl_pricelistjob.price, tbl_pricelistjob.unit, 
                from tbl_pricelistjob where jobType='${jobType}'`, (err, result) => {
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
        let log = debug('the_cleaning:pricelist:queries:findById')
        log('[the_cleaning]pricelist][Query] findById', id)
        try {   
            const query = `select tbl_pricelistjob.id, tbl_pricelistjob.jobType, tbl_pricelistjob.price, tbl_pricelistjob.unit,
                tbl_pricelistjob.createdAt, tbl_pricelistjob.updatedAt from tbl_pricelistjob where tbl_pricelistjob.id='${id}'`
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

exports.updateById = ({ id, jobType, price, unit }) =>
    new Promise(async (resolve, reject) => {
        let log = debug('the_cleaning:pricelist:queries:updateById')
        log('[the_cleaning]pricelist][Query] updateById', { id, jobType, price, unit })
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

exports.deleteById = id =>
    new Promise(async (resolve, reject) => {
        let log = debug('the_cleaning:pricelist:queries:deleteById')
        log('[the_cleaning]pricelist][Query] deleteById', id)
        try {
            let response = await conn.query(`delete from tbl_priceListJob where id='${id}'`, (err, result) => {
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
        let log = debug('the_cleaning:pricelist:queries:findAll')
        log('[the_cleaning]pricelist][Query] findAll')
        try {
            const query = `select tbl_pricelistjob.id, tbl_pricelistjob.jobType, tbl_pricelistjob.price, tbl_pricelistjob.unit, tbl_pricelistjob.createdAt,
                tbl_pricelistjob.updatedAt from tbl_pricelistjob`
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