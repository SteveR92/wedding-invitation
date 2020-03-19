const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const errorController = require('./controllers/error');


const app = express()
//set static folder

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));

// Guests API routes
app.use(adminRoutes)
app.use(errorController.get404);

// const PORT = process.env.PORT || 5000

// app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
mongoose
.connect('mongodb+srv://Steve:wedding@cluster0-jwig0.mongodb.net/test')
.then(result => {
    console.log('Connected to Server')
    app.listen(5000)
})
.catch(err => {
    console.log(err)
})