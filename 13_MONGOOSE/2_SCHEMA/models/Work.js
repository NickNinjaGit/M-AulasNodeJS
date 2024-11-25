const mongoose = require('mongoose')
const { Schema } = mongoose

const Work = mongoose.model(
    'Work',
    new Schema({
        title: {type: String, required: true},
        description: {type: String, required: true},
        price: {type: Number, required: true},
        image: {type: String, required: true},
        timestamp: {type: Date, required: true},
    })
)

module.exports = Work