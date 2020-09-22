/**
├── controllers
    └── seat.js
    桌号管理
*/
const SeatModel = require('../modules/seat')

class SeatController {

    /**
     * 查询桌号列表
     */
    static async getSeats(ctx) {
        const type = ctx.params.type;
        try {
            const data = await SeatModel.getSeats(type);
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

    static async getSeatById(ctx) {
        const id = ctx.params.id;
        try {
            const data = await SeatModel.getSeatById(id);
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
     * 新建桌号
     * @param {object} ctx 
     */
    static async addSeat(ctx) {
        const req = ctx.request.body;
        try {
            const data = await SeatModel.addSeat(req);
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
     * 更新桌号
     * @param {object} ctx 
     */
    static async updateSeat(ctx) {
        const req = ctx.request.body;
        console.log(req);
        try {
            const data = await SeatModel.updateSeat(req);
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
     * 删除桌号
     * @param {object} ctx 
     */
    static async deleteSeat(ctx) {
        const id = ctx.params.id;
        try {
            const data = await SeatModel.deleteSeat(id);
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


module.exports = SeatController