'use strict'

const Puid = require('puid')
const { validationResult } = require('express-validator')
const User = require('../queries/user')
const PriceList = require('../queries/priceList')
const Orders = require('../queries/orders')
const Employee = require('../queries/employee')
const { isEmpty, toInteger, forEach } = require('lodash')
const moment = require('moment')

async function orderNow (req, res, next) {
    let data = req.body
    console.log('[TheCleaning] orderNow', data)
    try {
        const user = req.user
        let { 
            customerId,
            jobType,
            orderDate,
            orderTime,
            orderDuration,
            location,
            totalPrice,
            notes,
        } = req.body

        const id = customerId
        const exists = await User.findById({ id })
        if (isEmpty(exists)) return res.send({ statusCode: 404, message: 'User not found.' })
        if (exists.id !== user.id) return res.send({ statusCode: 400, message: 'Not your account.' })
        
        const priceListId = await PriceList.isExistsByName({ jobType })
        if (isEmpty(priceListId)) return res.send({ statusCode: 404, message: 'Price list not found.' })
        console.log('picelistid', priceListId.idPriceJob)

        let uniqid
        uniqid = new Puid()
    
        const orders = await Orders.create({
            id              : uniqid.generate(),
            customerId      : customerId,
            priceListId     : priceListId.priceListId,
            orderDate       : orderDate,
            orderTime       : orderTime,
            orderDuration   : orderDuration,
            location        : location,
            totalPrice      : totalPrice,
            orderStatus     : 'Pesanan diproses',
            notes           : notes
        })
        console.log('orders', orders)

        return res.send({ statusCode: 200, message: 'Successfully order.' })
    } catch (error) {
        throw error
    }
}

async function listOrderUser (req, res, next) {
    let data = req.body
    console.log('[TheCleaning] listOrderUser', data)
    try {
        const user = req.user
        const exists = await User.findById({ id: user.id })
        if (isEmpty(exists)) return res.send({ statusCode: 404, message: 'User not found.' })
        if (exists.id !== user.id) return res.send({ statusCode: 400, message: 'Not your account.' })

        const customerId = user.id
        const today = moment(Date.now()).format('YYYY-MM-DD')
        let result = await Orders.findByCustomerIdDate({ 
            customerId,
            today
        })

        console.log('result', result)
        return res.send({ statusCode: 200, data: result })
    } catch (error) {
        throw error
    }
}

async function orderDetailUser (req, res, next) {
    let data = req.body
    console.log('[TheCleaning] orderDetailUser', data)
    try {
        const user = req.user
        const exists = await User.findById({ id: user.id })
        if (isEmpty(exists)) return res.send({ statusCode: 404, message: 'User not found.' })
        if (exists.id !== user.id) return res.send({ statusCode: 400, message: 'Not your account.' })
        
        const { id } = req.body
        if (isEmpty(id)) return res.send({ statusCode: 400, message: 'Id order must be exists.' })

        const date = new Date()
        const result = await Orders.findById({ 
            id,
         })
        console.log('result', result)
        if (isEmpty(result)) return res.send({ statusCode: 404, message: 'Order not found.' })

        return res.send({ statusCode: 200, data: result })
    } catch (error) {
        throw error
    }
}

async function orderUpdateGetEmployee (req, res, next) {
    let data = req.body
    console.log('[TheCleaning] orderUpdateGetEmployee', data)
    try {
        const { id, employeeId } = req.body

        const orderId = await Orders.findById({ id })
        if (isEmpty(orderId)) return res.send({ statusCode: 404, message: 'Orders not found.' })

        const exists = await Employee.findById({ id: employeeId })
        if (isEmpty(exists)) return res.send({ statusCode: 404, message: 'Employee not found.' })

        const ordersUpdate = await Orders.updateById({ 
            id,
            employeeId,
            orderStatus: 'Mitra ditemukan'
         })
        console.log('ordersUpdate', ordersUpdate)

        return res.send({ statusCode: 200, message: 'Successfully get employee.', data: ordersUpdate.affectedRows })
    } catch (error) {
        throw error
    }
}

async function getAllOrders (req, res, next) {
    let data = req.body
    console.log('[TheCleaning] getAllOrders', data)
    try {
        const { start, length, draw } = req.body

        const offset = toInteger(start)
        const numOfItems = toInteger(length)

        const orders = await Orders.getAll()
        if (isEmpty(orders)) {
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

        const data = orders
            .slice(offset, offset + numOfItems)
            .map(orders => {
                const { id, ...ordersList } = orders
                return {
                    id,
                    ...ordersList
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

function today () {
    return moment(Date.now()).format()
}

module.exports = {
    orderNow,
    listOrderUser,
    orderDetailUser,
    orderUpdateGetEmployee,
    getAllOrders
}