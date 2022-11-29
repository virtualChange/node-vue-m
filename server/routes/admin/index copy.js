const multer = require('@koa/multer');
const upload = multer({ dest: __dirname + '/../../upload' });//将上传文件属性添加到ctx中
const jwt = require('jsonwebtoken');
const user = require('../../modul/user')
// const assert = require('http-assert')

module.exports = app => {

    const router = new require('koa-router')();

    const login = new require('koa-router')(
        { prefix: '/admin/api' }
    );

    //异常捕获
    app.use(async (ctx, next) => {
        try {
            await next();
        } catch (err) {
            ctx.status = err.status || 500
            ctx.body = {
                message: err.message
            }
        }
    });

    //文件上传路径,返回上传的文件
    login.post(
        '/upload',
        upload.single('file'),//配置单一的文件类型
        ctx => {
            ctx.file.url = `http://localhost:3000/upload/${ctx.file.filename}`
            ctx.body = ctx.file;
        }
    )
    login.post('/login', async ctx => {
        const { userName, passWord } = ctx.request.body
        const adminModul = require('../../modul/user')
        const isUser = await adminModul.findOne({ userName: userName }).select('passWord')

        // if (!isUser) {
        //     ctx.response.status = 422
        //     return ctx.body = {
        //         message: '用户名或密码错误'
        //     }
        // }
        // assert(isUser, 422, '用户名或密码错误')
        ctx.assert(isUser, 422, '用户名或密码错误')
        // 1.获取用户
        // 2.验证密码
        const user = require('bcrypt').compareSync(passWord, isUser.passWord)
        ctx.assert(user, 422, '用户名或密码错误')

        // if (!user) {
        //     ctx.response.status = 422
        //     return ctx.body = {
        //         message: '用户名或密码错误'
        //     }
        // }

        // 3.返回token
        const token = jwt.sign({ id: isUser._id }, ctx.G.secret);
        ctx.body = {
            token
        }
    });

    //添加分类 
    router.post('/', async ctx => {
        const res = await ctx.module.create(ctx.request.body)
        ctx.body = res
    })
        //根据分类id获取分类名称
        .get('/:id', async ctx => {
            const res = await ctx.module.findById(ctx.params.id)
            ctx.body = res
        })
        //获取分类列表
        .get('/', async ctx => {
            let res
            const limit = ctx.request.query.limit || ''
            if (ctx.moduleName === 'Category') {
                res = await ctx.module.find().populate({
                    path: 'parent'
                }).limit(limit)
            } else {
                res = await ctx.module.find().limit(limit)
            }
            ctx.body = res
        })
        //修改
        .put('/:id', async ctx => {
            console.log(123);
            const res = await ctx.module.findByIdAndUpdate(ctx.params.id, ctx.request.body)
            ctx.body = res
        })
        //根据id删除分类
        .delete('/', async ctx => {
            const id = ctx.request.query.id || ''
            const res = await ctx.module.findByIdAndRemove(id)
            ctx.body = res
        })

        .use('/admin/api/rest/:path', async (ctx, next) => {
            const inflection = require('inflection')
            const moduleName = inflection.classify(ctx.params.path)
            if (ctx.params.path == 'user') {
                ctx.moduleName = 'user'
                ctx.module = user
            }
            else {
                const module = require(`../../modul/${moduleName}`)
                ctx.moduleName = moduleName
                ctx.module = module
            }
            //token校验
            ctx.assert(ctx.headers.authorization, 422, '无效的token')
            const token = ctx.headers.authorization.split(' ').pop()
            const id = jwt.verify(token, ctx.G.secret).id
            ctx.assert(id, 422, '请先登录')
            const use = await user.findById(id)
            ctx.assert(use, 422, '请先登录')
            await next();
        }, router.routes())
    //登陆

    //通用crud中间件,根据路径不同获取不同的模型并保存到ctx中,方便下个中间件使用




    app.use(router.routes());
    app.use(router.allowedMethods());

    app.use(login.routes());
    app.use(login.allowedMethods());


    app.use(upload.any())
}