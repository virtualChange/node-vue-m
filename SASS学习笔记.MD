# SASS学习笔记

# 在Vue中使用SASS

## 安装
- 需要安装sass和sass-loader 2个包
```js
 npm i sass sass-loader --save-dev
```

## 使用
- 后缀名 —> sass书写的css文件需要使用.scss结尾
- 引入外部文件 — @import（_variable不需要使用_下划线开头就可以引入）


### 变量

 以$开头: $color:yellow
- 在需要使用变量值得地方直接书写变量，将自动替换为正式的值
- 获取对象变量的值： map-get($color:'prop')