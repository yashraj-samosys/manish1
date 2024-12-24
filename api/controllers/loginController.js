const commonModel = require('../models/commonModel');
// const myProgramModel = require('../models/myProgramModel');
const webroutesController = function () { };
const resMessage = require('../helpers/res-message');
const mail = require('../helpers/mail');
const fs = require('fs');
const bcryptjs = require('bcryptjs');
var jwt = require('jsonwebtoken');
const md5 = require('md5')
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');

webroutesController.weblogin = async (req, res, next) => {
    try {
        let checkEmail = await commonModel.getDataForlogin({ email: req.body.email });
        if (checkEmail.length == 0) {
            return res.json({ status: false, data: [], msg: 'User not found' });
        } else {
            let ClientPaymentCheck = await commonModel.clientPaymentCheck({ user_id: checkEmail[0].id });
            if (checkEmail[0].id == 1) {
                return res.json({ status: false, data: [], msg: 'User not found' });
            } else {
                if (checkEmail[0].password) {
                    checkEmail[0].password = cryptr.decrypt(checkEmail[0].password);
                    if (req.body.password == checkEmail[0].password) {
                        var logindata = checkEmail.filter(logdata => logdata.status != 2)

                        if (checkEmail[0].status == 5) {
                            return res.json({ status: false, data: checkEmail, msg: 'Please verify your account', delete: false });
                        }
                        if (checkEmail[0].status == 4) {
                            return res.json({ status: false, data: checkEmail, msg: 'Your account is rejected by admin', delete: false });
                        }

                        // ***********************If Client payment not done**********************************
                        if (logindata.length == 1 && logindata[0].status == 0 && logindata[0].agent_type == 1 && ClientPaymentCheck.length == 0) {
                            return res.json({ status: false, data: checkEmail, msg: 'Please pay first to activate the client account', delete: false, ClientPayment: false });
                        }
                        // ***********************If Client payment not done**********************************

                        if (checkEmail[0].status == 0 && checkEmail[0].is_want_referrals == 1) {
                            // console.log('part 1')
                            return res.json({ status: false, data: checkEmail, msg: 'Account is inactive', delete: false });
                        }
                        if (checkEmail[0].status == 0 && checkEmail[0].is_want_referrals == 2) {
                            return res.json({ status: false, data: checkEmail, msg: 'Please Reactivate Account!', delete: true });
                        }
                        // *********************************************************
                        if (logindata.length == 0) {
                            // console.log("part 2")
                            return res.json({ status: false, data: checkEmail, msg: 'Account is Deleted', delete: true });
                        }
                        // *********************************************************
                        // if(logindata.length == 1 && logindata[0].status == 1){
                        //    return res.json({ status: true, data: logindata,msg:'Login Successfully' });
                        //   }

                        if (logindata.length == 1 && logindata[0].status == 0) {
                            return res.json({ status: false, data: [], msg: 'Account is inactive', delete: false });
                        }
                        else {
                            delete checkEmail[0].password;
                            for (x of checkEmail) { x.profile_img = process.env.image_path + x.profile_img }
                            if (checkEmail[0].agent_type == 1) {
                                checkEmail[0].user_type = 2;
                                checkEmail[0].is_default_agent = 0;
                            }
                            return res.json({ status: true, data: checkEmail, msg: 'Login Successfully' });
                        }
                    } else {
                        return res.json({ status: false, data: [], msg: 'Invalid Password' });
                    }
                }
                else {
                    return res.json({ status: false, data: [], msg: 'Account is inactive' });
                }

            }
        }
        // const Cryptr = require('cryptr');
        // const cryptr = new Cryptr('myTotalySecretKey'); 
        // const encryptedString = cryptr.encrypt('bacon');
        // const decryptedString = cryptr.decrypt(encryptedString);
        //  console.log(encryptedString);
        //  // e7b75a472b65bc4a42e7b3f78833a4d00040beba796062bf7c13d9533b149e5ec3784813dc20348fdf248d28a2982df85b83d1109623bce45f08238f6ea9bd9bb5f406427b2a40f969802635b8907a0a57944f2c12f334bd081d5143a357c173a611e1b64a
        // console.log(decryptedString); // bacon

    } catch (err) {
        console.log(err)
        return res.json({ status: false, data: [] });
    }
}


webroutesController.getProfileData = async (req, res, next) => {
    try {
        let checkEmail = await commonModel.selectAllWhere('agent', { id: req.params.id, status: 1 });
        for (x of checkEmail) {
            if (x.profile_img != null) {
                x.profile_img = process.env.image_path + x.profile_img
            }
        }
        return res.json({ status: true, data: checkEmail });
    } catch (err) {
        console.log(err)
        return res.json({ status: false, data: [] });
    }
}

webroutesController.reactivateReferral = async (req, res, next) => {
    try {
        let reactivateRes = await commonModel.update('agent', { status: 1, is_want_referrals: 1, unsubscribe: 0 }, { email: req.body.email });
        let getReactivateId = await commonModel.selectAllWhere('agent', { email: req.body.email });
        await commonModel.update("user_fsa", { status: 1 }, { user_id: getReactivateId[0].id });
        return res.json({ status: true, msg: 'Reactivated Account Successfully!' });
    } catch (err) {
        console.log(err)
        return res.json({ status: false, data: [] });
    }
}

webroutesController.getAdminList = async (req, res, next) => {
    try {
        let result = await commonModel.selectAllWhere('agent', { id: 1 });
        if (result.length) {
            for (let x of result) x.profile_img = process.env.image_path + x.profile_img;
            return res.json({ status: true, msg: 'data found', data: result });
        } else return res.json({ status: false, msg: 'data not fount', data: [] });
    } catch (err) {
        return res.json({ status: false, msg: 'data not found', data: [] });
    }
}



webroutesController.forgotPassword = async (req, res, next) => {
    try {
        let userExist = await commonModel.selectAllWhere('agent', { email: req.body.email });
        let id = userExist[0].id
        let user_type = userExist[0].user_type
        let agent_type = userExist[0].agent_type
        // return

        if (userExist.length == 1) {
            let token = jwt.sign({ id: id, agent_type: agent_type, user_type: user_type }, process.env.secret_key, { expiresIn: '15m' });
            req.body.token = token;
            req.body.fullname = userExist[0].first_name + (userExist[0].last_name ? ' ' + userExist[0].last_name : '');
            mail.forgotPasswordMail(req.body);
            return res.json({ status: true, msg: 'Mail sent successfully!', data: [] });
        }
        else {

            return res.json({ status: false, msg: 'User not found', data: [] });
        }
    } catch (err) {
        return res.json({ status: false, msg: 'User not found', data: [] });
    }
}

webroutesController.ResetPassword = async (req, res, next) => {
    try {
        if (req.params) {
            let decoded = jwt.verify(req.params.token, process.env.secret_key, (err) => {

                if (err) { return false; } else { return true; }
            });
            if (decoded == true) {
                req.body.password = cryptr.encrypt(req.body.password);
                await commonModel.update('agent', { password: req.body.password }, { id: req.body.id });
                let getAgentData = await commonModel.selectAllWhere('agent', { id: req.body.id });
                req.body.fullname = getAgentData[0].first_name + (getAgentData[0].last_name ? ' ' + getAgentData[0].last_name : '');
                req.body.email = getAgentData[0].email;
                if(getAgentData[0].user_type == 3){
                    req.body.loginLinke = process.env.RealtorSignIn
                    mail.passwordChangeSucessful(req.body);
                }else if (getAgentData[0].user_type == 2) {
                    req.body.loginLinke = process.env.ClientSignIn
                    mail.passwordChangeSucessful(req.body);
                }                
            } else {
                return res.json({ status: false, msg: 'Token is expired!' });
            }
            return res.json({ status: true, msg: 'Password reset successfully!', data: [] });
        } else {
            return res.json({ status: false, data: [] });
        }
    } catch (err) {
        return res.json({ status: false, msg: resMessage.invalidToken });
    }
}

webroutesController.getUserData = async (req, res, next) => {
    try {
        let checkEmail = await commonModel.getDataForloginByID({ id: req.body.id });
        if (checkEmail.length == 0) {
            return res.json({ status: false, data: [], msg: 'User Data not found' });
        } else {
            return res.json({ status: true, data: checkEmail, msg: 'User Data found' });
        }
    } catch (err) {
        console.log(err)
        return res.json({ status: false, data: [] });
    }
}


module.exports = webroutesController;

