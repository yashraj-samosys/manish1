const nodemailer = require('nodemailer');
const sql = require('../db');
const commonFun = {};
const jwt = require('jsonwebtoken');

commonFun.runSQLquery = (que) => {
    return new Promise((resolve, reject) => {
        sql.query(que, (err, response) => {
            if (response) resolve(response);
            else reject(err);
        });
    });
}
commonFun.runSqlQueryWithData = (que, data) => {
    return new Promise((resolve, reject) => {
        sql.query(que, data, (err, response) => {
            if (response) resolve(response);
            else reject(err);
        });
    });
}

commonFun.generateToken = (data) => {
//   return jwt.sign(data, process.env.secret_key, { expiresIn: Math.floor(Date.now() / 1000) + (60 * 60)});
  return jwt.sign(data, process.env.secret_key);
}


module.exports = commonFun;