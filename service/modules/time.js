/**
├── modules
    └── time.js
    时段管理
*/

// 引入刚刚在第五点建立连接mysql数据库的db.js文件
const db = require('../config/db');
// 引入Sequelize对象
const Sequelize = db.sequelize;
// 引入Sequelize操作符
const Op = db.Op;
// 引入上一步的用户数据表模型文件
const Time = Sequelize.import('../schema/time');

// 自动创建表
Time.sync({ force: false });


class TimeModel {


    static async getTimes(type) {

        if (type == 0) {
            return await Time.findAll({
                order: [['sort', 'DESC']]
            });
        } else {
            return await Time.findAll({
                order: [['sort', 'DESC']],
                where: {
                    status: 1
                }
            });
        }

    }

    static async addTime(data) {
        return await Time.create(data)
    }

    static async updateTime(data) {
        const { id } = data;
        return await Time.update(
            data,
            {
                where: {
                    id
                }
            })
    }

    static async deleteTime(id) {
        return await Time.destroy({
            where: {
                id
            }
        })
    }

}

module.exports = TimeModel