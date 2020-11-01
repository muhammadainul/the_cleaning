'use strict'

const { isEmpty } = require('lodash')
const debug = require('debug')

exports.isExistsByName = (menu) =>
    new Promise(async(resolve, reject) => {
        let log = debug('the_cleaning:menu:queries:isExistsByName')
        log('[the_cleaning][menu][QUery] isExistsByName', menu)
        try {
            const query = `select * from tbl_menu where menu='${menu}'`
            let response = await conn.query(query, (err, result) => {
                if (err) throw err

                log('results', result)
                if (isEmpty(result)) resolve(result)

                Object.keys(result).forEach(function(key) {
                    const row = result[key]
                    log('row', row)
                    resolve('results', result)
                })
            })
            log('response', response)
        } catch (error) {
            throw error
        }
    }) 

exports.create = ({ id, menu }) =>
    new Promise(async(resolve, reject) => {
        let log = debug('the_cleaning:menu:queries:create')
        log('[the_cleaning][menu][QUery] create', { id, menu })
        try {
            const query = `insert into tbl_menu (id, menu) values('${id}', '${menu}')`
            let response = await conn.query(query, (err, result) => {
                if (err) throw err

                log('results', result)
                resolve(result)
            })
            log('response', response)
        } catch (error) {
            throw error
        }
    }) 

exports.findById = (id) =>
    new Promise(async(resolve, reject) => {
        let log = debug('the_cleaning:menu:queries:findById')
        log('[the_cleaning][menu][QUery] findById', id)
        try {
            const query = `select * from tbl_menu where id='${id}'`
            let response = await conn.query(query, (err, result) => {
                if (err) throw err

                log('results', result)
                if (isEmpty(result)) resolve(result)

                Object.keys(result).forEach(function(key){
                    const row = result[key]
                    log('row', row)
                    resolve(row)
                })
            })
            log('response', response)
        } catch (error) {
            throw error
        }
    }) 

exports.updateById = ({ id, menu }) =>
    new Promise(async(resolve, reject) => {
        let log = debug('the_cleaning:menu:queries:updateById')
        log('[the_cleaning][menu][QUery] updateById', id)
        try {
            const query = `update tbl_menu set menu='${menu}' where id='${id}'`
            let response = await conn.query(query, (err, result) => {
                if (err) throw err

                log('results', result)
                resolve(result)
            })
            log('response', response)
        } catch (error) {
            throw error
        }
    }) 

exports.deleteById =  (id) =>
    new Promise(async(resolve, reject) => {
        let log = debug('the_cleaning:menu:queries:deleteById')
        log('[the_cleaning][menu][QUery] deleteById', id)
        try {
            const query = `delete from tbl_menu where id='${id}'`
            let response = await conn.query(query, (err, result) => {
                if (err) throw err

                log('results', result)
                resolve(result)
            })
            log('response', response)
        } catch (error) {
            throw error
        }
    }) 

exports.findAll = () =>
    new Promise(async(resolve, reject) => {
        let log = debug('the_cleaning:menu:queries:findAll')
        log('[the_cleaning][menu][QUery] findAll')
        try {
            const query = `select * from tbl_menu order by id`
            let response = await conn.query(query, (err, result) => {
                if (err) throw err

                log('results', result)
                if (isEmpty(result)) resolve(result)

                resolve(result)
            })
            log('response', response)
        } catch (error) {
            throw error
        }
    }) 