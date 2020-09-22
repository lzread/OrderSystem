/**
├── schema
    └── dishes.js
    菜品表
*/
const moment = require('moment');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('dishes', {
        // 菜品ID
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true,
        },
        // 名称
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'name',
        },
        // 价格
        price: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'price'
        },
        // 图片
        url: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'url'
        },
        // 描述
        desc: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'desc'
        },
        // 排序
        sort: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'sort',
            defaultValue: 0
        },
        // 分类ID
        cid: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'cid'
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