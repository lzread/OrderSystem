/**
├── modules
    └── Category.js
    菜品分类管理
*/

// 引入刚刚在第五点建立连接mysql数据库的db.js文件
const db = require('../config/db');
// 引入Sequelize对象
const Sequelize = db.sequelize;
// 引入Sequelize操作符
const Op = db.Op;
// 引入上一步的用户数据表模型文件
const Category = Sequelize.import('../schema/category');

// 自动创建表
Category.sync({ force: false });


class CategoryModel {

    /**
     * 查询分类列表
     */
    static async getCategorys() {
        return await Category.findAll({
            order: [['sort', 'DESC']]
        });
    }

    /**
     * 根据ID查询分类详细
     * @param {number} id 分类ID
     */
    static async getCategoryById(id) {
        return await Category.findOne({
            where: {
                id
            },
        })
    }

    /**
     * 新建分类
     * @param {Object} data 分类数据模型
     */
    static async addCategory(data) {
        return await Category.create(data)
    }

    /**
     * 更新分类
     * @param {Object} data 分类数据模型
     */
    static async updateCategory(data) {
        const { id } = data;
        return await Category.update(
            data,
            {
                where: {
                    id
                }
            })
    }

    /**
     * 删除分类
     * @param {Number} id 分类ID
     */
    static async deleteCategory(id) {
        return await Category.destroy({
            where: {
                id
            }
        })
    }

    /**
     * 查询分类列表,过滤未启用的分类
     */
    static async getCategoryList() {
        return await Category.findAll({
            order: [['sort', 'DESC']],
            where: {
                status: 1
            }
        });
    }



}

module.exports = CategoryModel