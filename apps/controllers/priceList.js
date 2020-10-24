'use strict'

const { isEmpty, toInteger } = require('lodash')
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

        const exists = await Price.isExistsByName(priceName)
        if (!isEmpty(exists)) return res.send({ statusCode: 400, message: "Price name already available."})

        let uniqid
        uniqid = new Puid()

        const idPriceJob = uniqid.generate()
        const priceJobType = await Pricejob.create({ 
            id: idPriceJob,
            jobType,
            price, 
            unit
        })

        log('priceJobType', priceJobType.id)

        let result = await Price.create({
            id: uniqid.generate(),
            priceName,
            idPriceJob: idPriceJob
        })
        log('result', result)
        
        return res.send({ statusCode: 200, message: "Price list has been successfully added." })
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
        const { id, priceName, jobType, price, unit } = req.body

        const exists = await Price.findById(id)
        if (isEmpty(exists)) return res.send({ statusCode: 404, message: "Price list not found." })
        log('exists', exists)

        const edited = await Price.updateByIdPriceListJob({ id, priceName })
        const editedPriceJob = await Price.updateById({ id: exists.idPriceList, jobType, price, unit })
        log('editedPricejob', editedPriceJob)
        log('result', edited)
        
        return res.send({ statusCode: 200, message: "Price list has been successfully edited." })
    } catch (error) {
        throw error
    }
}

async function deletePriceList (req, res, next) {
    let { id } = req.body
    log('[TheCleaning] deletePriceList', id)
    try {
        const exists = await Price.findById(id)
        if (isEmpty(exists)) return res.send({ statusCode: 404, message: "Price list not found." })

        const deleted = await Price.deleteById(id)
        const deletedPriceJob = await Price.deleteByIdPriceJob({ id: exists.idPriceList })
        log('deleted', deleted)

        return res.send({ statusCode: 200, message: "Price list has been successfully deleted." })
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

        const result = await Price.findAll()
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
    getAllPriceList
}