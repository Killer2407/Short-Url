const mongoose = require('mongoose')
const shortId = require('shortid') //Library helps to generate short-id

//Creating schema for database
const shortUrlSchema = new mongoose.Schema({
    full: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required:true,
        default: shortId.generate
    }
})

module.exports = mongoose.model('ShortUrl', shortUrlSchema)