/**
├── modules
    └── user.js
    后台用户管理
*/

const db = require('../config/db');
// 引入Sequelize对象
const Sequelize = db.sequelize;
// 引入上一步的用户数据表模型文件
const User = Sequelize.import('../schema/user');
// 自动创建表
User.sync({ force: false });

class UserModel {
    /**
     * 登录
     * @param {String} username 用户名
     * @param {String} password 密码
     * TODO 密码MD5加密
     */
    static async login(username, password) {
        return await User.findOne({
            attributes: ['id'],
            where: {
                username,
                password
            },
        })
    }
    

}

module.exports = UserModel