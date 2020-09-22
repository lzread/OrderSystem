/**
├── controllers
    └── base.js
    通用功能基础类
*/
const Client = require('../config/oss')
const Utils = require('../utils/index')
class BaseController {
    /**
     * 通用aliyunOSS上传接口
     * @param {*} ctx 
     */
    static async uploadImage(ctx) {
        let file = ctx.request.files.file
        let path = file.path;                                   //本地文件路径
        let ext = Utils.getUploadFileExt(file.name);            //获取文件后缀
        let filename = Utils.getUploadDirName() + '.' + ext;    //生成文件名称
        try {
            let data = await Client.put(filename, path)
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                message: '上传成功',
                data,
            }
        } catch (err) {
            ctx.response.status = 416;
            ctx.body = {
                code: 416,
                msg: '上传失败',
            }
        }

    }
}
module.exports = BaseController