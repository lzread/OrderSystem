/**
├── schema
    └── order_dishes.js
    订单和菜品关联表
*/
const moment = require('moment');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('order_dishes', {
        // ID
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true,
        },
        // 订单ID
        order_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'order_id',
        },
        // 菜品ID
        dishes_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'dishes_id',
        },
        // 菜品数量
        dishes_num: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'dishes_num',
        },
        // 菜品单价
        dishes_price: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'dishes_price',
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