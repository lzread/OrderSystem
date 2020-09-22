/**
├── modules
    └── member.js
    会员管理
*/

const db = require('../config/db');
// 引入Sequelize对象
const Sequelize = db.sequelize;
// 引入上一步的用户数据表模型文件
const Member = Sequelize.import('../schema/member');
// 自动创建表
Member.sync({ force: false });

class MemberModel {



}

module.exports = MemberModel