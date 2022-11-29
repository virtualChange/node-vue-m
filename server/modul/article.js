const mongoose = require('mongoose')
const Schema = new mongoose.Schema({
    title: {
        type: String,
    },
    categories: [{
        type: mongoose.Types.ObjectId, ref: 'Category',
    }],
    article: {
        type: String
    }
})
module.exports = mongoose.model('article', Schema)
