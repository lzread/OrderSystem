/**
├── modules
    └── dishes.js
    菜品管理
*/

// 引入刚刚在第五点建立连接mysql数据库的db.js文件
const db = require('../config/db');
// 引入Sequelize对象
const Sequelize = db.sequelize;
// 引入Sequelize操作符
const Op = db.Op;
// 引入上一步的用户数据表模型文件
const Dishes = Sequelize.import('../schema/dishes');
const Category = Sequelize.import('../schema/category');

Dishes.belongsTo(Category, { foreignKey: 'cid', targetKey: 'id' });
// 自动创建表
Dishes.sync({ force: false });


class DishesModel {

    /**
     * 查询菜品列表
     * @param {number} page 当前页码
     * @param {number} limit 每页显示数量
     */
    static async getDishess(page, limit) {
        const dishes = await Dishes.findAndCountAll({
            include: {
                model: Category,
                attributes: [
                    'name'
                ]
            },
            order: [['sort', 'DESC']],
            limit: limit,
            offset: limit * (page - 1),
        })
        return {
            total: dishes.count,
            rows: dishes.rows
        };
    }
    /**
     * 根据ID查询菜品详细
     * @param {number} id 菜品ID
     */
    static async getDishessById(id) {
        return await Dishes.findOne({
            where: {
                id
            },
        })
    }
    /**
     * 新建菜品
     * @param {Object} data 菜品数据模型
     */
    static async addDishes(data) {
        return await Dishes.create(data)
    }
    /**
     * 更新菜品
     * @param {Object} data 菜品数据模型
     */
    static async updateDishes(data) {
        const { id } = data;
        return await Dishes.update(
            data,
            {
                where: {
                    id
                }
            })
    }
    /**
     * 删除菜品
     * @param {Number} id 菜品ID
     */
    static async deleteDishes(id) {
        return await Dishes.destroy({
            where: {
                id
            }
        })
    }
    /**
    * 根据分类ID查询启用的菜品列表
    * @param {number} cid 分类ID
    */
    static async getDishessByCidList(cid) {
        return await Dishes.findAll({
            order: [['sort', 'DESC']],
            where: {
                cid,
                status: 1
            }
        });
    }




}

module.exports = DishesModel