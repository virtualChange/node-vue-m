admin 后台管理页面
server 服务器
web 用户页面
[toc]
# 图片上传
- vue中使用element上传组件
```js
<el-upload
  class="avatar-uploader"
  action="https://jsonplaceholder.typicode.com/posts/"//图片上传地址
  :show-file-list="false"//是否显示已上传文件列表
  :on-success="handleAvatarSuccess"//文件上传成功时的钩子
  :before-upload="beforeAvatarUpload">//上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
  <img v-if="imageUrl" :src="imageUrl" class="avatar">//上传成功后，将返回的url地址赋值src
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
```
- 后端将图片保存到本地后返回图片地址


## 后台


需要使用的中间件
```js
const multer = require('@koa/multer');//上传文件
const upload = multer({ dest: __dirname + '/../../upload' });//将上传文件属性添加到ctx中
 //文件上传路径,返回上传的文件
router.post(
        '/admin/api/upload',//监控的上传地址
        upload.single('file'),//配置单一的文件类型,接收file格式文件类型
        ctx => {
            // console.log('ctx.request.file', ctx.request.file);
            // console.log('ctx.file', ctx.file);
            // console.log('ctx.request.body', ctx.request.body);
            ctx.file.url = `http://localhost:3000/upload/${ctx.file.filename}`
            ctx.body = ctx.file;
        }
    );
```

# 文章详情编辑

## 使用vue富文本包-- vue2-editor 

https://www.npmjs.com/package/vue2-editor


安装：npm install vue2-editor

导入：import { VueEditor } from "vue2-editor";


使用
```js
<template>
  <div id="app">
    <vue-editor
      id="editor"
      useCustomImageHandler
      @image-added="handleImageAdded"
      v-model="htmlForEditor"
    >
    </vue-editor>
  </div>
</template>
```
```
<script>
import { VueEditor } from "vue2-editor";
import axios from "axios";
export default {
  components: {
    VueEditor
  },

  data() {
    return {
      htmlForEditor: ""
    };
  },

  methods: {
    handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)

      var formData = new FormData();
      formData.append("image", file);//这里表单的字段名需要和后端定义的一致

      axios({
        url: "https://fakeapi.yoursite.com/images",
        method: "POST",
        data: formData
      })
        .then(result => {
          const url = result.data.url; // Get url from response
          Editor.insertEmbed(cursorLocation, "image", url);
          resetUploader();
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
```


electron-builder