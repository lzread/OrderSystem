/**
├── controllers
    └── cart.js
    购物车管理
*/
const CartModel = require('../modules/cart')

class CartController {


    static async getCartById(ctx) {
        const id = ctx.params.id;
        try {
            const data = await CartModel.getCartById(id);
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

    static async addCart(ctx) {
        const req = ctx.request.body;
        try {
            const data = await CartModel.addCart(req);
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

    static async deleteCartById(ctx) {
        const id = ctx.params.id;
        try {
            const data = await CartModel.deleteCartById(id);
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


}
module.exports = CartController