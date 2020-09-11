'use strict'

const { body } = require('express-validator')

let validateEmail = [
    body("email")
        .exists()
        .withMessage("Email not provided")
        .normalizeEmail()
        .isEmail()
        .withMessage("Email not valid")
]

let validatePhone = [
    body("phone")
        .exists()
        .withMessage("Phone not provided.")
        .isNumeric()
        .withMessage("Phone is not numeric.")
        .isLength({ min: 12, max: 13 })
        .withMessage("Phone not valid.")
]

let validatePassword = field =>
    body(field)
        .exists()
        .withMessage("Password not provided.")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters.")
        .isAlphanumeric()
        .withMessage("Password must be Alphanumeric.")
        .custom((value, { req }) => {
            if(!validatePassword(value)) throw new Error("Password does not match requirements")
            if(value !== req.body.repassword) throw new Error("Password not match.")
            return true
        })

let validateUsername = [
    body("username")
        .exists()
        .trim()
        .escape()
        .isLength({ min: 5 })
        .withMessage("Name not provided")
]

exports.register = [validateUsername, validateEmail, validatePhone, validatePassword("password")]