
/**
├── controllers
    └── dishes.js
    菜品管理
*/
const DishesModel = require('../modules/dishes')
const CategoryModel = require('../modules/category')
class DishesController {

    /**
     * 查询菜品列表
     * @param {*} ctx
     */
    static async getDishess(ctx) {
        const { page, limit } = ctx.query;
        try {
            const data = await DishesModel.getDishess(parseInt(page), parseInt(limit));
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                message: '查询成功',
                data,
            }
        } catch (error) {
            ctx.response.status = 416;
            ctx.body = {
                code: 416,
                msg: '查询失败',
            }
        }
    }
    /**
     * 根据ID查询菜品详细
     * @param {*} ctx 
     */
    static async getDishessById(ctx) {
        const id = ctx.params.id;
        try {
            const data = await DishesModel.getDishessById(id);
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                message: '查询成功',
                data,
            }
        } catch (error) {
            ctx.response.status = 416;
            ctx.body = {
                code: 416,
                msg: '查询失败',
            }
        }
    }
    /**
     * 新建菜品
     * @param {object} ctx 
     */
    static async addDishes(ctx) {
        const req = ctx.request.body;
        try {
            const data = await DishesModel.addDishes(req);
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '创建成功',
                data
            }
        } catch (error) {
            ctx.response.status = 416;
            ctx.body = {
                code: 416,
                msg: '创建失败',
            }
        }
    }
    /**
     * 更新菜品
     * @param {object} ctx 
     */
    static async updateDishes(ctx) {
        const req = ctx.request.body;
        try {
            const data = await DishesModel.updateDishes(req);
            if (data[0] == 1) {
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '更新成功',
                }
            } else {
                ctx.response.status = 200;
                ctx.body = {
                    code: 412,
                    msg: '更新内容没有发生变化',
                }
            }

        } catch (err) {
            ctx.response.status = 416;
            ctx.body = {
                code: 416,
                msg: '更新失败',
            }
        }
    }
    /**
     * 删除菜品
     * @param {object} ctx 
     */
    static async deleteDishes(ctx) {
        const id = ctx.params.id;
        try {
            const data = await DishesModel.deleteDishes(id);
            if (data == 1) {
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    msg: '删除成功',
                }
            } else {
                ctx.response.status = 200;
                ctx.body = {
                    code: 412,
                    msg: '删除失败',
                }
            }
        } catch (err) {
            ctx.response.status = 416;
            ctx.body = {
                code: 416,
                msg: '删除失败',
            }
        }
    }

    static async getDishesList(ctx) {
        try {
            const res = JSON.parse(JSON.stringify(await CategoryModel.getCategorys()));
            for (let x in res) {
                res[x].dishes = await DishesModel.getDishessByCidList(res[x].id);
            }
            const data = res;
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                message: '查询成功',
                data,
            }
        } catch (error) {
            ctx.response.status = 416;
            ctx.body = {
                code: 416,
                msg: '查询失败',
            }
        }
    }





}

module.exports = DishesController