/**
├── controllers
    └── order.js
    订单管理
*/
const OrderModel = require('../modules/order')

class OrderController {

    static async addOrder(ctx) {
        const req = ctx.request.body;
        try {
            const data = await OrderModel.addOrder(req);
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

    static async getOrderBySeatOn(ctx) {
        const id = ctx.params.id;
        try {
            const data = await OrderModel.getOrderBySeatOn(id);
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

    static async updateOrder(ctx) {
        const req = ctx.request.body;
        try {
            const data = await OrderModel.updateOrder(req);
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
}
module.exports = OrderController