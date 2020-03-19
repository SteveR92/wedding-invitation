const mongoose = require('mongoose')

const Schema = mongoose.Schema

const guestSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    guests: {
        type: Number
    }
})

module.exports = mongoose.model('Guest', guestSchema)