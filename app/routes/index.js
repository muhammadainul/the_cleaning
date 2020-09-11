'use strict'

const router = require('express').Router()

const user = require('../controllers/user')
const validate = require('../controllers/validation')

router.get('/', (req, res) => {
    res.send({ status: 200, message: "welcome to my API!" })
})
router.post('/user/register', [validate.register], user.register)
router.post('/user/getAll', user.getAllCustomer)
// router.post('/login', user.login)

module.exports = router