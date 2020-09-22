/**
├── schema
    └── user.js
    用户表
*/
const moment = require('moment');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('user', {
        // 用户ID
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true,
        },
        // 用户名
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'username',
        },
        // 密码
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'password'
        },
        // 状态 1:正常 0:禁用 -1:删除
        status: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'status',
            defaultValue: 1
        },

    }, {
        // 如果为 true 则表的名称和 model 相同，即 user
        // 为 false MySQL创建的表名称会是复数 users
        // 如果指定的表名称本就是复数形式则不变
        freezeTableName: false,
        timestamps: false
    })

}