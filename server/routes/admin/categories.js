//英雄分类，过滤分类
module.exports = app => {
    //路由
    const router = new require('koa-router')();//创建路由实例
    const HeroModule = require('../../modul/Category')//英雄模型
    const mongoose = require('mongoose')
    router.get('/admin/api/categories', async (ctx) => {
        const data = await HeroModule.find()
        const id = mongoose.Types.ObjectId//mongooseId 转换字符串
        const res = data.filter((item, index) => {
            return id(item.parent).toString() === "629b074b46dfe1acfb72a515"
        })
        ctx.body = res
    })
    app.use(router.routes());
    app.use(router.allowedMethods());
}