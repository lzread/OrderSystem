/**
├── modules
    └── cart.js
    购物车管理
*/

const db = require('../config/db');
// 引入Sequelize对象
const Sequelize = db.sequelize;
// 引入上一步的用户数据表模型文件
const Cart = Sequelize.import('../schema/cart');
const Dishes = Sequelize.import('../schema/dishes');
// 自动创建表
Cart.sync({ force: false });
Cart.belongsTo(Dishes, { foreignKey: 'did', targetKey: 'id' });



class CartModel {

    /**
     * 根据会员ID查询购物车
     * @param {number} mid 会员ID
     */
    static async getCartById(mid) {
        return await Cart.findAll({
            include: {
                model: Dishes,
            },
            where: {
                mid
            },
        })
    }
    /**
     * 加入购物车
     * @param {Object} 
     */
    static async addCart(data) {
        return await Cart.create(data)
    }

    /**
     * 更新购物车菜品数量
     * @param {Object} data 
     */
    static async updateCartDishesNumber(data) {
        return await Cart.update(data)
    }
    /**
     * 根据会员ID删除清空购物车
     * @param {Number} mid 会员ID
     */
    static async deleteCartByMemberId(mid) {
        return await Cart.destroy({
            where: {
                mid
            }
        })
    }
    /**
     * 根据ID删除购物车内的菜品
     * @param {Number} id 购物车ID
     */
    static async deleteCartById(id) {
        return await Cart.destroy({
            where: {
                id
            }
        })
    }
}

module.exports = CartModel