const Guest = require('../models/guest')
const nodemailer = require('nodemailer')
const sendgrid = require('nodemailer-sendgrid-transport')
const { validationResult } = require('express-validator/check')

//SENDGRID API
const dotenv = require('dotenv')
dotenv.config()
const API_KEY = process.env.API_KEY
const transporter = nodemailer.createTransport(sendgrid({
    auth: {
        api_key: `${API_KEY}`
    }
})) 



exports.getAddGuest = (req, res, next) => {
    res.render('admin/add-guest', {
        pageTitle: 'Guest Portal',
        path: '/add-guest',
        errorMessage: null,
        validationErrors: []
    })
}

exports.postAddGuest = (req, res, next) => {

    const name = req.body.name
    const guests = req.body.guest
    const email = req.body.email
    const errors = validationResult(req)


    if (!errors.isEmpty()) {
        return res
        .status(422)
        .render('admin/add-guest', {
            pageTitle: 'Guest Portal',
            path: '/add-guest',
            errorMessage: errors.array()[0].msg,
            validationErrors: errors.array()
        }) 
    }
    const guest = new Guest({
        name: name,
        guests: guests,
        email: email,
  
    })
    guest
    .save()
    .then(result => {
        res.redirect('/success?guestName=' + result.name)
        return transporter.sendMail({
            to: email,
            from: 'wedding@invitation.com',
            subject: 'Wedding Invitation Details',
            html: `
                    <h1>Wedding Details</h1>
                    <p>Thank you for the RSVP ${name}. We look forward to seeing you there. Below are the details of the wedding venue and some further contact information</p>
                    <h2>Venue</h2>
                    <p>12 Main Street</p>
                    <p>City</p>
                    <p>12940</p>
                    <h2>Time & Date</h2>
                    <p>01/01 12:00</p>
                    <h2>Contact Details</h2>
                    <p>010-555-5555</p>
                    <br/>
                    <p>See you soon!</p>
                    <p>Mr Smith & Miss Brown</p>
                    `
        })
    }).catch(err => {
        console.log(err)
    })
    .catch(err => {
        console.log(err)
    })
}

exports.getIndex = (req, res, next) => {

    res.render('admin/index', {
        pageTitle: 'Home',
        path: '/'
    })
}

exports.getSuccessPage = (req, res, next) => {

     const guestId = req.query.guestName

    // guestId
    // .then(guest => {
        
    // })

    res.render('admin/success', {
        pageTitle: "Success",
        path: '/success',
        guestId: guestId
        
    })
}