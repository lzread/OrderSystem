/**
├── modules
    └── order_dishes.js
    订单菜品关联
*/

const db = require('../config/db');
// 引入Sequelize对象
const Sequelize = db.sequelize;
// 引入上一步的用户数据表模型文件
const OrderDishes = Sequelize.import('../schema/order_dishes');
// 自动创建表
OrderDishes.sync({ force: false });

class OrderDishesModel {
    /**
     * 创建订单明细
     * @param {Object} data 订单明细数据模型
     */
    static async addOrderDishes(data) {
        return await OrderDishes.bulkCreate(data)
    }


    static async updateOrderDishes(data) {
        const { id } = data;
        return await OrderDishes.update(
            data,
            {
                where: {
                    id
                }
            })
    }


    static async deleteOrderDishes(order_id) {
        return await OrderDishes.destroy({
            where: {
                order_id
            }
        })
    }




}

module.exports = OrderDishesModel