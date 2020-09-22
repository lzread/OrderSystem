/**
├── modules
    └── order.js
    订单管理
*/

const db = require('../config/db');
// 引入Sequelize对象
const Sequelize = db.sequelize;
// 引入上一步的用户数据表模型文件
const Order = Sequelize.import('../schema/order');
const OrderDishes = Sequelize.import('../schema/order_dishes');
const Dishes = Sequelize.import('../schema/dishes');
// 自动创建表
Order.sync({ force: false });

Order.belongsToMany(Dishes, {
    through: {
        model: OrderDishes,
        unique: false,
    }, foreignKey: 'order_id'
});

Dishes.belongsToMany(Order, {
    through: {
        model: OrderDishes,
        unique: false,
    }, foreignKey: 'dishes_id'
});

class OrderModel {

    /**
     * 创建订单
     * @param {Object} data 订单数据模型
     */
    static async addOrder(data) {
        return await Order.create(data)
    }


    static async updateOrder(data) {
        const { id } = data;
        return await Order.update(
            data,
            {
                where: {
                    id
                }
            })
    }



    /**
     * 根据桌号ID查询进行中的订单详细
     * @param {number} seat_no 
     */
    static async getOrderBySeatOn(seat_no) {
        return await Order.findOne({
            include: {
                model: Dishes,
                attributes: ['id', 'name', 'price', 'url', 'status', [Sequelize.literal('`dishes_price` * `dishes_num`'), 'subtotal']],
            },

            where: {
                seat_no,
                status: 1
            }
        })
    }





}

module.exports = OrderModel