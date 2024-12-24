const commonModel = require('../models/commonModel');
const fsaController = function () { };
const resMessage = require('../helpers/res-message');
const mail = require('../helpers/mail');
const fs = require('fs');
const bcryptjs = require('bcryptjs');
var jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const md5 = require('md5');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');



function create_UUID() {
  console.log('.................')
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}


// fsaController.makePayment = async (req, res, next) => {
//    console.log(req.params.id,'idddddddddd')
//   console.log('-------------file----------',req.file)
//   console.log('-------BODy----------------',req.body);
//   try {
//     let is_default=0;
//     let FsaArr = await commonModel.selectAllWhere('user_fsa',{user_id:req.body.id,status:1,activate_status:1});
//     if(FsaArr.length == 0) is_default=0;
//       else is_default=1;
//     var InData = {
//       first_name: req.body.first_name,
//       last_name: req.body.last_name,
//       email: req.body.email,
//       mobile: req.body.mobile,
//       // password: await bcryptjs.hash(req.body.password, 10),
//       // password  : md5(req.body.password),
//       password: cryptr.encrypt(req.body.password),
//       user_type: 2,
//       status: 1,
//       is_default_agent: is_default,
//       address: req.body.address,
//       latitude: req.body.latitude,
//       longitude: req.body.longitude,
//       brokerPhoneNo: req.body.brokerage_phone,
//       brokerageName: req.body.officeName,
//       shownOnMap: req.body.shownOnMap,
//       textNo: req.body.textNo,
//       shortBio: req.body.shortBio,
//       bio: req.body.bio,
//       website: req.body.website,
//       agent_type: 1
//     }
//     let fsaArr = req.body.fsa_id.split(',');
//     console.log(fsaArr, 'fasArra')
//     if (req.file) InData.profile_img = req.file.filename


//     let checkIFDefault = await commonModel.selectAllWhere('user_fsa', { user_id: req.params.id, status: 1, activate_status: 1 });
//     console.log(checkIFDefault, 'stasa')
//     if (checkIFDefault.length > 0) req.body.is_default_agent = 1;




//     await commonModel.update01("agent", req.params.id, InData);
//     await commonModel.update("user_fsa", { status: 2 }, { user_id: req.params.id });
//     for (var k = 0; k < fsaArr.length; k++) {
//       await commonModel.insert("user_fsa", { user_id: req.params.id, 
//         fsa_id: fsaArr[k],
//          activate_status: 1,
//          agent_type:1,
//          address: (await commonModel.selectAllWhere('fsa',{id:fsaArr[k]}))[0].nieghborhood
//          });
//       // await commonModel.insert("user_fsa", { user_id: req.params.id, fsa_id: fsaArr[k], activate_status: 0 });
//     }
//     await mail.sendMailToAgentFieldForm({ public_user_name: req.body.first_name + ' ' + req.body.last_name, public_email: req.body.email });
//     // let resdata = await commonModel.selectAllWhere('agent', { id: req.body.id });
//     // return res.json({ status: true, msg: 'Saved Successfully', data: resdata });

//     await mail.sendMailToAgentFieldForm2({ public_user_name: req.body.first_name + ' ' + req.body.last_name, public_email: req.body.email });
//     let resdata1 = await commonModel.selectAllWhere('agent', { id: req.body.id });
//     return res.json({ status: true, msg: 'Saved Successfully', data: resdata1 });
//   }
//   catch (err) {
//     console.log(err)
//     return res.json({ status: false, msg: 'Something Went Wrong In Api', data: [] });
//   }
// }





fsaController.makePayment = async (req, res, next) => {
  try {
    var InData = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      mobile: req.body.mobile,
      password: cryptr.encrypt(req.body.password),
      address: req.body.address,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      brokerPhoneNo: req.body.brokerage_phone,
      brokerageName: req.body.brokerageName,
      shownOnMap: req.body.shownOnMap,
      textNo: req.body.textNo,
      shortBio: req.body.shortBio,
      bio: req.body.bio,
      website: req.body.website,
    }

    if (req.body.fsa_id != '' && req.body.fsa_id != undefined) { fsaArr = req.body.fsa_id.split(","); }
    else { fsaArr = []; }

    let checkFSAActive = await commonModel.selectAllWhere("fsa", { id: fsaArr[0], status: 1 });
    if (checkFSAActive.length == 0) {
      return res.json({ status: 'inactive', msg: 'FSA is inactive!, please choose another FSA' });
    }

    if (req.file) InData.profile_img = req.file.filename;
    let checkIFDefault = await commonModel.selectAllWhere('user_fsa', { user_id: req.params.id, status: 1, activate_status: 1 });
    if (checkIFDefault.length > 0) req.body.is_default_agent = 1;
    await commonModel.update01("agent", req.params.id, InData);

    let fsatest = await commonModel.DeleteRemainigFSA(fsaArr.toString(), req.params.id);

    for (var k = 0; k < fsaArr.length; k++) {
      if (fsaArr[k]) Available = await commonModel.fsaselect({ fsa_id: fsaArr[k], user_id: req.params.id });
      else Available = [];
      if (Available.length == 0) {
        await commonModel.insert("user_fsa", {
          user_id: req.params.id,
          fsa_id: fsaArr[k],
          activate_status: 0,
          agent_type: 0,
          user_fsa_no: k + 1,
          address: (await commonModel.selectAllWhere('fsa', { id: fsaArr[k] }))[0].nieghborhood,
        });
      }
    }
    let resdata1 = await commonModel.selectAllWhere('agent', { id: req.body.id });
    return res.json({ status: true, msg: 'Saved Successfully', data: resdata1 });
  }
  catch (err) {
    console.log(err)
    return res.json({ status: false, msg: 'Something Went Wrong In Api', data: [] });
  }
}


fsaController.makePaymentClient = async (req, res, next) => {
  try {
    let checkEmail = await commonModel.checkmailavailable({
      email: req.body.email
    });
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
      if (req.body.last_name == undefined || req.body.last_name == 'undefined') req.body.last_name = '';
      var InData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        mobile: req.body.mobile,
        password: cryptr.encrypt(req.body.password),
        user_type: 2,
        status: 0,
        isEmailVerify: create_UUID(),
        address: req.body.address,
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
        account_number: n,
        agent_type: 1,
      }

      var fsaArr = [];
      if (req.body.fsa_id) { fsaArr = req.body.fsa_id.split(","); }
      else fsaArr = [];
      let checkFSAActive = await commonModel.selectAllWhere("fsa", { id: fsaArr[0], status: 1 });
      if (checkFSAActive.length == 0) {
        return res.json({ status: 'inactive', msg: 'FSA is inactive!, please choose another FSA' });
      };

      if (req.file) InData.profile_img = req.file.filename
      req.body.isEmailVerify = InData.isEmailVerify;
      let result = await commonModel.insert("agent", InData);
      if (fsaArr.length != 0) {
        for (var k = 0; k < fsaArr.length; k++) {
          await commonModel.insert("user_fsa", {
            user_id: result.insertId,
            fsa_id: fsaArr[k],
            activate_status: 0,
            agent_type: 1,
            address: (await commonModel.selectAllWhere('fsa', { id: fsaArr[k] }))[0].nieghborhood,
            user_fsa_no: k + 1
          });
        }
      }
      // var responseEmail = await mail.sendMailToClientRegisteration({ public_user_name: req.body.first_name + ' ' + req.body.last_name, public_email: req.body.email, isEmailVerify: req.body.isEmailVerify });
      let resdata = await commonModel.selectAllWhere('agent', { id: req.body.id });
      return res.json({ status: true, msg: 'Saved Successfully', data: resdata, user_id: result.insertId });
    }
  }
  catch (err) {
    console.log(err)
    return res.json({ status: false, msg: 'Something Went Wrong In Api', data: [] });
  }
}


// fsaController.makePaymentClient = async (req, res, next) => {
//   console.log(req.body, 'make payment==>>>')
//   //  console.log(req.body.isEmailVerify,'isEamilClient')
//   //  console.log(create_UUID(),'...............')
//   let varify = create_UUID()
//   console.log(varify, '///////////////')
//   // console.log('-------------file----------',req.file)
//   try {
//     let checkEmail = await commonModel.selectAllWhere('agent', { email: req.body.email });
//     if (checkEmail.length != 0) {
//       return res.json({ status: false, msg: 'Email is already exists' });
//     } else {
//       let getLastAgentEntry = await commonModel.getLastAgentEntry('agent');
//       console.log(getLastAgentEntry, 'getLAstagent====')
//       let string = "" + getLastAgentEntry[0].id;
//       let pad = "000000";
//       let n = new Date().getFullYear() + pad.substring(0, pad.length - string.length) + string;
//       if (req.body.last_name == undefined) req.body.last_name = '';
//       var InData = {
//         first_name: req.body.first_name,
//         last_name: req.body.last_name,
//         email: req.body.email,
//         mobile: req.body.mobile,
//         // password: await bcryptjs.hash(req.body.password, 10),
//         // password  : md5(req.body.password),
//         password: cryptr.encrypt(req.body.password),
//         // password  : md5(req.body.password),
//         account_number : n,
//         user_type: 2,
//         status: 5,
//         isEmailVerify: varify,
//         address: req.body.address,
//         latitude: req.body.latitude,
//         longitude: req.body.longitude,
//         brokerPhoneNo: req.body.brokerage_phone,
//         brokerageName: req.body.officeName,
//         shownOnMap: req.body.shownOnMap,
//         textNo: req.body.textNo,
//         shortBio: req.body.shortBio,
//         bio: req.body.bio,
//         website: req.body.website,
//         agent_type:1
//       }
//       // console.log(InData,'data..............')
//       let fsaArr = req.body.fsa_id.split(',');
//       // console.log(fsaArr,'fasArra')
//       if (req.file) InData.profile_img = req.file.filename

//       req.body.isEmailVerify = InData.isEmailVerify;
//       // console.log(req.body.isEmailVerify,'kkkkkkkkkkkkkkk')
//       let result = await commonModel.insert("agent", InData);
//       // console.log(result,'cliennt payment==')
//       ;
//       // await commonModel.insert("user_fsa", {status:2}, {user_id:req.params.id});
//       // await commonModel.update01("agent", req.params.id, InData);
//       // await commonModel.update("user_fsa", {status:2}, {user_id:req.params.id});
//       for (var k = 0; k < fsaArr.length; k++) {
//         await commonModel.insert("user_fsa", { user_id: result.insertId, 
//           fsa_id: fsaArr[k], 
//           activate_status: 1,
//           agent_type:1,
//           address: (await commonModel.selectAllWhere('fsa',{id:fsaArr[k]}))[0].nieghborhood,
//         });
//               //  await commonModel.insert("user_fsa", { user_id: result.insertId, fsa_id: fsaArr[k], activate_status: 0 });
//       }
//       var responseEmail = await mail.sendMailToClientRegisteration({ public_user_name: req.body.first_name + ' ' + req.body.last_name, public_email: req.body.email, isEmailVerify: req.body.isEmailVerify });
//       //  console.log(responseEmail,'resemail===>')
//       let resdata = await commonModel.selectAllWhere('agent', { id: req.body.id });
//       return res.json({ status: true, msg: 'Saved Successfully', data: resdata, user_id: result.insertId });
//     }
//   }
//   catch (err) {
//     console.log(err)
//     return res.json({ status: false, msg: 'Something Went Wrong In Api', data: [] });
//   }
// }


// ****************************09-02-2022*****************************************

// fsaController.makePaymentClient = async (req, res, next) => {
//   console.log(req.body, 'make payment==>>>')
//   let varify = create_UUID()
//   console.log(varify, '///////////////')
//   try {
//     let checkEmail = await commonModel.checkmailavailable({
//       email: req.body.email
//     });
//     let checkEmailDelete = await commonModel.selectAllWhere('agent',{email: req.body.email,status: 2})
//     if(checkEmailDelete.length){
//         await commonModel.update('agent',{status:6},{email: req.body.email})
//     }
//     // 07/12/21
//     // let checkEmail = await commonModel.selectAllWhere('agent', { email: req.body.email });
//     if (checkEmail.length != 0) {
//       return res.json({ status: false, msg: 'Email is already exists' });
//     } else {
//       let getLastAgentEntry = await commonModel.getLastAgentEntry('agent');
//       console.log(getLastAgentEntry, 'getLAstagent====')
//       let string = "" + getLastAgentEntry[0].id;
//       let pad = "000000";
//       let n = new Date().getFullYear() + pad.substring(0, pad.length - string.length) + string;
//       if (req.body.last_name == undefined || req.body.last_name == 'undefined') req.body.last_name = '';
//       var InData = {
//         first_name: req.body.first_name,
//         last_name: req.body.last_name,
//         email: req.body.email,
//         mobile: req.body.mobile,        
//         password: cryptr.encrypt(req.body.password),     
//         account_number : n,
//         user_type: 2,
//         status: 5,
//         isEmailVerify: varify,
//         address: req.body.address,
//         latitude: req.body.latitude,
//         longitude: req.body.longitude,
//         brokerPhoneNo: req.body.brokerage_phone,
//         brokerageName: req.body.officeName,
//         shownOnMap: req.body.shownOnMap,
//         textNo: req.body.textNo,
//         shortBio: req.body.shortBio,
//         bio: req.body.bio,
//         website: req.body.website,
//         agent_type:1
//       }    
//       let fsaArr = req.body.fsa_id.split(',');   
//       if (req.file) InData.profile_img = req.file.filename
//       req.body.isEmailVerify = InData.isEmailVerify;   
//       let result = await commonModel.insert("agent", InData);
//       for (var k = 0; k < fsaArr.length; k++) {
//         await commonModel.insert("user_fsa", { user_id: result.insertId, 
//           fsa_id: fsaArr[k], 
//           activate_status: 0,
//           agent_type:1,
//           address: (await commonModel.selectAllWhere('fsa',{id:fsaArr[k]}))[0].nieghborhood,
//         });           
//       }
//       var responseEmail = await mail.sendMailToClientRegisteration({ public_user_name: req.body.first_name + ' ' + req.body.last_name, public_email: req.body.email, isEmailVerify: req.body.isEmailVerify });
//       let resdata = await commonModel.selectAllWhere('agent', { id: req.body.id });
//       return res.json({ status: true, msg: 'Saved Successfully', data: resdata, user_id: result.insertId });
//     }
//   }
//   catch (err) {
//     console.log(err)
//     return res.json({ status: false, msg: 'Something Went Wrong In Api', data: [] });
//   }
// }
// ****************************09-02-2022*****************************************


module.exports = fsaController;

