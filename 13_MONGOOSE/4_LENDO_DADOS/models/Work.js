const mongoose = require('mongoose')
const { Schema } = mongoose

const Work = mongoose.model(
    'Work',
    new Schema({
        title: {type: String, required: true},
        description: {type: String, required: true},
        price: {type: mongoose.Decimal128, required: true},
        image: {type: String, required: true},
        timestamp: {type: String, required: true},
    })
)

module.exports = Work