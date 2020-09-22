/**
├── schema
    └── order.js
    订单表
*/
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('order', {
        // ID
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true,
        },
        // 订单编号
        order_number: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'order_number',
        },
        // 就餐日期
        repast_date: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'repast_date',
        },
        // 就餐时段
        repast_time: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'repast_time',
        },
        // 桌号
        seat_no: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'seat_no',
        },
        // 备注
        remark: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'remark',
        },
        // 状态 2:完成 1:进行中 0:未付款 -1:取消订单
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