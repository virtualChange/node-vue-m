const mongoose = require('mongoose')
const Schema = new mongoose.Schema({
    name: {
        type: String,
    },
    parent: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'category'
    }
})
module.exports = mongoose.model('category', Schema,)
