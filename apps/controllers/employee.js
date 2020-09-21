'use strict'

const { isEmpty } = require('lodash')
const Puid = require('puid')
const { validationResult } = require('express-validator')
const fs = require('fs')
const Employee = require('../queries/employee')
const Files = require('../queries/files')
const path = require('path')

async function addEmployee (req, res, next) {
    let data = req.body
    let files = req.file

    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.send({ status_code: 400, message: "Not a valid input!", error: errors })

    console.log('body', { body: data, files })
    try {
        const checkPhone = await Employee.isExistsByPhone({ phone: data.phone })
        if (!isEmpty(checkPhone)) return res.send({ status_code: 400, message: "Phone already used." })

        if (files == undefined) return res.send({ status_code: 400, message: 'Please select file to upload.' })
        
        let uniqid
        uniqid = new Puid()

        let imageFile = {
            id: uniqid.generate(),
            type: req.file.mimetype,
            filename: req.file.originalname,
            data: req.protocol + "://" + req.hostname + ":" + process.env.PORT + "/" + req.file.path
        }
        console.log('imageFile', imageFile.data)
        const addImageFile = await Files.create(imageFile)
        console.log('addImageFile', addImageFile)

        let employee = {
            id: uniqid.generate(),
            firstname: data.firstname,
            lastname: data.lastname,
            phone: data.phone,
            address: data.address,
            files: imageFile.id
        }

        const addEmployee = await Employee.create(employee)
        console.log('addEmployee', addEmployee)

        return res.send({ status_code: 200, message: "Data has been successfully added." })

    } catch (error) {
        throw error
    }
}

async function editEmployee (req, res, next) {
    let data = req.body
    let files = req.file

    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.send({ status_code: 400, message: "Not a valid input!", error: errors })

    console.log('body', { body: data, files })
    try {
        const checkPhone = await Employee.isExistsByPhone({ phone: data.phone })
        if (!isEmpty(checkPhone)) return res.send({ status_code: 400, message: "Phone already used." })

        // if (files == undefined) return res.send({ status_code: 400, message: 'Please select file to upload.' })
        
        let uniqid
        uniqid = new Puid()

        let imageFile = {
            id: uniqid.generate(),
            type: req.file.mimetype,
            filename: req.file.originalname,
            data: req.file.path
        }
        console.log('imageFile', imageFile.data)
        const addImageFile = await Files.create(imageFile)
        console.log('addImageFile', addImageFile)

        const {
           id,
           firstname,
           lastname,
           phone,
           address, 
           files 
        } = req.body

        const addEmployee = await Employee.create(employee)
        console.log('addEmployee', addEmployee)

        return res.send({ status_code: 200, message: "Data has been successfully edited." })

    } catch (error) {
        throw error
    }
}

async function getAll (req, res, next) {
    let data = req.body
    console.log('[TheCleaning] getAll', data)
    try {
        let result = await Employee.findAll()
        console.log('result', result)

        return res.send({ status_code: 200, data: result[0] })
    } catch (error) {
        throw error
    }
}

module.exports = {
    addEmployee,
    editEmployee,
    getAll
}