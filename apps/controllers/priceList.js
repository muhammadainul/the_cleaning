'use strict'

const { isEmpty, toInteger, uniq } = require('lodash')
const { validationResult } = require('express-validator')
const debug = require('debug')
const Puid = require('puid')
const { toInt } = require('validator').default
const Price = require('../queries/priceList')
const Pricejob = require('../queries/priceJob')

async function addPriceList (req, res, next) {
    let data = req.body
    let log = debug('webadmin:pricelist:addpPriceList')
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.send({ statusCode: 400, message: "Not a valid input.", error: errors })

    log('[TheCleaning] addPriceList', data)
    try {
        let { priceName, jobType, price, unit } = req.body

        const exists = await Pricejob.isExistsByName(priceName)
        if (!isEmpty(exists)) return res.send({ statusCode: 400, message: "Price name already exists." })

        let uniqid
        uniqid = new Puid() 

        const created = await Pricejob.create({ 
            id: uniqid.generate(),
            jobType,
            price, 
            unit
        })
        log('created', created)
        
        return res.send({ statusCode: 200, message: "Price list has been successfully added.", body: created })
    } catch (error) {
        throw error
    }
}

async function editPriceList (req, res, next) {
    let data = req.body

    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.send({ statusCode: 400, message: "Not a valid input.", error: errors })

    log('[TheCleaning] editPriceList', data)
    try {
        const { id, jobType, price, unit } = req.body

        const exists = await Pricejob.findById(id)
        if (isEmpty(exists)) return res.send({ statusCode: 404, message: "Price list not found." })
        log('exists', exists)

        const edited = await Pricejob.updateById({ id, jobType, price, unit })
        log('result', edited)
        
        return res.send({ statusCode: 200, message: "Price list has been successfully edited.", body: edited })
    } catch (error) {
        throw error
    }
}

async function deletePriceList (req, res, next) {
    let { id } = req.body
    log('[TheCleaning] deletePriceList', id)
    try {
        const exists = await Pricejob.findById(id)
        if (isEmpty(exists)) return res.send({ statusCode: 404, message: "Price list not found." })

        const deleted = await Pricejob.deleteById(id)
        log('deleted', deleted)

        return res.send({ statusCode: 200, message: "Price list has been successfully deleted.", body: deleted })
    } catch (error) {
        throw error
    }
}

async function getPricelistById (req, res, next) {
    let log = debug('the_cleaning:pricelist:getPricelistById')
    let data = req.body
    log('[webadmin][pricelist] getPricelistById', data)
    try {
        const { id } = req.body

        const result = await Pricejob.findById(id)
        log('result', result)
        if (isEmpty(result)) return res.send({ status_code: 404, message: "Price list not found." })

        return res.send({ statusCode: 200, data: result })
    } catch (error) {
        throw error
    }
}

async function getAllPriceList (req, res, next) {
    let data = req.body
    let log = debug('the_cleaning:priceList:getAllPriceList')
    log('[TheCleaning][pricelist] getAllPriceList', data)
    try {
        const { start, length, draw } = req.body
        const offset = toInt(start)
        const numOfItems = toInt(length)

        const result = await Pricejob.findAll()
        log('result', result)
        if (isEmpty(result)) {
            return res.send({ 
                statusCode: 200,
                body: {
                    recordsFiltered: 0,
                    recordsTotal: 0,
                    data: [],
                    draw
                }
            })
        }

        const data = result
            .slice(offset, offset + numOfItems)
            .map(result => {
                const { id, ...priceList } = result
                return {
                    id,
                    ...priceList
                }
            })

        return res.send({ 
            statusCode: 200, 
            body: {
                recordsFiltered: data.length,
                recordsTotal: data.length,
                data: data,
                draw
            } 
        })
    } catch (error) {
        throw error
    }
}

module.exports = {
    addPriceList,
    editPriceList,
    deletePriceList,
    getPricelistById,
    getAllPriceList
}