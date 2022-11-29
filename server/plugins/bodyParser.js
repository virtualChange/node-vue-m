module.exports = app => {
    const bodyParser = require('koa-bodyparser')
    const parser = new bodyParser()
    app.use(parser)
}