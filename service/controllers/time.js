/**
├── controllers
    └── time.js
    时段管理
*/
const TimeModel = require('../modules/time')

class TimeController {

    /**
     * 查询时段列表
     */
    static async getTimes(ctx) {
        const type = ctx.params.type;
        try {
            const data = await TimeModel.getTimes(type);
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
     * 新建时段
     * @param {object} ctx 
     */
    static async addTime(ctx) {
        const req = ctx.request.body;
        try {
            const data = await TimeModel.addTime(req);
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
     * 更新时段
     * @param {object} ctx 
     */
    static async updateTime(ctx) {
        const req = ctx.request.body;
        try {
            const data = await TimeModel.updateTime(req);
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
     * 删除时段
     * @param {object} ctx 
     */
    static async deleteTime(ctx) {
        const id = ctx.params.id;
        try {
            const data = await TimeModel.deleteTime(id);
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


module.exports = TimeController