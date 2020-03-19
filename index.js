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
const url = process.env.MONGODB_URI || "mongodb+srv://Steve:wedding@ds161092.mlab.com:61092/heroku_995w3gh7"
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