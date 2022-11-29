# 【全栈之巅】Node.js + Vue.js 全栈开发王者荣耀手机端官网和管理后台
> 本项目是 [Bilibili 全栈之巅](https://space.bilibili.com/341919508) 视频教程相关源码
> https://github.com/wxs77577/node-vue-moba
> 持续更新中... 敬请关注

## 一、 入门
1. 项目介绍
1. 工具安装和环境搭建(nodejs,npm,mongodb)
1. 初始化项目

## 二、 管理后台
1. 基于Element UI的后台管理基础界面搭建

1. 创建分类
1. 分类列表
1. 修改分类
1. 删除分类
1. 子分类

1. **通用 CRUD 接口**
> 通用crud中间件,根据路径不同获取不同的模型并保存到ctx中,方便下个中间件使用
> 需用使用inflection包（装换复数单词）
```js
  //
    router.use('/admin/api/rest/:path', async (ctx, next) => {
        const inflection = require('inflection')
        const moduleName = inflection.classify(ctx.params.path)
        const module = require(`../../modul/${moduleName}`)
        ctx.module = module
        ctx.moduleName = moduleName
        await next();
    }, router.routes())
````

2. 装备管理
3. 图片上传 (multer)
 > 后端：'@koa/multer' 包

```js
router.post(
     '/admin/api/upload',
     upload.single('file'),//配置单一的文件类型
     ctx => {
         // console.log('ctx.request.file', ctx.request.file);
         // console.log('ctx.file', ctx.file);
         // console.log('ctx.request.body', ctx.request.body);
         ctx.file.url = `http://localhost:3000/upload/${ctx.file.filename}`
         ctx.body = ctx.file;
     }
 );
```

2. 英雄管理
3. 编辑英雄 (关联,多选,el-select, multiple)
- 关联 : mongoose.types.objectId ,关联数据库ref:
- module.findOneById().populate()-->populate查询关联的数据
1. 技能编辑

2. 文章管理
3. 富文本编辑器 (quill)
```vue
 <el-form-item label="详情">
        <vue-editor
          id="editor"
          useCustomImageHandler
          @image-added="handleImageAdded"
          v-model="module.article"
        >
        </vue-editor>
      </el-form-item>
```

```js
   async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      var formData = new FormData();
      formData.append("file", file);
      const res = await this.$http.post("upload", formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    },
```
4. 首页广告管理

5. 管理员账号管理 (bcrypt)
> 加密：bcrypt.hashsync('密码',加密度（数字）)
> 加密对比： bcrypt.comparesync('密码'，‘被加密的密码’)
1.  登录页面
2.  登录接口 (jwt,jsonwebtoken)
> 它用于各方之间作为JSON对象安全地传输信息,主要以header方式传递
1.  服务端登录校验
   校验token，校验用户
   > koa.context.assert
2.  客户端路由限制 (beforeEach, meta)
3.  上传文件的登录校验 (el-upload, headers)

## 三、移动端网站

1. "工具样式"概念和 SASS (SCSS)
1. 样式重置
1. 网站色彩和字体定义 (colors, text)
1. 通用flex布局样式定义 (flex)
1. 常用边距定义 (margin, padding)
1. 主页框架和顶部菜单
1. 首页顶部轮播图片 (vue swiper)
1. 使用精灵图片 (sprite)
1. 使用字体图标 (iconfont)
1. 卡片组件 (card)
1. 列表卡片组件 (list-card, nav, swiper)
1. 首页新闻资讯-数据录入(+后台bug修复)
1. 首页新闻资讯-数据接口
1. 首页新闻资讯-界面展示
1. 首页英雄列表-提取官网数据
1. 首页英雄列表-录入数据
1. 首页英雄列表-界面展示
1. 新闻详情页
1. 新闻详情页-完善
1. 英雄详情页-1-前端准备
1. 英雄详情页-2-后台编辑
1. 英雄详情页-3-前端顶部
1. 英雄详情页-4-完善

## 四、发布和部署 (阿里云)

1. 生产环境编译
1. 购买域名和服务器
1. 域名解析
1. Nginx 安装和配置
1. MongoDB数据库的安装和配置
1. git 安装、配置ssh-key
1. Node.js 安装、配置淘宝镜像
1. 拉取代码，安装pm2并启动项目
1. 配置 Nginx 的反向代理
1. 迁移本地数据到服务器 (mongodump)

## 五、进阶
1. 使用免费SSL证书启用HTTPS安全连接
1. 使用阿里云OSS云存储存放上传文件
