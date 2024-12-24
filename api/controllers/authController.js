const commonModel = require('../models/commonModel');
const authModel = require('../models/authModel');
const authController = function () { };
const resMessage = require('../helpers/res-message');
const bcryptjs = require('bcryptjs');
const commonFun = require('../helpers/commonFun');
const md5 = require('md5');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');

//***** REGISTRATION START *****//
authController.registration = async (req, res, next) => {
    try {
        //Check email already exist
        let result = await commonModel.selectAllWhere('users', { email: req.body.email });
        if (result.length) return res.json({ status: false, msg: resMessage.emailExist, data: [] });
        // req.body.password = md5(req.body.password);
        req.body.password = cryptr.encrypt(req.body.password);
        // req.body.password = await bcryptjs.hash(req.body.password, 10);
        if (req.file) req.body.profile_img = req.file.filename;
        await commonModel.insert('users', req.body);
        return res.json({ status: true, msg: resMessage.registration });
    } catch (err) {
        console.log(err)
        return res.json({ status: false, msg: resMessage.registrationErr });
    }
}
//***** REGISTRATION END *****//

//***** LOGIN START*****//
authController.login = async (req, res, next) => {
    // console.log( req.body,'BOD')
    // try {
    //     // req.body.password = md5(req.body.password);
    //     let result = await commonModel.checkEmail(req.body.email);
    //     if (!result.length) return res.json({ status: false, msg: resMessage.inavalidEmail, data: [] });
    //     if (!result[0].status && result[0].user_type != 1) return res.json({ status: false, msg: resMessage.deactivate, data: [] });
    //     // if (!result[0].status && (result[0].user_type != 1 || result[0].user_type != 5)) return res.json({ status: false, msg: resMessage.deactivate, data: [] });
    //     // PASSWORD MATCH
    //     if (!req.body.password) req.body.password = '0';
    //     result[0].password = cryptr.decrypt(result[0].password);
    //     console.log(req.body.password == result[0].password,'req.body.password == checkEmail[0].password')
    //     // let matched = await bcryptjs.compare(req.body.password, result[0].password);
    //     if (req.body.password != result[0].password) return res.json({ status: false, msg: resMessage.invalidPass, data: [] });
    //     delete result[0].password;
    //     return res.json({ status: true, msg: resMessage.login, data: result });

    // } catch (err) {
    //     console.log(err)
    //     return res.json({ status: false, msg: resMessage.loginFailed, data: [] });
    // }
    try {
        let result = await commonModel.loginadmin('agent', { email: req.body.email });
        if (!result.length) return res.json({ status: false, msg: resMessage.inavalidEmail, data: [] });
        if (!result[0].status) return res.json({ status: false, msg: resMessage.deactivate, data: [] });
        if (!req.body.password) req.body.password = '0';
        result[0].password = cryptr.decrypt(result[0].password);
        if (req.body.password != result[0].password) return res.json({ status: false, msg: resMessage.invalidPass, data: [] });

        delete result[0].password;
        return res.json({ status: true, msg: resMessage.login, data: result });

    } catch (err) {
        console.log(err)
        return res.json({ status: false, msg: resMessage.loginFailed, data: [] });
    }

}
//***** LOGIN END *****//


// //***** CHANGE USER PASSWORD START *****//

// authController.changePass = async (req, res, next) => {
//     try {
//         result = await commonModel.selectAllWhere("users", { id: req.params.id });
//         let matched = await bcryptjs.compare(req.body.password, result[0].password);

//         if (matched) return res.json({ status: false, msg: resMessage.chooseAnotherPas });
//         await commonModel.update("users", { password: await bcryptjs.hash(req.body.password, 10) }, { id: req.params.id });
//         return res.json({ status: true, msg: resMessage.updateSucc });
//     } catch (err) {
//         return res.json({ status: false, msg: resMessage.updateFailed });
//     }
// }
// //***** CHANGE USER PASSWORD END *****//

module.exports = authController;
