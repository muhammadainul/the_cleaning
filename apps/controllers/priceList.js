'use strict'

const { isEmpty } = require('lodash')
const { validationResult } = require('express-validator')
const Puid = require('puid')
const Price = require('../queries/priceList')

async function addPriceList (req, res, next) {
    let data = req.body

    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.send({ statusCode: 400, message: "Not a valid input.", error: errors })

    console.log('[TheCleaning] addPriceList', data)
    try {
        let { priceName, priceDesc, price, duration } = req.body

        const exists = await Price.isExistsByName(priceName)
        if (!isEmpty(exists)) return res.send({ statusCode: 400, message: "Price name already available."})

        let uniqid
        uniqid = new Puid()

        let result = await Price.create({
            id: uniqid.generate(),
            priceName,
            priceDesc, 
            price,
            duration
        })
        console.log('result', result)
        
        return res.send({ statusCode: 200, message: "Price list has been successfully added." })
    } catch (error) {
        throw error
    }
}

async function editPriceList (req, res, next) {
    let data = req.body

    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.send({ statusCode: 400, message: "Not a valid input.", error: errors })

    console.log('[TheCleaning] editPriceList', data)
    try {
        let { id, priceName, priceDesc, price, duration } = req.body

        const exists = await Price.findById(id)
        if (isEmpty(exists)) return res.send({ statusCode: 404, message: "Price list not found." })

        const edited = await Price.updateById({
            id,
            priceName,
            priceDesc, 
            price,
            duration
        })
        console.log('result', edited)
        
        return res.send({ statusCode: 200, message: "Price list has been successfully edited." })
    } catch (error) {
        throw error
    }
}

async function deletePriceList (req, res, next) {
    let { id } = req.body
    console.log('[TheCleaning] deletePriceList', id)
    try {
        const exists = await Price.findById(id)
        if (isEmpty(exists)) return res.send({ statusCode: 404, message: "Price list not found." })

        const deleted = await Price.deleteById(id)
        console.log('deleted', deleted)

        return res.send({ statusCode: 200, message: "Price list has been successfully deleted." })
    } catch (error) {
        throw error
    }
}

async function getAllPriceList (req, res, next) {
    let data = req.body
    console.log('[TheCleaning] getAllData', data)
    try {
        let result = await Price.findAll()
        console.log('result', result)

        return res.send({ statusCode: 200, data: result })
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