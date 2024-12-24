const commonModel = require("../models/commonModel");
// const myProgramModel = require('../models/myProgramModel');
const webroutesController = function () { };
const resMessage = require("../helpers/res-message");
const mail = require("../helpers/mail");
const fs = require("fs");
const bcryptjs = require("bcryptjs");
var jwt = require("jsonwebtoken");
var NodeGeocoder = require("node-geocoder");
var sms = require("../helpers/sms");
const moment = require("moment");
const cron = require('node-cron');
const { selectAll } = require("../models/commonModel");

function create_UUID() {
  var dt = new Date().getTime();
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
}

// *******************************NODE CRON RUN AFTER 24 HOURS WHEN AGENTS ACCEPTED REQUEST START*************************************************************


// cron.schedule('* * * * *', async function () {
cron.schedule('*/15 * * * *', async function () {
  let result = await commonModel.acceptedRequestWithDate();
  if (result.length) {
    for (let i = 0; i < result.length; i++) {
      const current_date = new Date();
      const accept_date = new Date(result[i].accepted_date);
      accept_date.setDate(accept_date.getDate() + 1);
      if (current_date >= accept_date) {
        var agentRequestData = await commonModel.selectAllWhere('request', { id: result[i].id });
        let userData = await commonModel.selectAllWhere('agent', { id: agentRequestData[0].user_id });
        let agentData = await commonModel.selectAllWhere('agent', { id: agentRequestData[0].agent_id });
        let emailData = {
          referred_agent_name: agentData[0].first_name + ' ' + (agentData[0].last_name != '' && agentData[0].last_name != 'undefined' && agentData[0].last_name != undefined && agentData[0].last_name != null && agentData[0].last_name != 'null' ? agentData[0].last_name : ''),
          referred_client_name: userData[0].first_name + ' ' + (userData[0].last_name != '' && userData[0].last_name != 'undefined' && userData[0].last_name != undefined && userData[0].last_name != null && userData[0].last_name != 'null' ? userData[0].last_name : ''),
          referred_agent_email: agentData[0].email
        }
        await mail.MailToAgentAfter24HourAccepted(emailData);
        await commonModel.update("request", { is_email_sent: 1 }, { id: result[i].id });
      }
    }
  }
});

// *****************************NODE CRON RUN AFTER 24 HOURS WHEN AGENTS ACCEPTED REQUEST END***************************************************************

// NODE CRON RUN Agent Quits or does not respond to a referral email START //

cron.schedule('0 0 * * *', async function () {

  let result = await commonModel.sendLinkCheck();

  if (result.length) {
    for (let i = 0; i < result.length; i++) {
      const current_date = new Date();
      const sendLinkDate = new Date(result[i].sendLink_date);

      sendLinkDate.setDate(sendLinkDate.getDate() + 14);

      if (current_date > sendLinkDate) {
        let userData = await commonModel.selectAllWhere('agent', { id: result[i].id });
        let emailData = {
          agent_name: userData[0].first_name + ' ' + (userData[0].last_name != '' && userData[0].last_name != 'undefined' && userData[0].last_name != undefined && userData[0].last_name != null && userData[0].last_name != 'null' ? userData[0].last_name : ''),
          referred_agent_email: userData[0].email
        }
        await mail.MailToAdminDoesNotRespondAgent(emailData);
        await commonModel.update("agent", { sendLinkEdit_respond: 1 }, { id: userData[0].id });
      }
    }
  }
});

// NODE CRON RUN Agent Quits or does not respond to a referral email END //

webroutesController.Sendlink = async (req, res, next) => {
  try {
    let Data = await commonModel.sendlink("agent", { id: req.body.id },);
    commonModel.update01("agent", req.body.id, { status: 0, is_default_agent: 0 })
    commonModel.update01("user_fsa", req.body.id, { status: 1, activate_status: 0 })
    let fsa = await commonModel.selectFSAIdFromAgentFsaTable(Data[0].id);
    var FSAs = await commonModel.selectFSACodeForEmail(fsa[0].fsa_ids);
    var arr = [];
    for (var i = 0; i < FSAs.length; i++) {
      arr.push(FSAs[i].fsa_code + ' - ' + FSAs[i].nieghborhood);
    }
    if (req.body.profile == 'view') {
      mail.sendlinkMail_view({
        name: Data[0].first_name + ' ' + (Data[0].last_name != '' && Data[0].last_name != 'undefined' && Data[0].last_name != undefined && Data[0].last_name != null && Data[0].last_name != 'null' ? Data[0].last_name : ''),
        Phone: Data[0].mobile,
        text: Data[0].textNo,
        email: Data[0].email,
        brokerage_name: Data[0].brokerageName,
        brokerageStreetAddress: Data[0].BrokerageStreetAddress,
        brokerage_City: Data[0].BrokerageCity,
        brokerage_Prov: Data[0].BrokerageProvince,
        brokerage_Postal_Code: Data[0].BrokeragePostalCode,
        brokerage_Phone: Data[0].brokerPhoneNo,
        photo: Data[0].profile_img,
        website: Data[0].website,
        short_bio: Data[0].shortBio,
        long_bio: Data[0].bio,
        id: req.body.id,
        FSAs: arr
      });
    }
    if (req.body.profile == 'edit') {
      var today = new Date();
      var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var sendLink_date = date + ' ' + time

      commonModel.update01("agent", req.body.id, { sendLink_date: sendLink_date })

      mail.sendlinkMail_edit({
        name: Data[0].first_name + ' ' + (Data[0].last_name != '' && Data[0].last_name != 'undefined' && Data[0].last_name != undefined && Data[0].last_name != null && Data[0].last_name != 'null' ? Data[0].last_name : ''),
        Phone: Data[0].mobile,
        text: Data[0].textNo,
        email: Data[0].email,
        brokerage_name: Data[0].brokerageName,
        brokerageStreetAddress: Data[0].BrokerageStreetAddress,
        brokerage_City: Data[0].BrokerageCity,
        brokerage_Prov: Data[0].BrokerageProvince,
        brokerage_Postal_Code: Data[0].BrokeragePostalCode,
        brokerage_Phone: Data[0].brokerPhoneNo,
        photo: Data[0].profile_img,
        website: Data[0].website,
        short_bio: Data[0].shortBio,
        long_bio: Data[0].bio,
        id: req.body.id,
        FSAs: arr
      });
    }
    return res.json({ status: true, msg: "Link Sent Successfully!" });
  } catch (err) {
    console.log(err);
    return res.json({ status: false, msg: "Failed" });
  }
};

webroutesController.createRequestForSubagent = async (req, res, next) => {
  try {

    // let checkEmail = await commonModel.selectAllWhere('request',{user_id:req.body.user_id,agent_id:req.body.agent_id});
    // if(checkEmail.length  != 0){
    //     return res.json({ status: false,msg:'Request already exists' });
    // }else
    // delete phone_code
    // req.body.fsa = req.body.fsa.toString();
    delete req.body.office_address;

    // req.body.fsa = req.body.fsa.map((e) => e.id);
    var FSAs = [];
    if(req.body.fsa) FSAs = await commonModel.selectFSACodeForEmail1(req.body.fsa);
    else FSAs = [];
    if(FSAs.length  == 0){
    return res.json({ status: false, msg:'FSA is inactive !' });}

    req.body.fsa = req.body.fsa.toString();
    let reqRes = await commonModel.insert("request", req.body);
    var agentData = await commonModel.selectAllWhere("agent", {
      id: req.body.agent_id,
    });
    var adminData = await commonModel.selectAllWhere("agent", { id: 1 });

    var arr = [];
    for (var i = 0; i < FSAs.length; i++) {
      arr.push(FSAs[i].fsa_code + '-' + FSAs[i].nieghborhood);
    }
    var arrfsa = [];
    for (var i = 0; i < FSAs.length; i++) {
      arrfsa.push(FSAs[i].fsa_code);
    }
    var arrNieghborhood = [];
    for (var i = 0; i < FSAs.length; i++) {
      arrNieghborhood.push(FSAs[i].nieghborhood);
    }
    await mail.sendMailAdminForRequest({
      email: adminData[0].email,
      name: req.body.name,
      agent_name: agentData[0].first_name + " " + (agentData[0].last_name != undefined && agentData[0].last_name != 'undefined' && agentData[0].last_name != null && agentData[0].last_name != 'null' ? agentData[0].last_name : ''),
      email: req.body.email,
      phone: req.body.phone,
      arrfsa: arrfsa.toString(),
      nieghborhood: arrNieghborhood.toString(),
      phone_agent: agentData[0].mobile,
      agent_email: agentData[0].email,

    });
    await mail.sendMailClientForRequest({
      agent_phone: agentData[0].mobile,
      agent_email: agentData[0].email,
      agent_name: agentData[0].first_name + " " + (agentData[0].last_name != undefined && agentData[0].last_name != 'undefined' && agentData[0].last_name != null && agentData[0].last_name != 'null' ? agentData[0].last_name : ''),
      name: req.body.name,
      message: req.body.message,
      phone: req.body.phone,
      fsa: arr.toString(),
      email: req.body.email,
    });
    console.log(req.body.agent_id.split('/'))
    await mail.CreateRequest({
      req_id: reqRes.insertId,
      agent_id: req.body.agent_id,
      unsubscribe_agent: req.body.agent_id.split('/')[0],
      arrfsa: arrfsa.toString(),
      nieghborhood: arrNieghborhood.toString(),
      name: req.body.name,
      neighborhood: req.body.nieghborhood,
      agent_email: agentData[0].email,
      agent_name: agentData[0].first_name + " " + (agentData[0].last_name != undefined && agentData[0].last_name != 'undefined' && agentData[0].last_name != null && agentData[0].last_name != 'null' ? agentData[0].last_name : ''),
    });
    return res.json({ status: true, msg: "Request Sent Successfully" });
  } catch (err) {
    console.log(err);
    return res.json({ status: false, msg: "Something Went Wrong In Api" });
  }
};

webroutesController.sendRequestFromAdmin = async (req, res, next) => {
  try {
    let agentData = await commonModel.selectAllWhere("agent", { email: req.body.new_agent_email });
    let userData = await commonModel.selectAllWhere("agent", { email: req.body.new_agent_email });

    if (agentData.length != 0) {

      let data = {
        user_id: req.body.public_user_id,
        agent_id: agentData[0].id,
        email: req.body.public_user_email,
        phone: userData[0].mobile,
        status: 0,
        message: req.body.message,
        name: req.body.public_user_name,
        fsa: req.body.fsa_id
      }
      let reqRes = await commonModel.insert("request", data);

      let data3 = {
        agent_name: req.body.new_agent_first_name + (req.body.new_agent_last_name ? (' ' + req.body.new_agent_last_name) : ''),
        agent_email: agentData[0].email,
        req_id: reqRes.insertId,
        fsa_naboure: req.body.fsa_nieghborhood,
        fsa_code: req.body.fsa_code
      }
      let part1 = await commonModel.insert("user_fsa", {
        address: req.body.fsa_nieghborhood,// nabourhoodname
        user_id: agentData[0].id, // new agent id 
        fsa_id: req.body.fsa_id,
        agent_type: 0
      });

      mail.sendMailToAgentforReferral(data3);
      let userdata = {
        user_name: req.body.public_user_name,
        user_email: req.body.public_user_email,
        old_agent_name: `${req.body.old_agent_F_name}${req.body.old_agent_L_name ? ` ${req.body.old_agent_L_name}` : ''}`,
        new_agent_name: `${req.body.new_agent_first_name}${req.body.new_agent_last_name ? ` ${req.body.new_agent_last_name}` : ''}`,
        old_agent_email:req.body.old_agent_email,
        old_agent_mobile:req.body.old_agent_mobile
      };      
      mail.sendMailToUserforReferral(userdata);

    } else {
      let data = {
        first_name: req.body.new_agent_first_name,
        last_name: req.body.new_agent_last_name ? req.body.new_agent_last_name : '',
        email: req.body.new_agent_email,
        // mobile: req.body.phone,
        user_type: 3,
      }
      let userInserted = await commonModel.insert('agent', data);

      let part1 = await commonModel.insert("user_fsa", {
        address: req.body.fsa_nieghborhood,// nabourhoodname
        user_id: userInserted.insertId,
        fsa_id: req.body.fsa_id,
        agent_type: 0
      });

      let data2 = {
        user_id: req.body.public_user_id,
        agent_id: userInserted.insertId,
        email: req.body.public_user_email,
        status: 0,
        message: req.body.message,
        name: req.body.public_user_name,
        fsa: req.body.fsa_id
      }

      let reqRes = await commonModel.insert("request", data2);

      let data3 = {
        agent_id: userInserted.insertId,
        agent_email: req.body.new_agent_email,
        agent_name: req.body.new_agent_first_name + (req.body.new_agent_last_name ? (' ' + req.body.new_agent_last_name) : ''),
        req_id: reqRes.insertId,
        fsa_naboure: req.body.fsa_nieghborhood,
        fsa_code: req.body.fsa_code
      }
      mail.sendMailToAgentforReferral(data3);
      mail.sendMailToAgentIfNotexist2(data3);
      let userdata = {
        user_name: req.body.public_user_name,
        user_email: req.body.public_user_email,
        old_agent_name: `${req.body.old_agent_F_name}${req.body.old_agent_L_name ? ` ${req.body.old_agent_L_name}` : ''}`,
        new_agent_name: `${req.body.new_agent_first_name}${req.body.new_agent_last_name ? ` ${req.body.new_agent_last_name}` : ''}`,
        old_agent_email:req.body.old_agent_email,
        old_agent_mobile:req.body.old_agent_mobile
      };
      mail.sendMailToUserforReferral(userdata);
    }

    return res.json({ status: true, msg: "Request Sent Successfully" });
  }
  catch (err) {
    console.log(err);
    return res.json({ status: false, msg: "Something Went Wrong In Api" });
  }
}




// webroutesController.sendRequestFromAdmin = async (req, res, next) => {
//   try {
//     let agentData = await commonModel.selectAllWhere("agent", { email: req.body.new_agent_email, });
//     if (agentData.length != 0) { // exist

//       let pending_request = await commonModel.selectreqWhere(req.body.public_user_id, agentData[0].id, req.body.fsa_id);
//       if (pending_request.length) {
//         if (pending_request[0].status == 0) {
//           return res.json({ status: false, msg: "The agent has a pending request with same FSA" });
//         }
//       }
//       // ----done

//       let data = {
//         user_id: req.body.public_user_id,
//         agent_id: agentData[0].id,
//         email: req.body.public_user_email,
//         status: 0,
//         message: req.body.message,
//         name: req.body.public_user_name,
//         fsa: req.body.fsa_id
//       }
//       let reqRes = await commonModel.insert("request", data);

//       // ----done
//       let data3 = {
//         agent_name: req.body.new_agent_first_name + (req.body.last_name ? (' ' + req.body.last_name) : ''),
//         agent_email: agentData[0].email,
//         req_id: reqRes.insertId,
//         fsa_naboure: req.body.fsa_nieghborhood,
//         fsa_code: req.body.fsa_code
//       }
//       mail.sendMailToAgentforReferral(data3);

//       // ----done
//       let userdata = {
//         user_name: req.body.public_user_name,
//         user_email: req.body.public_user_email,
//         old_agent_name: req.body.old_agent_F_name + (req.body.old_agent_L_name ? ' ' + req.body.old_agent_L_name : ''),
//         new_agent_name: req.body.new_agent_first_name + (req.body.new_agent_last_name ? ' ' + req.body.new_agent_last_name : '')
//       }
//       // mail.sendMailToUserforReferral(userdata);

//       // ----done

//       let part1 = await commonModel.insert("user_fsa", {
//         address: req.body.fsa_nieghborhood,// nabourhoodname
//         user_id: agentData[0].id, // new agent id 
//         fsa_id: req.body.fsa_id,
//         agent_type: 0
//       });

//     }
//     else {
//       let data = {
//         first_name: req.body.new_agent_first_name,
//         last_name: req.body.new_agent_last_name ? req.body.new_agent_last_name : '',
//         email: req.body.new_agent_email,
//         // mobile: req.body.phone,
//         user_type: 3,
//       }
//       let userInserted = await commonModel.insert('agent', data);
//       // ----done

//       let part1 = await commonModel.insert("user_fsa", {
//         address: req.body.fsa_nieghborhood,// nabourhoodname
//         user_id: userInserted.insertId,
//         fsa_id: req.body.fsa_id,
//         agent_type: 0
//       });

//       let data2 = {
//         user_id: req.body.public_user_id,
//         agent_id: userInserted.insertId,
//         email: req.body.public_user_email,
//         status: 0,
//         message: req.body.message,
//         name: req.body.public_user_name,
//         fsa: req.body.fsa_id
//       }

//       let reqRes = await commonModel.insert("request", data2);

//       let data3 = {
//         agent_id: userInserted.insertId,
//         agent_email: req.body.new_agent_email,
//         agent_name: req.body.new_agent_first_name + (req.body.new_agent_last_name ? (' ' + req.body.new_agent_last_name) : ''),
//         req_id: reqRes.insertId,
//         fsa_naboure: req.body.fsa_nieghborhood,
//         fsa_code: req.body.fsa_code
//       }
//       mail.sendMailToAgentforReferral(data3);
//       mail.sendMailToAgentIfNotexist2(data3);


//       let userdata = {
//         user_name: req.body.public_user_name,
//         user_email: req.body.public_user_email,
//         old_agent_name: req.body.old_agent_F_name + (req.body.old_agent_L_name ? ' ' + req.body.old_agent_L_name : ''),
//         new_agent_name: req.body.new_agent_first_name + (req.body.new_agent_last_name ? ' ' + req.body.new_agent_last_name : '')
//       }
//       // mail.sendMailToUserforReferral(userdata);

//     }
//     // console.log(agentData, "===========agentData");
//     // var adminData = await commonModel.selectAllWhere("agent", { id: 1 });

//     // var FSAs = await commonModel.selectFSACodeForEmail(req.body.fsa);
//     // // console.log(FSAs, "fasName");
//     // var arr = [];
//     // for (var i = 0; i < FSAs.length; i++) {
//     //   arr.push(FSAs[i].fsa_code + '-' + FSAs[i].nieghborhood);
//     // }
//     // var arrfsa = [];
//     // for (var i = 0; i < FSAs.length; i++) {
//     //   arrfsa.push(FSAs[i].fsa_code);
//     // }
//     // var arrNieghborhood = [];
//     // for (var i = 0; i < FSAs.length; i++) {
//     //   arrNieghborhood.push(FSAs[i].nieghborhood);
//     // }
//     //  // console.log(arr,'aaaaaaaaaarrrrrrrrrrr')
//     // await mail.sendMailAdminForRequest({
//     //   email: adminData[0].email,
//     //   name: req.body.name,
//     //   agent_name: agentData[0].first_name + " " + (agentData[0].last_name != undefined && agentData[0].last_name != 'undefined' && agentData[0].last_name != null && agentData[0].last_name != 'null' ? agentData[0].last_name : ''),
//     //   email: req.body.email,
//     //   phone: req.body.phone,
//     //   arrfsa: arrfsa.toString(),
//     //   nieghborhood: arrNieghborhood.toString(),
//     //   phone_agent: agentData[0].mobile,
//     //   agent_email: agentData[0].email,

//     // });
//     // await mail.sendMailClientForRequest({
//     //   agent_phone: agentData[0].mobile,
//     //   agent_email: agentData[0].email,
//     //   agent_name: agentData[0].first_name + " " + (agentData[0].last_name != undefined && agentData[0].last_name != 'undefined' && agentData[0].last_name != null && agentData[0].last_name != 'null' ? agentData[0].last_name : ''),
//     //   name: req.body.name,
//     //   message: req.body.message,
//     //   phone: req.body.phone,
//     //   fsa: arr.toString(),
//     //   email: req.body.email,
//     // });
//     // console.log(req.body.agent_id.split('/'))
//     // await mail.CreateRequest({
//     //   req_id: reqRes.insertId,
//     //   agent_id: req.body.agent_id,
//     //   unsubscribe_agent: req.body.agent_id.split('/')[0],
//     //   arrfsa: arrfsa.toString(),
//     //   nieghborhood: arrNieghborhood.toString(),
//     //   name: req.body.name,
//     //   neighborhood: req.body.nieghborhood,
//     //   agent_email: agentData[0].email,
//     //   agent_name: agentData[0].first_name + " " + (agentData[0].last_name != undefined && agentData[0].last_name != 'undefined' && agentData[0].last_name != null && agentData[0].last_name != 'null' ? agentData[0].last_name : ''),
//     // });
//     return res.json({ status: true, msg: "Request Sent Successfully" });
//   } catch (err) {
//     console.log(err);
//     return res.json({ status: false, msg: "Something Went Wrong In Api" });
//   }
// }


// webroutesController.getRequestByAgent = async (req, res, next) => {
//   try {
//     let data = await commonModel.getRequestByAgent(
//       req.body.agent_id,
//       req.body.status
//     );
//     for (let x of data) {
//       x.profile_img = process.env.image_path + x.profile_img;
//     }
//     return res.json({ status: true, data: data });
//   } catch (err) {
//     console.log(err);
//     return res.json({ status: false, data: [] });
//   }
// };
webroutesController.getRequestByAgent = async (req, res, next) => {
  try {
    let data = await commonModel.getRequestByAgent(
      req.body.agent_id,
      req.body.status
    );
    // let data01 = await commonModel.getRequestByAgentRefer(
    //   req.body.agent_id,
    //   req.body.status
    // );
    // console.log(data01, 'dataaududduu')
    // if (data01.length) data = data01;
    for (let x of data) {
      x.profile_img = process.env.image_path + x.profile_img;
    }
    return res.json({ status: true, data: data });
  } catch (err) {
    console.log(err);
    return res.json({ status: false, data: [] });
  }
};


// webroutesController.getReferRequest = async (req, res, next) => {
//   try {
//     let data = await commonModel.getReferRequest(
//       req.body.agent_id,
//       req.body.refer_client
//       // req.body.status,
//     );
//     if (data.length) {
//       let refering_data = await commonModel.selectAllWhere('agent', { id: data[0].referring_agent_id })
//       if (refering_data.length) data[0].referringAgent = refering_data
//       for (let x of data) {
//         x.profile_img = process.env.image_path + x.profile_img;
//       }
//     }
//     return res.json({ status: true, data: data });
//   } catch (err) {
//     console.log(err);
//     return res.json({ status: false, data: [] });
//   }
// }; // [16-11-22]

webroutesController.getReferRequest = async (req, res, next) => {
  try {
    let data = await commonModel.getReferRequest(
      req.body.agent_id,
      req.body.refer_client
    );
    if (data.length) {
      for (let i = 0; i < data.length; i++) {
        let refering_data = await commonModel.selectAllWhere('agent', { id: data[i].referring_agent_id })
        if (refering_data.length) data[i].referringAgent = refering_data[0];
        let receiving_data = await commonModel.selectAllWhere('agent', { id: data[i].agent_id })
        receiving_data[0].name = receiving_data[0].first_name + (receiving_data[0].last_name != undefined && receiving_data[0].last_name != null && receiving_data[0].last_name != 'undefined' && receiving_data[0].last_name != 'null' && receiving_data[0].last_name != '' ? ' ' + receiving_data[0].last_name : '');
        if (receiving_data.length) data[i].receivingAgent = receiving_data[0];

        data[i].fsaData = await commonModel.selectWhereIn("fsa", "id", data[i].fsa);

      }
      for (let x of data) {
        x.profile_img = process.env.image_path + x.profile_img;
        x.receivingAgent.profile_img = process.env.image_path + x.receivingAgent.profile_img;
      }
    }
    return res.json({ status: true, data: data });
  } catch (err) {
    console.log(err);
    return res.json({ status: false, data: [] });
  }
};


webroutesController.GetUserRequest = async (req, res, next) => {

  try {
    let data = await commonModel.GetUserRequest(
      req.body.user_id,
      req.body.status
    );
    for (let x of data) {
      x.profile_img = process.env.image_path + x.profile_img;
      x.AgentFSA = await commonModel.getFSALocation(x.fsa);
    }
    return res.json({ status: true, data: data });
  } catch (err) {
    console.log(err);
    return res.json({ status: false, data: [] });
  }
};
webroutesController.getRequestDetails = async (req, res, next) => {
  try {
    let data = await commonModel.selectAllWhere("request", {
      token: req.body.token,
    });
    // console.log('------------------', data[0].fsa);
    data[0].fsaData = await commonModel.selectWhereIn("fsa", "id", data[0].fsa);
    return res.json({ status: true, data: data });
  } catch (err) {
    console.log(err);
    return res.json({ status: false, data: [] });
  }
};
webroutesController.getRequestDetailss = async (req, res, next) => {
  try {
    let data = await commonModel.selectAllWhere("request", { id: req.body.id });
    // console.log('------------------', data[0].fsa);
    data[0].fsaData = await commonModel.selectWhereIn("fsa", "id", data[0].fsa);
    return res.json({ status: true, data: data });
  } catch (err) {
    console.log(err);
    return res.json({ status: false, data: [] });
  }
};

// webroutesController.changeRequestStatus = async (req, res, next) => {
//   try {
//     let requestData = await commonModel.selectAllWhere("request", {
//       id: req.body.id,
//     });
//     var FSAs = await commonModel.selectFSACodeForEmail(requestData[0].fsa);
//     var arr = [];
//     for (var i = 0; i < FSAs.length; i++) {
//       arr.push(FSAs[i].fsa_code + '-' + FSAs[i].nieghborhood);
//     }

//     if (req.body.type == 2) {
//       await commonModel.update(
//         "request",
//         { status: req.body.type },
//         { id: req.body.id }
//       );
//       var agentData = await commonModel.selectAllWhere("agent", {
//         id: req.body.agent_id,
//       });
//       await mail.cancleRequestMail({
//         public_user_name: requestData[0].name,
//         public_email: requestData[0].email,
//         agent_name: agentData[0].first_name + " " + (agentData[0].last_name != undefined && agentData[0].last_name != 'undefined' && agentData[0].last_name != 'null' && agentData[0].last_name != null ? agentData[0].last_name : ''),
//         agent_phone: agentData[0].mobile,
//         agent_email: agentData[0].email
//       });
//       emailData = {
//         name: agentData[0].first_name + '' + (agentData[0].last_name != undefined && agentData[0].last_name != 'undefined' && agentData[0].last_name != 'null' && agentData[0].last_name != null ? agentData[0].last_name : ''),
//         phone: agentData[0].mobile
//       }

//      let resoptOutmail =  await mail.AgentOptOutSystemGeneratedMailToAdmin(emailData)

//       return res.json({ status: true, msg: "Request Canceled Successfully", request_type: 0 });
//     }
//     if (req.body.type == 1) {
//       var token = create_UUID();
//       await commonModel.update(
//         "request",
//         { status: req.body.type, token: token },
//         { id: req.body.id }
//       );
//       // var agentData = await commonModel.selectAllWhere('agent',{id:req.body.agent_id});
//       // await   mail.acceptRequestMail({fsa:arr.toString(),token:token,public_user_name:requestData[0].name,public_email:requestData[0].email,agent_name:agentData[0].first_name +' '+agentData[0].last_name,agent_phone:agentData[0].mobile,agent_email : agentData[0].email })
//       var agentData = await commonModel.selectAllWhere("agent", {
//         id: req.body.agent_id,
//       });
//       await mail.acceptRequestMailNew({
//         fsa: arr.toString(),
//         public_user_phone: req.body.phone,
//         token: token,
//         public_user_name: requestData[0].name,
//         public_email: requestData[0].email,
//         agent_name: agentData[0].first_name + " " + (agentData[0].last_name != undefined && agentData[0].last_name != 'undefined' && agentData[0].last_name != 'null' && agentData[0].last_name != null ? agentData[0].last_name : ''),
//         agent_phone: agentData[0].mobile,
//         agent_email: agentData[0].email,
//         agent_brokerageName: agentData[0].brokerageName
//       });
//       // var adminData = await commonModel.selectAllWhere('agent', { id: 1 });
//       await mail.sendMailAdminForRequestAccept({
//         public_user_name: requestData[0].name,
//         public_user_phone: requestData[0].phone,
//         public_email: requestData[0].email,
//         agent_name: agentData[0].first_name + " " + (agentData[0].last_name != undefined && agentData[0].last_name != 'undefined' && agentData[0].last_name != 'null' && agentData[0].last_name != null ? agentData[0].last_name : ''),
//         id: req.body.id,
//       });

//       await mail.sendMailAgentForRequestAccept({
//         public_user_name: requestData[0].name,
//         public_user_phone: requestData[0].phone,
//         public_email: requestData[0].email,
//         agent_name: agentData[0].first_name + " " + (agentData[0].last_name != undefined && agentData[0].last_name != 'undefined' && agentData[0].last_name != 'null' && agentData[0].last_name != null ? agentData[0].last_name : ''),
//         agent_email: agentData[0].email,
//         id: req.body.id,
//       });

//       return res.json({ status: true, msg: "Request Accepted Successfully", request_type: 1 });
//     }
//   } catch (err) {
//     console.log(err);
//     return res.json({ status: false, msg: "Request Canceled Failed" });
//   }
// };


webroutesController.changeRequestStatus = async (req, res, next) => {
  try {
    let requestData = await commonModel.selectAllWhere("request", { id: req.body.id, });
    var FSAs = await commonModel.selectFSACodeForEmail(requestData[0].fsa);
    var arr = [];
    for (var i = 0; i < FSAs.length; i++) { arr.push(FSAs[i].fsa_code + '-' + FSAs[i].nieghborhood); }

    var arrfsa = [];
    for (var i = 0; i < FSAs.length; i++) {
      arrfsa.push(FSAs[i].fsa_code);
    }
    var arrNieghborhood = [];
    for (var i = 0; i < FSAs.length; i++) {
      arrNieghborhood.push(FSAs[i].nieghborhood);
    }


    if (req.body.type == 2) {
      await commonModel.update("request", { status: req.body.type }, { id: req.body.id });
      var agentData = await commonModel.selectAllWhere("agent", { id: req.body.agent_id });
      if (requestData[0].refer_client == 1) { // for referral

        let referring_agent = await commonModel.selectAllWhere("agent", { id: requestData[0].user_id });
        let receiving_agent = agentData

        let emailInfo = {
          client_name: requestData[0].name,
          client_phone: requestData[0].phone,
          client_email: requestData[0].email,
          referring_agent_name: referring_agent[0].first_name + ' ' + (referring_agent[0].last_name != undefined && referring_agent[0].last_name != 'undefined' && referring_agent[0].last_name != 'null' && referring_agent[0].last_name != null ? referring_agent[0].last_name : ''),
          referring_agent_phone: referring_agent[0].mobile,
          referring_agent_email: referring_agent[0].email,
          receiving_agent_name: receiving_agent[0].first_name + ' ' + (receiving_agent[0].last_name != undefined && receiving_agent[0].last_name != 'undefined' && receiving_agent[0].last_name != 'null' && receiving_agent[0].last_name != null ? receiving_agent[0].last_name : ''),
          receiving_agent_email: receiving_agent[0].email,
          receiving_agent_phone: receiving_agent[0].mobile,

        }

        mail.realtorReferralWasDeclinedForAdmin(emailInfo);
        mail.yourReferralWasDeclinedForsenderRealtor(emailInfo);
        return res.json({ status: true, msg: "Request Declined Successfully", request_type: 0 });
      } else { // for request
        await mail.cancleRequestMail({
          public_user_name: requestData[0].name,
          public_email: requestData[0].email,
          agent_name: agentData[0].first_name + " " + (agentData[0].last_name != undefined && agentData[0].last_name != 'undefined' && agentData[0].last_name != 'null' && agentData[0].last_name != null ? agentData[0].last_name : ''),
          agent_phone: agentData[0].mobile,
          agent_email: agentData[0].email
        });
        emailData = {
          name: agentData[0].first_name + ' ' + (agentData[0].last_name != undefined && agentData[0].last_name != 'undefined' && agentData[0].last_name != 'null' && agentData[0].last_name != null ? agentData[0].last_name : ''),
          phone: agentData[0].mobile
        }
        // let resoptOutmail = await mail.AgentOptOutSystemGeneratedMailToAdmin(emailData);

        // ***********************************************************************
        var checkPendingRequest = await commonModel.selectAllWhere("request", { agent_id: req.body.agent_id, status: 0 });
        var fsaId = await commonModel.selectAllWhere("request", { id: req.body.id });
        if (checkPendingRequest.length >= 1 || checkPendingRequest.length == 0) {
          var checkNextAgentOfFSA = await commonModel.selectAllWhere("user_fsa", { fsa_id: fsaId[0].fsa, status: 1 });
          ////////////////////////// ADD FOR preference order START//////////////////////////////
          for (let z = 0; z < checkNextAgentOfFSA.length; z++) {
            let FSACount = await commonModel.fsacountUser(checkNextAgentOfFSA[z].user_id)
            if (FSACount[0].user_id == checkNextAgentOfFSA[z].user_id) {
              checkNextAgentOfFSA[z].totalUserFSA = FSACount[0].totalUserFSA
            }
          }
          checkNextAgentOfFSA.sort((a, b) => b.totalUserFSA - a.totalUserFSA);
          ///////////////////////// ADD FOR preference order END ///////////////////////////////
          var output = [];
          output = checkNextAgentOfFSA.map(s => s.user_id)

          let getDeclinedRequestAgent = await commonModel.selectAllWhere("request", { user_id: fsaId[0].user_id, fsa: fsaId[0].fsa, status: 2, decline_status: 0 });
          var declinedIds = [];
          declinedIds = getDeclinedRequestAgent.map(s => s.agent_id)
          declinedIds = declinedIds.length == 0 ? [0] : declinedIds
          let CheckAgentStatus = await commonModel.checkAgentStatus(output, declinedIds);
          if (CheckAgentStatus.length > 0) {
            var RequestAgentData = await commonModel.selectAllWhere("request", { user_id: fsaId[0].user_id, agent_id: req.body.agent_id, status: 2 });
            let nextAgentData = {
              user_id: RequestAgentData[0].user_id,
              agent_id: CheckAgentStatus[0] ? CheckAgentStatus[0].id : RequestAgentData[0].agent_id,
              parent_id: RequestAgentData[0].id,
              name: RequestAgentData[0].name,
              estate_brokeraege: RequestAgentData[0].estate_brokeraege,
              phone: RequestAgentData[0].phone,
              phone_code: RequestAgentData[0].phone_code,
              brokerage_phone: RequestAgentData[0].brokerage_phone,
              email: RequestAgentData[0].email,
              message: RequestAgentData[0].message,
              office_address: RequestAgentData[0].office_address,
              office_address_lat: RequestAgentData[0].office_address_lat,
              office_address_lng: RequestAgentData[0].office_address_lng,
              fsa: RequestAgentData[0].fsa,
              verifyEmail: RequestAgentData[0].verifyEmail,
              verifyMobile: RequestAgentData[0].verifyMobile,
              token: RequestAgentData[0].token,
              status: 0,
            }
            var reqData = [];
            if (CheckAgentStatus.length != 0) reqData = await commonModel.insert("request", nextAgentData);
            // email of "new request" send to next agent or not // 

            await mail.CreateRequest({
              req_id: reqData.insertId,
              agent_id: nextAgentData.agent_id,
              unsubscribe_agent: nextAgentData.agent_id,
              arrfsa: arrfsa.toString(),
              nieghborhood: arrNieghborhood.toString(),
              agent_email: CheckAgentStatus[0].email,
              agent_name: CheckAgentStatus[0].first_name + " " + (CheckAgentStatus[0].last_name != undefined && CheckAgentStatus[0].last_name != 'undefined' && CheckAgentStatus[0].last_name != null && CheckAgentStatus[0].last_name != 'null' ? CheckAgentStatus[0].last_name : ''),
            });

            return res.json({ status: true, msg: "Request Declined Successfully", request_type: 0 });
          } else {
            await commonModel.update("request", { decline_status: 1 }, { id: req.body.id });

            emailDataOptOut = {
              name: agentData[0].first_name + ' ' + (agentData[0].last_name != undefined && agentData[0].last_name != 'undefined' && agentData[0].last_name != 'null' && agentData[0].last_name != null ? agentData[0].last_name : ''),
              phone: agentData[0].mobile,
              email: agentData[0].email
            }
            let optOutMailRes = await mail.realtorOptOutMailToAdmin(emailDataOptOut);
            return res.json({ status: true, msg: "Request Declined Successfully", request_type: 0 });
          }
        }
        // ***********************************************************************
        return res.json({ status: true, msg: "Request Declined Successfully", request_type: 0 });
      }
    }
    if (req.body.type == 1) {
      var token = create_UUID();

      var today = new Date();
      var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var acceptDate = date + ' ' + time

      let agentData = await commonModel.selectAllWhere("agent", { id: req.body.agent_id });
      if (agentData.length) {
        if (agentData[0].status == 0) {
          return res.json({ status: true, msg: "Please activate account" });
        }
      }

      let reqDetail = await commonModel.update("request", { status: req.body.type, token: token, accepted_date: acceptDate }, { id: req.body.id });

      // var agentData = await commonModel.selectAllWhere('agent',{id:req.body.agent_id});
      // await   mail.acceptRequestMail({fsa:arr.toString(),token:token,public_user_name:requestData[0].name,public_email:requestData[0].email,agent_name:agentData[0].first_name +' '+agentData[0].last_name,agent_phone:agentData[0].mobile,agent_email : agentData[0].email })

      if (requestData[0].refer_client == 1) { // for referrl
        let referring_agent = await commonModel.selectAllWhere("agent", { id: requestData[0].user_id });
        let receiving_agent = agentData
        let forReferring = {
          client_name: requestData[0].name,
          client_phone: requestData[0].phone,
          client_email: requestData[0].email,
          referring_agent_name: referring_agent[0].first_name + ' ' + (referring_agent[0].last_name != undefined && referring_agent[0].last_name != 'undefined' && referring_agent[0].last_name != 'null' && referring_agent[0].last_name != null ? referring_agent[0].last_name : ''),
          referring_agent_brokerageName: referring_agent[0].brokerageName,
          referring_agent_phone: referring_agent[0].mobile,
          referring_agent_email: referring_agent[0].email,
          receiving_agent_name: receiving_agent[0].first_name + ' ' + (receiving_agent[0].last_name != undefined && receiving_agent[0].last_name != 'undefined' && receiving_agent[0].last_name != 'null' && receiving_agent[0].last_name != null ? receiving_agent[0].last_name : ''),
          receiving_agent_email: receiving_agent[0].email
        }
        mail.MailToAgentforReferAClient(forReferring);
        let forAdmin = {
          referring_agent_name: referring_agent[0].first_name + ' ' + (referring_agent[0].last_name != undefined && referring_agent[0].last_name != 'undefined' && referring_agent[0].last_name != 'null' && referring_agent[0].last_name != null ? referring_agent[0].last_name : ''),
          receiving_agent_name: receiving_agent[0].first_name + ' ' + (receiving_agent[0].last_name != undefined && receiving_agent[0].last_name != 'undefined' && receiving_agent[0].last_name != 'null' && receiving_agent[0].last_name != null ? receiving_agent[0].last_name : ''),
        }
        mail.newReferralbetweenRealtors(forAdmin);

      } else { // for request
        await mail.acceptRequestMailNew({
          fsa: arr.toString(),
          public_user_phone: req.body.phone,
          token: token,
          public_user_name: requestData[0].name,
          public_email: requestData[0].email,
          unsubscribe_agent: agentData[0].id,
          agent_name: agentData[0].first_name + " " + (agentData[0].last_name != undefined && agentData[0].last_name != 'undefined' && agentData[0].last_name != 'null' && agentData[0].last_name != null ? agentData[0].last_name : ''),
          agent_phone: agentData[0].mobile,
          agent_email: agentData[0].email,
          agent_brokerageName: agentData[0].brokerageName
        });
        // var adminData = await commonModel.selectAllWhere('agent', { id: 1 });
        await mail.sendMailAdminForRequestAccept({
          public_user_name: requestData[0].name,
          public_user_phone: requestData[0].phone,
          public_email: requestData[0].email,
          agent_name: agentData[0].first_name + " " + (agentData[0].last_name != undefined && agentData[0].last_name != 'undefined' && agentData[0].last_name != 'null' && agentData[0].last_name != null ? agentData[0].last_name : ''),
          id: req.body.id,
        });
        await mail.sendMailAgentForRequestAccept({
          public_user_name: requestData[0].name,
          public_user_phone: requestData[0].phone ? requestData[0].phone : '-',
          public_email: requestData[0].email,
          agent_name: agentData[0].first_name + " " + (agentData[0].last_name != undefined && agentData[0].last_name != 'undefined' && agentData[0].last_name != 'null' && agentData[0].last_name != null ? agentData[0].last_name : ''),
          agent_email: agentData[0].email,
          id: req.body.id,
          unsubscribe_agent: req.body.id
        });
      }
      // let oldagent0 = await commonModel.getlatestrequestofuser(req.body);
      // let oldagent = await commonModel.selectAllWhere('agent', { id: oldagent0[0].agent_id });
      let Fsaid = await commonModel.selectAllWhere('request', { id: req.body.id });
      var [first, last] = Fsaid[0].name.split(' ');

      let defaultAgent = await commonModel.defaultAgentByFSA(Fsaid[0].fsa);
      let defaultAgentData = [];
      if (defaultAgent[0]) defaultAgentData = await commonModel.selectAllWhere('agent', { id: defaultAgent[0].user_id });
      if (defaultAgentData.length) {
        let userdata = {
          user_name: first + (last ? ' ' + last : ''),
          user_email: Fsaid[0].email,
          old_agent_name: defaultAgentData[0].first_name + (defaultAgentData[0].last_name != undefined && defaultAgentData[0].last_name != null && defaultAgentData[0].last_name != 'undefined' && defaultAgentData[0].last_name != 'null' && defaultAgentData[0].last_name != '' ? ' ' + defaultAgentData[0].last_name : ''),
          new_agent_name: agentData[0].first_name + (agentData[0].last_name ? ' ' + agentData[0].last_name : '')
        }
        // mail.sendMailToUserforReferral(userdata);
      }
      return res.json({ status: true, msg: "Request Accepted Successfully", request_type: 1 });
    }
  } catch (err) {
    console.log(err)
    return res.json({ status: false, msg: "Request Declined Failed" });
  }
};


webroutesController.getRequestData = async (req, res, next) => {
  try {
    if (req.body.count) req.body.count = parseInt(req.body.count * req.body.limit);
    let result = await commonModel.getRequestData(

      req.body.filter,
      req.body.count,
      req.body.limit,
      req.body.status,
    );
    let total = await commonModel.getRequestData_total();
    if (result.length) {
      for (let i = 0; i < result.length; i++) {
        let user_id = result[i].user_id;
        let user_data = await commonModel.getRequestUserData(user_id);
        result[i].user_data = user_data[0];
      }
    }
    return res.json({
      status: true,
      msg: resMessage.dataFound,
      data: result,
      total: total,
    });
  } catch (err) {
    console.log(err);
    return res.json({ status: false, msg: resMessage.noDataFound, data: [] });
  }
};

webroutesController.getRequestDataById = async (req, res, next) => {
  try {
    let result = await commonModel.getRequestDataById(req.params.id);
    return res.json({ status: true, msg: resMessage.dataFound, data: result });
  } catch (err) {
    console.log(err);
    return res.json({ status: false, msg: resMessage.noDataFound, data: [] });
  }
};

webroutesController.verifyPhoneNo = async (req, res, next) => {
  let otp = Math.floor(1000 + Math.random() * 9000);
  console.log(req.body, "body");
    if(typeof req.body.phone_code == 'number'){    
    req.body.phone_code = req.body.phone_code.toString()
  }
  console.log(req.body, "body");
  await sms.sendOtpforverify({
    otp: otp,
    phone: req.body.phone,
    phone_code: req.body.phone_code,
  });
  try {
    return res.json({
      status: true,
      msg: "Otp Sent Successfully",
      data: [{ otp: otp, user_id: req.body.user_id }],
    });
  } catch (err) {
    console.log(err);
    return res.json({ status: false, msg: "Otp Sent failed", data: [] });
  }
};
webroutesController.verifyEmail = async (req, res, next) => {
  var nameVerify = await commonModel.selectAllWhere('agent', { id: req.body.user_id });
  let otp = Math.floor(1000 + Math.random() * 9000);
  mail.sendOtpforverify({ otp: otp, email: req.body.email, name: nameVerify[0].first_name });
  try {
    return res.json({
      status: true,
      msg: "Otp Sent Successfully",
      data: [{ otp: otp, user_id: req.body.user_id }],
    });
  } catch (err) {
    console.log(err);
    return res.json({ status: false, msg: "Otp Sent failed", data: [] });
  }
};

webroutesController.getRequestByAgentAll = async (req, res, next) => {
  try {
    var data = await commonModel.getRequestByAgentAll(
      req.body.agent_id,
      req.body.status
    );
    for (let x of data) {
      x.profile_img = process.env.image_path + x.profile_img;
      if (x.name) {
        var [first_name, last_name] = x.name.split(' ');
        if (last_name == 'null' || last_name == null || last_name == 'undefined' || last_name == undefined) last_name = '';
        x.first_name = first_name; x.last_name = last_name;
      }
    }

    return res.json({ status: true, data: data });
  } catch (err) {
    console.log(err);
    return res.json({ status: false, data: [] });
  }
};


webroutesController.GetUserRequestAll = async (req, res, next) => {
  try {
    let data = await commonModel.GetUserRequestAll(
      req.body.agent_id,
      req.body.status
    );
    for (let x of data) {
      x.profile_img = process.env.image_path + x.profile_img;
      x.AgentFSA = await commonModel.getFSALocation(x.fsa);
    }
    return res.json({ status: true, data: data });
  } catch (err) {
    console.log(err);
    return res.json({ status: false, data: [] });
  }
};


webroutesController.requestChange = async (req, res, next) => {
  try {
    for (let i = 0; i < req.body.length; i++) {
      await commonModel.update("request", { status: 2 }, { id: req.body[i].id });
    }
    return res.json({ status: true, msg: "Request Declined Successfully" });
  } catch (err) {
    console.log(err);
    return res.json({ status: false, msg: "Something Went Wrong In Api" });
  }
};


webroutesController.receivedrequest = async (req, res, next) => {
  try {
    let arr = []
    let createArr = []
    let messageArr = []
    let statusArr = []
    var data = await commonModel.receivedrequestTab(
      req.body.agent_id,
      req.body.status
    );
    if (data.length) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].agent_id != null) arr.push(data[i].user_id)
      }
      // for (let i = data.length - 1; i > -1; i--) {
      //   createArr.push(data[i].created_at)
      // }
      // for (let i = data.length - 1; i > -1; i--) {
      //   messageArr.push(data[i].message)
      // }
      // for (let i = data.length - 1; i > -1; i--) {
      //   statusArr.push(data[i].status)
      // }
      for (let i = 0; i < data.length; i++) {
        createArr.push(data[i].created_at)
      }
      for (let i = 0; i < data.length; i++) {
        messageArr.push(data[i].message)
      }
      for (let i = 0; i < data.length; i++) {
        statusArr.push(data[i].status)
      }
      
    }
    let ids = arr.toString()
    if (ids) {
      var selectall = await commonModel.getAgentByMultipleId(ids)

      for (let x of selectall) {
        x.profile_img = process.env.image_path + x.profile_img;
        x.name = x.first_name + ((x.last_name != undefined && x.last_name != 'undefined' && x.last_name != null && x.last_name != 'null' && x.last_name != '') ? (' ' + x.last_name) : '')
        x.phone = x.mobile
        x.status_agent = x.status
      }
      for (var i = 0; i < selectall.length; i++) {
        for (let y = 0; y < data.length; y++) {
          if (selectall[i].id == data[y].user_id) {
            selectall[i].created_at = createArr[i];
            selectall[i].message = messageArr[i];
            selectall[i].status = statusArr[i];
            selectall[i].clientName = data[y].name
            selectall[i].clientEmail = data[y].email
            selectall[i].clientPhone = data[y].phone
            selectall[i].fsaData = await commonModel.selectWhereIn("fsa", "id", data[y].fsa);
          }
        }
      }
    } else {
      var selectall = [];
    }
    return res.json({ status: true, data: selectall });
  } catch (err) {
    console.log(err);
    return res.json({ status: false, data: [] });
  }
};


module.exports = webroutesController;
