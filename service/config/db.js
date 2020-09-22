/**
 * mysql数据库连接相关信息
 */
const Sequelize = require('sequelize');
const sequelize = new Sequelize('fabm_db', 'root', '123456', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    // dialectOptions: {
    //     socketPath: '/tmp/mysql.sock' // 指定套接字文件路径
    // },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    timezone: '+08:00', //东八时区
});


const Op = Sequelize.Op;

module.exports = {
    sequelize, Op
}