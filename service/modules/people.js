/**
├── modules
    └── people.js
    人数管理
*/

// 引入刚刚在第五点建立连接mysql数据库的db.js文件
const db = require('../config/db');
// 引入Sequelize对象
const Sequelize = db.sequelize;
// 引入Sequelize操作符
const Op = db.Op;
// 引入上一步的用户数据表模型文件
const People = Sequelize.import('../schema/people');

// 自动创建表
People.sync({ force: false });


class PeopleModel {


    static async getPeoples(type) {

        if (type == 0) {
            return await People.findAll({
                order: [['sort', 'DESC']]
            });
        } else {
            return await People.findAll({
                order: [['sort', 'DESC']],
                where: {
                    status: 1
                }
            });
        }

    }

    static async addPeople(data) {
        return await People.create(data)
    }

    static async updatePeople(data) {
        const { id } = data;
        return await People.update(
            data,
            {
                where: {
                    id
                }
            })
    }

    static async deletePeople(id) {
        return await People.destroy({
            where: {
                id
            }
        })
    }

}

module.exports = PeopleModel