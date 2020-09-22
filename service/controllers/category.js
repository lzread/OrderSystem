/**
├── controllers
    └── category.js
    菜品分类
*/
const CategoryModel = require('../modules/category')

class CategoryController {

    /**
     * 查询分类列表
     */
    static async getCategorys(ctx) {
        try {
            const data = await CategoryModel.getCategorys();
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
     * 根据ID查询分类详细
     * @param {object} ctx 
     */
    static async getCategoryById(ctx) {
        const id = ctx.params.id;
        try {
            const data = await CategoryModel.getCategoryById(id);
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
     * 新建分类
     * @param {object} ctx 
     */
    static async addCategory(ctx) {
        const req = ctx.request.body;
        try {
            const data = await CategoryModel.addCategory(req);
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
     * 更新分类
     * @param {object} ctx 
     */
    static async updateCategory(ctx) {
        const req = ctx.request.body;
        try {
            const data = await CategoryModel.updateCategory(req);
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
                    msg: '更新失败',
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
     * 删除分类
     * @param {object} ctx 
     */
    static async deleteCategory(ctx) {
        const id = ctx.params.id;
        try {
            const data = await CategoryModel.deleteCategory(id);
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
    /**
     * 查询分类列表,过滤未启用的分类
     */
    static async getCategoryList(ctx) {
        try {
            const data = await CategoryModel.getCategoryList();
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


module.exports = CategoryController