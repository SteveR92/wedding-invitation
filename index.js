const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

//ENV
const dotenv = require('dotenv')
dotenv.config()
const DB_KEY = process.env.DB_KEY
const DB_SECRET = process.env.DB_SECRET



const errorController = require('./controllers/error')
const app = express()
//set static folder

app.set('view engine', 'ejs')
app.set('views', 'views')

const adminRoutes = require('./routes/admin')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/images', express.static(path.join(__dirname, 'images')))

// Guests API routes
app.use(adminRoutes)
app.use(errorController.get404)

const mongoURL = `mongodb+srv://${DB_KEY}:${DB_SECRET}@cluster0-jwig0.mongodb.net/test?retryWrites=true&w=majority`
const herokuURL = `mongodb+srv://${DB_KEY}:${DB_SECRET}@ds161092.mlab.com:61092/heroku_995w3gh7`
// const PORT = process.env.PORT || 5000
const url = process.env.MONGODB_URI || mongoURL
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

mongoose
.connect(url)
.then(result => {
    console.log('Connected to Server')
    app.listen(process.env.PORT || 5000)
})
.catch(err => {
    console.log(err)
})