module.exports = app => {
    const cors = require('koa2-cors')
    app.use(new cors())
}