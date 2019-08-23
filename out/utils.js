"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
/**
 * 封装一个数据库连接的方法
 * @param {string} sql SQL语句
 * @param arg SQL语句插入语句的数据
 * @param callback SQL语句的回调
 */
function db(sql, arg, callback) {
    // 1.创建连接
    const config = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'adminadmin',
        port: 3306,
        database: 'daily_hotspot' // 使用数据库名字
    });
    // 2.开始连接数据库
    config.connect(err => {
        if (err) {
            console.log(err);
            console.log('链接数据库失败');
        }
        else {
            console.log('链接数据库成功');
            insertData();
        }
    });
    // 3.封装对数据库的增删改查操作
    function insertData() {
        config.query(sql, arg, (err, data) => {
            callback(err, data);
        });
    }
    // 4.关闭数据库
    // config.end();
}
exports.db = db;
