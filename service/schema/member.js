/**
├── schema
    └── member.js
    会员表
*/
const moment = require('moment');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('member', {
        // 用户ID
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true,
        },
        // 昵称
        nick_name: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'nick_name',
        },
        // 真实姓名
        real_name: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'real_name',
        },
        // 性别 1:女 0:男 -1:未知
        sex: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'sex',
            defaultValue: -1
        },
        // 出生日期
        birth_date: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'birth_date',
        },
        //  手机号
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'phone'
        },
        // openid
        openid: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'openid'
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