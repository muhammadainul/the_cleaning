'use strict'

const router = require('express').Router()

const index = require('../controllers/index')
const user = require('../controllers/user')
const employee = require('../controllers/employee')
const price = require('../controllers/priceList')
const upload = require('../controllers/upload')
const isAdmin = require('./isadmin')
const isSecured = require('./issecured')
const isVerified = require('./isverfied')
const validate = require('../controllers/validation')

// INDEX
router.post('/user/register', [validate.register], index.register)
router.get('/user/confirmation/token/:tokencode', index.confirmVerification)
router.post('/user/login', index.login)
router.post('/user/logout', [isSecured], [isVerified], index.logout)

// USER
router.post('/user/getAll', [isSecured], [isVerified], user.getAllCustomer)
router.post('/user/update', [isSecured], [isVerified], [validate.register], user.editProfile)

// EMPLOYEE
router.post('/admin/addEmployee', [isAdmin], upload.single('file'), employee.addEmployee)
router.post('/admin/editEmployee', [isAdmin], upload.single('file'), employee.editEmployee)
router.post('/admin/deleteEmployee', [isAdmin], employee.deleteEmployee)
router.post('/admin/getAllEmployee', [isAdmin], employee.getAllEmployee)

// PRICE LIST
router.post('/admin/addPriceList', [isSecured], [isVerified], [isAdmin], [validate.price], price.addPriceList)
router.post('/admin/editPriceList', [isSecured], [isVerified], [isAdmin], [validate.price], price.editPriceList)
router.post('/admin/deletePriceList', [[isSecured], [isVerified], isAdmin], price.deletePriceList)
router.post('/admin/getAllPriceList', [isSecured], [isVerified], [isAdmin], price.getAllPriceList)

module.exports = router