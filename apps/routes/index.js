'use strict'

const router = require('express').Router()

const user = require('../controllers/user')
const employee = require('../controllers/employee')
const upload = require('../controllers/upload')
const isSecured = require('./issecured')
const isVerified = require('./isverfied')
const validate = require('../controllers/validation')

router.get('/public/uploads/image/Screenshot from 2020-09-15 15-08-25.png', (req, res) => {
    res.sendFile(__basedir + "/public/uploads/image/Screenshot from 2020-09-15 15-08-25.png")
})
router.post('/user/register', [validate.register], user.register)
router.get('/user/confirmation/token/:tokencode', user.confirmVerification)
router.post('/user/login', user.login)
router.post('/user/logout', [isSecured], [isVerified], user.logout)
router.post('/user/getAll', [isSecured], [isVerified], user.getAllCustomer)
router.post('/user/update', [isSecured], [isVerified], [validate.register], user.editProfile)

// EMPLOYEE
router.post('/admin/addEmployee', upload.single('file'), employee.addEmployee)
router.post('/admin/getAllEmployee', employee.getAll)

module.exports = router