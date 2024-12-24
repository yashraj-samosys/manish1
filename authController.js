const commonModel = require('../models/commonModel');
const authModel = require('../models/authModel');
const authController = function () { };
const resMessage = require('../helpers/res-message');
const bcryptjs = require('bcryptjs');
const commonFun = require('../helpers/commonFun');
const mail = require('../helpers/mail');
const { body } = require('express-validator/check');
// const Buffer = require('buffer');
//***** REGISTRATION START *****//
authController.registration = async (req, res, next) => {
    try {
        //Check email already exist
        let result = await commonModel.selectAllWhere('users', { email: req.body.email });
        if (result.length) return res.json({ status: false, msg: resMessage.emailExist, data: [] });
        req.body.password = await bcryptjs.hash(req.body.password, 10);
        if (req.file) req.body.profile_img = req.file.filename;

        await commonModel.insert('users', req.body);
        return res.json({ status: true, msg: resMessage.registration });
    } catch (err) {
        return res.json({ status: false, msg: resMessage.registrationErr });
    }
}
//***** REGISTRATION END *****//

//***** LOGIN START*****//
authController.login = async (req, res, next) => {
    console.log("manish")
    try {
    
        // console.log(req.body,"req.body")
        // let result = await commonModel.selectAllWhere("users", { email: req.body.email, user_type: 1 });
        let result = await commonModel.login(req.body.email);
        //  console.log(result,"result")
        if (!result.length) return res.json({ status: false, msg: resMessage.inavalidEmail, data: [] });
        // PASSWORD MATCH
        if (!req.body.password) req.body.password = '0';
        let matched = await bcryptjs.compare(req.body.password, result[0].password);
        // console.log(matched ,"password")
        if (!matched) return res.json({ status: false, msg: resMessage.invalidPass, data: [] });
        delete result[0].password;
        return res.json({ status: true, msg: resMessage.login, data: result });

    } catch (err) {
        return res.json({ status: false, msg: resMessage.loginFailed, data: [] });
    }
}
//***** LOGIN END *****//

//***** FORGOT STARTS *****//

authController.forgot = async (req, res, next) => {

    try {
        let result = await commonModel.forgot(req.body.email);
        // console.log(result, 'result')
        if (!result.length) return res.json({ status: false, msg: resMessage.inavalidEmail, data: [] });
        else {
            // console.log(result[0].id)

            //   var otp = (Math.floor(Math.random() * 9000000) + 1000000).toString().substring(1);
            var otp = (Math.floor(100000 + Math.random() * 900000)).toString().substring();
            console.log(otp)


            // var jwt = require('jsonwebtoken');

            // const token = jwt.sign({
            //     'name': admin.name
            // }, RSA_PRIVATE_KEY, {
            //     algorithm: 'RS256',
            //     expiresIn: 7200,
            //     subject: adminId
            // });
            // console.log(jwt, "lklklklklklklklk")

            await commonModel.update("users", { otp: otp }, { id: result[0].id });

            const en = Buffer.from(result[0].id.toString()).toString('base64')
            // console.log(en,"jjjjjjjj")
            await mail.SendOtpForgetPassword({ otp: otp, user_name: result[0].user_name, email: req.body.email, id: en })
            return res.json({ status: true, msg: resMessage.login, data: result });

        }
    } catch (err) {
        console.log(err)
        return res.json({ status: false, msg: resMessage.loginFailed, data: [] });
    }
}


//***** FORGOT END *****//

// authController.updatepass = async (req, res, next) => {



//            await commonModel.update(req.body.email);

//            return res.json({ status: true, msg: resMessage.updateSucc });


// }




// authController.updatepass = async (req, res, next) => {
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


// //***** CHANGE USER PASSWORD START *****//

authController.updatepass = async (req, res, next) => {

    try {

        result = await commonModel.selectAllWhere("users", { id: req.params.id });
        if (result.length) {
            if (result[0].otp == req.body.otp) {
                await commonModel.update("users", { password: await bcryptjs.hash(req.body.password, 10) }, { id: req.params.id });
                mail.PasswordCHanged({email:result[0].email, user_name:result[0].user_name});
                return res.json({ status: true, msg: resMessage.updateSucc });
            }
            else {
                return res.json({ status: false, msg: "Invalid OTP", data: [] });
            }
        } else {
            return res.json({ status: false, msg: resMessage.updateFailed });

        }
    } catch (err) {

        return res.json({ status: false, msg: resMessage.updateFailed });
    }
}
//***** CHANGE USER PASSWORD END *****//

module.exports = authController;
