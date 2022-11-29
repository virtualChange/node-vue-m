const mongoose = require('mongoose')
const Schema = new mongoose.Schema({
    item: {
        type: String,
    },
    icon: {
        type:String
    }
})
module.exports = mongoose.model('Item', Schema)
