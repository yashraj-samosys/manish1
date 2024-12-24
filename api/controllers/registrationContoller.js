const commonModel = require('../models/commonModel');
// const myProgramModel = require('../models/myProgramModel');
const webroutesController = function () { };
const resMessage = require('../helpers/res-message');
const mail = require('../helpers/mail');
const fs = require('fs');
const bcryptjs = require('bcryptjs');
const md5 = require('md5');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');

var jwt = require('jsonwebtoken');
var NodeGeocoder = require('node-geocoder');
var options = {
    provider: 'google',
    httpAdapter: 'https', // Default
    apiKey: "AIzaSyCJlBCZdOClKwUwb1t9ffC9ajsy6XE-rPE",
    formatter: 'json' // 'gpx', 'string', ...
};
var geocoder = NodeGeocoder(options);


function create_UUID() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

webroutesController.consumerRegistration = async (req, res, next) => {
    // geocoder.reverse({lat:req.body.latitude, lon:req.body.longitude}, function(err, res) {
    //     console.log(res);
    //     console.log(err);
    //   });
    try {
        let checkEmail = await commonModel.checkmailavailable({ email: req.body.email });
        let checkEmailDelete = await commonModel.selectAllWhere('agent', { email: req.body.email, status: 2 })
        if (checkEmailDelete.length) {
            await commonModel.update('agent', { status: 6 }, { email: req.body.email })
        }

        if (checkEmail.length != 0) {
            return res.json({ status: false, msg: 'Email is already exists' });
        } else {
            var fname = req.body.name.split(' ')[0];
            var lname = req.body.name.split(' ')[1] != undefined ? req.body.name.split(' ')[1] : '';
            var InData = {
                first_name: fname,
                last_name: lname,
                email: req.body.email,
                mobile: req.body.mobile,
                // password  : await bcryptjs.hash(req.body.password, 10),
                //  password  : md5(req.body.password),
                password: cryptr.encrypt(req.body.password),
                user_type: 4,
                status: 0,
                isEmailVerify: create_UUID(),
            }
            req.body.isEmailVerify = InData.isEmailVerify;
            await commonModel.insert('agent', InData);
            var responseEmail = await mail.PublicUserRegistration(req.body)
            // var responseEmailAdmin = await mail.sendMailToPublicRegistration(req.body)
            if (responseEmail == true) {
                return res.json({ status: true, msg: 'Public User Registered Successfully' });
            } else {
                return res.json({ status: true, msg: 'Public User Registered Successfully But Verification Link Has Not Been Sent To Your Email , Please Contact admin' });
            }
        }

    } catch (err) {
        console.log(err)
        return res.json({ status: false, msg: 'Something Went Wrong In Api' });
    }
}


// webroutesController.verifyUserAccount = async (req, res, next) => {
//    try {
//        console.log(req.params,'prams')
//         let checkEmail = await commonModel.selectAllWhere('agent',{isEmailVerify:req.params.id});
//         console.log(checkEmail,'checkEmail')
//         // if(checkEmail.length  == 0){
//         //     return res.json({ status: false,msg:'Token is expired' });
//             if(checkEmail.length  == 0){
//                 return res.json({ status: false,msg:'Your account is alreay verified' });   
//         }else{
//             // azhar
//             await commonModel.update('agent',{status:1},{isEmailVerify:req.params.id});

//             // await commonModel.update('agent',{isEmailVerify:'',status:1},{isEmailVerify:req.params.id});
//         return res.json({ status: true, msg: 'Account is verified successfully' });
//         }

//     } catch (err) {
//         console.log(err)
//         return res.json({ status: false, msg:'Something Went Wrong In Api' });
//     }
// }

// Azhar

webroutesController.verifyUserAccount = async (req, res, next) => {
    //2=Account is alreay verified successfully
    //1=Account is verified successfully, first time
    try {
        let checkEmail = await commonModel.selectAllWhere('agent', { isEmailVerify: req.params.id });
        let checkStatus = await commonModel.selectAllWhere("agent", { isEmailVerify: req.params.id, status: 4 });
        if (checkStatus.length) {
            return res.json({ status: false, msg: "Admin denied your realtor account request", data: 3 })
        }

        let checkEmailData = await commonModel.selectAllWhere('agent', { isEmailVerify: req.params.id, status: 1 });
        if (checkEmailData.length) {
            return res.json({ status: true, msg: 'Account is already verified successfully', data: 2, Userdata: checkEmail });
        }
        if (checkEmail.length == 0) {
            return res.json({ status: false, msg: 'Token is invalid' });
        } else {
            // azhar
            await commonModel.update('agent', { status: 1 }, { isEmailVerify: req.params.id });
            let userResponse = checkEmail[0]
            let mailData = {
                name: userResponse.first_name || userResponse.last_name 
                    ? `${userResponse.first_name} ${userResponse.last_name}`.trim() 
                    : '',
                mobile: userResponse.mobile,
                email: userResponse.email
            };
            await mail.sendMailToPublicRegistration(mailData)
            // await commonModel.update('agent',{isEmailVerify:'',status:1},{isEmailVerify:req.params.id});
            return res.json({ status: true, msg: 'Account is verified successfully', data: 1, Userdata: checkEmail });
        }

    } catch (err) {
        console.log(err)
        return res.json({ status: false, msg: 'Something Went Wrong In Api' });
    }
}

webroutesController.verifyRealtor = async (req, res, next) => {
    try {
        let result = await commonModel.selectAllWhere('agent', { id: req.params.id });
        let permanentDelete = await commonModel.update('agent', { status: 4 }, { id: req.params.id });
        res.redirect(`${process.env.verifyAdmin}`);
        //  return res.json({ status: true, msg: 'permanentDelete',data: result });
    }
    catch (err) {
        console.log(err)
        return res.json({ status: false, msg: 'Something Went Wrong In Api' });
    }
}
webroutesController.RealtorSignup = async (req, res, next) => {
    try {
        delete req.body.profile_img;
        if (req.file) req.body.profile_img = req.file.filename;

        let checkEmail = await commonModel.checkmailavailable({ email: req.body.email });

        let checkEmailDelete = await commonModel.selectAllWhere('agent', { email: req.body.email, status: 2 })
        if (checkEmailDelete.length) {
            await commonModel.update('agent', { status: 6 }, { email: req.body.email })
        }
        if (checkEmail.length != 0) {
            return res.json({ status: false, msg: 'Email is already exists' });
        } else {
            let getLastAgentEntry = await commonModel.getLastAgentEntry('agent');
            let string = "" + getLastAgentEntry[0].id;
            let pad = "000000";
            let n = new Date().getFullYear() + pad.substring(0, pad.length - string.length) + string;

            var InData = {
                first_name: req.body.first_name,
                last_name: req.body.last_name == 'undefined' ? '' : req.body.last_name,
                email: req.body.email,
                mobile: req.body.mobile,
                password: cryptr.encrypt(req.body.password),
                user_type: 3,
                status: 0,
                isEmailVerify: create_UUID(),
                address: req.body.office_address,
                latitude: req.body.latitude,
                longitude: req.body.longitude,
                BrokerageStreetAddress: req.body.office_address,
                brokerPhoneNo: req.body.brokerage_phone,
                brokerageName: req.body.brokerageName,
                shortBio: req.body.shortBio,
                bio: req.body.longBio,
                website: req.body.website,
                textNo: req.body.textNo,
                title: req.body.title,
                BrokerageCity: req.body.BrokerageCity,
                BrokerageProvince: req.body.BrokerageProvince,
                BrokeragePostalCode: req.body.BrokeragePostalCode,
                facebook: req.body.facebook,
                whatsapp: req.body.whatsapp,
                messenger: req.body.messenger,
                wechat: req.body.wechat,
                account_number: n
            }
            if (!InData.last_name) { delete InData.last_name }
            if (req.file) InData.profile_img = req.body.profile_img;
            req.body.isEmailVerify = InData.isEmailVerify;

            var fsa = [];
            if (req.body.fsa_id) { fsa = req.body.fsa_id.split(","); }
            else fsa = [];
            let checkFSAActive = await commonModel.selectAllWhere("fsa", { id: fsa[0], status: 1 });
            if (checkFSAActive.length == 0) {
                return res.json({ status: 'inactive', msg: 'FSA is inactive!, please choose another FSA' });
            }

            let userInserted = await commonModel.insert('agent', InData);

            if (fsa != undefined) {
                for (var i = 0; i < fsa.length; i++) {
                    //   await commonModel.insert('user_fsa',{address:req.body.office_address,user_id:userInserted.insertId,fsa_id:req.body.fsa[i].id});
                    let res = await commonModel.insert("user_fsa", {
                        address: (await commonModel.selectAllWhere('fsa', { id: fsa[i] }))[0].nieghborhood,
                        user_id: userInserted.insertId,
                        fsa_id: fsa[i],
                        user_fsa_no: i + 1
                    });
                }
            }
            req.body.id = userInserted.insertId;
            req.body.name = `${req.body.first_name}${' '}${req.body.last_name != undefined && req.body.last_name != null && req.body.last_name != 'undefined' ? req.body.last_name : ''}`
            var responseEmail = await mail.RealtorRegistration(req.body);
            // await mail.sendMailToAdminForRealtorSignUp(req.body)

            if (responseEmail == true) {
                return res.json({ status: true, msg: 'Realtor Registered Successfully' });
            } else {
                return res.json({ status: true, msg: 'Realtor Registered Successfully But Verification Link Has Not Been Sent To Your Email , Please Contact admin' });
            }
        }
    }
    catch (err) {
        console.log(err)
        return res.json({ status: false, msg: 'Something Went Wrong In Api' });
    }
}


module.exports = webroutesController;

