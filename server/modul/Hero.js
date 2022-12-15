const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },//英雄名
  avatar: { type: String },//头像
  banner: { type: String },//图片
  title: { type: String },//称号
  hero_type: { type: Number }, //1-6 战士,法师,坦克,刺客,射手,辅助
  hero_type2: { type: Number },
  ename: { type: Number }, //英雄排名 对应头像id
  skin_name: { type: String },
  moss_id: { type: Number },
  // "ename": 106,
  // "cname": "小乔",
  // "title": "恋之微风",
  // "new_type": 0,
  // "hero_type": 2,
  // "skin_name": "恋之微风|万圣前夜|天鹅之梦|纯白花嫁|缤纷独角兽",
  // "moss_id":3644

  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'category' }],//英雄分类
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