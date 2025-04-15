const mysql = require('mysql2');
const pool = mysql.createConnection({
    "user": "root",
    "password": "root",
    "database": "idev3",
    "host": "localhost",
    "port": "3307",
});

exports.execute = (query, param = [], varPoll = pool) => {
    return new Promise((resolve, reject) => {
        varPoll.query(query, param, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });

}
exports.pool = pool;