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
.withMessage('Please enter a valid email.'),
adminController.postAddGuest)

router.get('/', adminController.getIndex)

router.get('/success', adminController.getSuccessPage)

module.exports = router