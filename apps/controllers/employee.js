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
    if (!errors.isEmpty()) return res.send({ statusCode: 400, message: "Not a valid input.", error: errors })

    console.log('body', { body: data, files })
    try {
        const checkPhone = await Employee.isExistsByPhone({ phone: data.phone })
        if (!isEmpty(checkPhone)) return res.send({ statusCode: 400, message: "Phone already used." })

        if (files == undefined) return res.send({ statusCode: 400, message: 'Please select file to upload.' })
        
        let uniqid
        uniqid = new Puid()

        let employee = {
            id: uniqid.generate(),
            firstname: data.firstname,
            lastname: data.lastname,
            phone: data.phone,
            address: data.address,
        }
        const addEmployee = await Employee.create(employee)
        console.log('addEmployee', addEmployee)

        let imageFile = {
            id: uniqid.generate(),
            employeeId: employee.id,
            type: req.file.mimetype,
            filename: req.file.originalname,
            data: req.protocol + "://" + req.hostname + ":" + process.env.PORT + "/" + req.file.path
        }
        console.log('imageFile', imageFile.data)
        const addImageFile = await Files.create(imageFile)
        console.log('addImageFile', addImageFile)

        return res.send({ statusCode: 200, message: "Employee data has been successfully added." })

    } catch (error) {
        throw error
    }
}

async function editEmployee (req, res, next) {
    let data = req.body
    let files = req.file

    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.send({ statusCode: 400, message: "Not a valid input!", error: errors })

    console.log('body', { body: data, files })
    try {        
        let uniqid
        uniqid = new Puid()

        const {
           id,
           firstname,
           lastname,
           phone,
           address,  
        } = req.body

        const exists = await Employee.findById({ id })
        if (isEmpty(exists)) return res.send({ statusCode: 404, message: "Employee not found." })

        if (isEmpty(req.file)) {
            const edited = await Employee.updatedById({
                id,
                firstname,
                lastname, 
                phone,
                address,
            })
            console.log('edited', edited)
            return res.send({ statusCode: 200, message: "Data has been successfully edited." })
        } else {
            const employeeId = id
            const editedEmployee = await editFile({ 
            employeeId, 
            type: req.file.mimetype,
            filename: req.file.originalname,
            data: req.protocol + "://" + req.hostname + ":" + process.env.PORT + "/" + req.file.path
            })
            console.log('editedEmployee', editedEmployee)

            const edited = await Employee.updatedById({
                id,
                firstname,
                lastname, 
                phone,
                address,
            })

            console.log('edited', edited)
            return res.send({ statusCode: 200, message: "Employee data has been successfully edited." })
        }
    } catch (error) {
        throw error
    }
}

async function deleteEmployee (req, res, next) {
    let data = req.body
    console.log('[TheCleaning] deleteEmployee', data)
    try {
        const { id } = req.body

        const exists = await Employee.findById({ id })
        if (isEmpty(exists)) return res.send({ status_code: 404, message: "Employee not found." })

        const deleteFile = await Files.deleteByEmployeeId({ employeeId: id })
        console.log('deleteFile', deleteFile)

        const deleteEmployee = await Employee.deleteById({ id })
        console.log('delete', deleteEmployee)

        return res.send({ statusCode: 200, message: "Employee data has been successfully deleted.", deleted: true })
    } catch (error) {
        throw error
    }
}

async function getAllEmployee (req, res, next) {
    let data = req.body
    console.log('[TheCleaning] getAll', data)
    try {
        let result = await Employee.findAll()
        console.log('result', result)

        return res.send({ statusCode: 200, data: result[0] })
    } catch (error) {
        throw error
    }
}

function editFile ({ employeeId, type, filename, data }) {
    try {
        if (isEmpty(employeeId)) throw ({ statusCode: 400, message: 'employeeId required.' })
        const makeFile = Files.editByEmployeeId({ 
            employeeId,
            type,
            filename,
            data
        })
        console.log('makeFile', makeFile)
        throw ({ statusCode: 200, message: 'File edited.'})
    } catch (error) {
        throw error
    }
}

module.exports = {
    addEmployee,
    editEmployee,
    deleteEmployee,
    getAllEmployee
}