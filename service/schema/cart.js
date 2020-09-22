/**
├── schema
    └── cart.js
    购物车表
*/
const moment = require('moment');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('cart', {
        // ID
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true,
        },
        // 用户ID
        mid: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'mid',
        },
        // 菜品ID
        did: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'did',
        },
        // 数量
        num: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'num',
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