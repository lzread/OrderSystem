/**
├── controllers
    └── order_dishes.js
    订单菜品关联
*/
const OrderDishesModel = require('../modules/order_dishes')

class OrderDishesController {
    static async addOrderDishes(ctx) {
        const req = ctx.request.body;
        try {
            const data = await OrderDishesModel.addOrderDishes(req);
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

    static async updateOrderDishes(ctx) {
        const req = ctx.request.body;
        console.log(req);
        try {
            const data = await OrderDishesModel.updateOrderDishes(req);
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


    static async deleteOrderDishes(ctx) {
        const id = ctx.params.id;
        
        try {
            const data = await OrderDishesModel.deleteOrderDishes(id);
            console.log(data);
            if (data) {
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
module.exports = OrderDishesController