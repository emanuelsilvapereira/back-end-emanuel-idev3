const mysql = require('mysql');
const pool = mysql.createPoolCluster({
    "user": "root",
    "password": "root",
    "database": "idev3",
    "host": "localhost",
    "port": "3306",
});

exports.execute = (query, param = [], varPoll = pool) => {
    return new Promise((resolve, reject) => {
        varPoll.query(query, param, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });

}
exports.pool = pool;