const mongoose = require('mongoose')
const Schema = new mongoose.Schema({
    userName: {
        type: String,
    },
    passWord: {
        type: String,
        select: false,
        set(value) {
            return require('bcrypt').hashSync(value, 12)
        }
    }
})

module.exports = mongoose.model('user', Schema)