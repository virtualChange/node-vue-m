const Koa = require('koa')
const app = new Koa();
const static = require('koa-static')


app.context.G = {
    secret: 'efaf4ae56%36g5a*U*()'
}

require('./plugins/cors')(app)//支持跨域
require('./plugins/bodyParser')(app)//中间件获取post请求参数
require('./routes/admin/index.js')(app)//路由
require('./routes/admin/categories.js')(app)//路由
require('./db')//连接数据库
const path = require('path')
app.use(static(path.join(__dirname), {

}))//koa静态文件托管

app.listen(3000, () => {
    console.log('http://localhost:3000');
})