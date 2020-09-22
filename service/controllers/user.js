/**
├── controllers
    └── user.js
    后台用户管理
*/
const UserModel = require('../modules/user')
const jwt = require('jsonwebtoken')

class userController {
    /**
     * 后台管理用户登录
     * @param {*} ctx
     */
    static async login(ctx) {
        const req = ctx.request.body;
        try {
            const query = await UserModel.login(req.username, req.password);
            const data = {};
            if (query) {
                const token = jwt.sign({ username: req.username, password: req.password }, 'token', {
                    expiresIn: 60 * 60 * 1  // 1小时过期
                });
                data.id = query.id;
                data.token = token;
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    message: '登录成功',
                    data
                }
            } else {
                ctx.response.status = 200;
                ctx.body = {
                    code: 412,
                    message: '用户名或密码错误',
                    data
                }
            }
        } catch (error) {
            ctx.response.status = 416;
            ctx.body = {
                code: 416,
                message: '登录失败',
            }
        }
    }


}
module.exports = userController