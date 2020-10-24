'use strict'

const { reject, isEmpty } = require("lodash")

exports.create = ({ id, customerId, priceListId, orderDate, orderTime, orderDuration, location, totalPrice, orderStatus, notes }) =>
    new Promise(async (resolve, reject) => {
        try {
            let response = await conn.query(`INSERT INTO tbl_orders(id, customerId, priceListId, orderDate, orderTime, orderDuration, location, totalPrice, orderStatus, 
                notes) VALUE('${id}', '${customerId}', '${priceListId}', '${orderDate}', '${orderTime}', '${orderDuration}', '${location}', '${totalPrice}', '${orderStatus}', 
                '${notes}')`, (err, result) => {
                    if (err) throw err

                    console.log('result', result)
                    resolve(result)
                })
        console.log('repsonse', response)
            
        } catch (error) {
            throw error
        }
    })

exports.findByCustomerIdDate = ({ customerId, today }) =>
    new Promise(async (resolve, reject) => {
        try {
            let response = await conn.query(`select tbl_orders.id, tbl_orders.orderDate, tbl_priceList.priceName, tbl_pricelistjob.jobType, tbl_orders.orderStatus from tbl_orders 
                inner join tbl_priceList on tbl_orders.priceListId=tbl_priceList.id inner join tbl_pricelistjob on tbl_pricelistjob.id=tbl_pricelist.idPriceJob
                where customerId='${customerId}' and orderDate='${today}'`, (err, result) => {
                if (err) throw err

                if (isEmpty(result)) resolve(result)

                Object.keys(result).forEach(function (key){
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

exports.findById = ({ id, date }) => 
    new Promise(async (resolve, reject) => {
        try {
            let response = await conn.query(`SELECT tbl_orders.id AS orderId, tbl_orders.orderDate, tbl_orders.orderDuration, tbl_orders.location, tbl_orders.totalPrice, 
            tbl_orders.notes, tbl_orders.orderStatus, concat(tbl_customer.firstname, ' ' , tbl_customer.lastname) AS customerName, tbl_customer.address, tbl_customer.phone, 
            tbl_userLocal.email, tbl_priceList.priceName, tbl_pricelistjob.jobType, tbl_pricelistjob.price, concat(tbl_employee.firstname, ' ', 
            tbl_employee.lastname) AS employeeName FROM tbl_orders LEFT JOIN tbl_customer ON tbl_orders.customerId=tbl_customer.id JOIN tbl_userLocal 
            ON tbl_customer.userLocalId=tbl_userLocal.id LEFT JOIN tbl_priceList ON tbl_orders.priceListId=tbl_priceList.id JOIN tbl_pricelistjob ON
            tbl_pricelistjob.id=tbl_pricelist.idPriceJob LEFT JOIN tbl_employee 
            ON tbl_orders.employeeId=tbl_employee.id WHERE tbl_orders.id='${id}'`, (err, result) => {
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

exports.updateById = ({ id, employeeId, orderStatus }) =>
    new Promise(async (resolve, reject) => {
        try {
            let response = await conn.query(`UPDATE tbl_orders SET employeeId='${employeeId}', orderStatus='${orderStatus}' WHERE id='${id}'`, 
                (err, result) => {
                    if (err) throw err

                    console.log('result', result)
                    resolve(result)
                })
            console.log('response', response)
        } catch (error) {
            throw error
        }
    })

exports.getAll = () => 
    new Promise(async (resolve, reject) => {
        try {
            let response = await conn.query(`SELECT tbl_orders.id AS orderId, tbl_orders.orderDate, tbl_orders.orderTime, tbl_orders.orderDuration, tbl_orders.location, tbl_orders.totalPrice, 
                tbl_orders.notes, tbl_orders.orderStatus, concat(tbl_customer.firstname, ' ' , tbl_customer.lastname) AS customerName, tbl_customer.address, tbl_customer.phone, 
                tbl_userLocal.email, tbl_priceList.priceName, tbl_pricelistjob.jobType, tbl_pricelistjob.price, concat(tbl_employee.firstname, ' ', 
                tbl_employee.lastname) AS employeeName FROM tbl_orders LEFT JOIN tbl_customer ON tbl_orders.customerId=tbl_customer.id JOIN tbl_userLocal 
                ON tbl_customer.userLocalId=tbl_userLocal.id LEFT JOIN tbl_priceList ON tbl_orders.priceListId=tbl_priceList.id JOIN tbl_pricelistjob ON
                tbl_pricelistjob.id=tbl_pricelist.idPriceJob LEFT JOIN tbl_employee 
                ON tbl_orders.employeeId=tbl_employee.id`, (err, result) => {
                    if (err) throw err

                    if (isEmpty(result)) resolve(result)

                    Object.keys(result).forEach(function(key){
                        const row = result[key]
                        console.log('results', row)
                        resolve(result)
                    })
                })
            console.log('response', response)
        } catch (error) {
            throw error
        }
    })