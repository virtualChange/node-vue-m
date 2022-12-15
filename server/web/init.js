//前端api


//


module.exports = app => {
    const router = new require('koa-router')()//路由
    const heroesList = require('./heroes').slice(1) //除去热门
    const Category = require('../modul/Category')//导入分类模型 
    const Hero = require('../modul/Hero')//英雄模型

    //导出英雄列表
    router.get('/web/api/hero/title', async ctx => {
        //获取英雄分类
        const heroCategory = await Category.findOne({
            name: '英雄分类'
        })
        //找出英雄分类的子分类
        const cats = await  Category.aggregate([
            {$match: { parent: heroCategory._id }}
        ])
        cats.unshift({
            name:'热门'
        })
        ctx.body = cats
    })
    //导出英雄分类
    router.get('/web/api/hero/categories', async ctx => {
        //找到英雄分类
        const parent = await Category.findOne({
            name: '英雄分类'
        })
        //找英雄分类的子分类
        const cats = await Category.aggregate([//聚合管道,多个查询合并
            { $match: { parent: parent._id } },//第一个查询符,条件查询,parent字段=英雄分类的ID
            {//关联查询
                $lookup: {
                    from: 'heroes',//需要关联的数据库
                    localField: '_id',//本机字段 _id
                    foreignField: 'categories',//外界字段 
                    as: 'heroList'//重命名
                }

            },
            // {
            //     $addFields: {//查询出来以后添加一个字段
            //         heroesList: { $slice: ['$heroList',5] } //只需要5个,取5个
            //     }
            // }
        ])
        const subCats = cats.map(v => v._id)
        cats.unshift({
            name: '热门',
            heroList: await Hero.find().where({
                categories: { $in: subCats }
            }).populate('categories').limit(10).lean()
        })
        // console.log(cats[0],'111111111111')
        cats.map(cat => {
            if (!cat.newsList) {
                return
            }
            cat.newsList.map(news => {
                // console.log(news);
                news.categoryName = (cat.name === '热门') ? news.categories[0].name : cat.name
                return news
            })
            return cat
        })
        ctx.body = cats
    })
    router.get('/web/api/init', async (ctx) => {
        // 删除hero数据库
        // await hero.deleteMany({},(err)=>{ 
        //     if(err){
        //         console.log(err);
        //     }else {
        //         console.log('成功');
        //     }
        // })
        for (let data of heroesList) {
            //找到当前分类在数据库中对应的数据 
            const category = await Category.findOne({
                name: data.name
            })
            data.heroes.map(hero => {
                hero.categories = [category]
            })
            await hero.insertMany(data.heroes)
        }
        ctx.body = await hero.find()
    })
    app.use(router.routes());
    app.use(router.allowedMethods());
}