/**
├── schema
    └── seat.js
    桌号表
*/
const moment = require('moment');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('seat', {
        // ID
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true,
        },
        // 名称
        name: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'name',
        },
        // 排序
        sort: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'sort',
            defaultValue: 0
        },
        // 状态 1:未使用 0:使用中 -1:删除
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