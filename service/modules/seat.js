/**
├── modules
    └── seat.js
    桌号管理
*/

// 引入刚刚在第五点建立连接mysql数据库的db.js文件
const db = require('../config/db');
// 引入Sequelize对象
const Sequelize = db.sequelize;
// 引入Sequelize操作符
const Op = db.Op;
// 引入上一步的用户数据表模型文件
const Seat = Sequelize.import('../schema/seat');

// 自动创建表
Seat.sync({ force: false });


class SeatModel {


    static async getSeats(type) {

        if (type == 0) {
            return await Seat.findAll({
                order: [['sort', 'DESC']]
            });
        } else {
            return await Seat.findAll({
                order: [['sort', 'DESC']],
                where: {
                    status: 1
                }
            });
        }

    }

    static async getSeatById(id) {

        return await Seat.findOne({
            where: {
                id
            }
        });

    }

    static async addSeat(data) {
        return await Seat.create(data)
    }

    static async updateSeat(data) {
        const { id } = data;
        return await Seat.update(
            data,
            {
                where: {
                    id
                }
            })
    }

    static async deleteSeat(id) {
        return await Seat.destroy({
            where: {
                id
            }
        })
    }

}

module.exports = SeatModel