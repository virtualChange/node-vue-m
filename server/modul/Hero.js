const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },//英雄名
  avatar: { type: String },//头像
  banner: { type: String },//图片
  title: { type: String },//称号

  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],//英雄分类
  scores: {//英雄难度分数
    difficult: { type: Number },//难度
    skills: { type: Number },//技能
    attack: { type: Number },//攻击
    survive: { type: Number },//生存
  },
  skills: [{//技能
    icon: { type: String },//图标
    name: { type: String },//技能名
    delay: { type: String },//冷却时间
    cost: { type: String },//消耗
    description: { type: String },//描述
    tips: { type: String },//技巧
  }],
  items1: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],//顺风出装
  items2: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],//逆风出装

  usageTips: { type: String },//使用技巧
  battleTips: { type: String },//对抗技巧
  teamTips: { type: String },//团战技巧
  partners: [{//英雄关系
    hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },//英雄 
    description: { type: String },//描述
  }],
})

module.exports = mongoose.model('Hero', schema, 'heroes')