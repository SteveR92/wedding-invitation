const path = require('path')
const { check } = require('express-validator/check')
const Guest = require('../models/guest')

const express = require('express')

const adminController = require('../controllers/admin')

const router = express.Router()

router.get('/add-guest', adminController.getAddGuest)

router.post('/add-guest', 
check('email')
.isEmail()
.withMessage('Please enter a valid email.')
.custom((value, {req}) => {
    return Guest.findOne({ email: value })
    .then(res => {
        if (res) {
            return Promise.reject(
                'Have you already signed up? Your email already exists.'
                )
        }
    })
    .catch(err => {
        console.log(err)
    })
}), 
adminController.postAddGuest)

router.get('/', adminController.getIndex)

router.get('/success', adminController.getSuccessPage)

module.exports = router