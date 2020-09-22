/**
├── controllers
    └── people.js
    人数管理
*/
const PeopleModel = require('../modules/people')

class PeopleController {

    /**
     * 查询人数列表
     */
    static async getPeoples(ctx) {
        const type = ctx.params.type;
        try {
            const data = await PeopleModel.getPeoples(type);
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
     * 新建人数
     * @param {object} ctx 
     */
    static async addPeople(ctx) {
        const req = ctx.request.body;
        try {
            const data = await PeopleModel.addPeople(req);
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
     * 更新人数
     * @param {object} ctx 
     */
    static async updatePeople(ctx) {
        const req = ctx.request.body;
        try {
            const data = await PeopleModel.updatePeople(req);
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
     * 删除人数
     * @param {object} ctx 
     */
    static async deletePeople(ctx) {
        const id = ctx.params.id;
        try {
            const data = await PeopleModel.deletePeople(id);
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


module.exports = PeopleController