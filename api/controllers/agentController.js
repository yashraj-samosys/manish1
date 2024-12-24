const commonModel = require("../models/commonModel");
// const myProgramModel = require('../models/myProgramModel');
const agentController = function () { };
const resMessage = require("../helpers/res-message");
const mail = require("../helpers/mail");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const md5 = require('md5');
const { selectAllWhere } = require("../models/commonModel");
const ReverseMd5 = require('reverse-md5')
const Cryptr = require('cryptr');

const { data } = require("jquery");
const cron = require('node-cron');

const cryptr = new Cryptr('myTotalySecretKey');


var rev = ReverseMd5({
  lettersUpper: true,
  lettersLower: true,
  numbers: true,
  special: true,
  whitespace: true,
  maxLen: 122222
})

//********************** Agents authorized every 6 months by admin. START ************************//

cron.schedule('*/15 * * * *', async function () {
  // cron.schedule('0 * * * *', async function () {     //  cron job run every 1 hour
  // for the testing 10 seconds formet */10 * * * * *
  let authorizedStatus = await commonModel.getAgentAuthorized();

  if (authorizedStatus[0].agent_authorized == 1) {
    let result = await commonModel.getAllAgentsForAuthorized();
    for (let i = 0; i < result.length; i++) {
      const modify_date = new Date(result[i].modify_date);
      const current_date = new Date();

      //   modify_date.setDate(modify_date.getDate() + 183);
      function diff_months(dt2, dt1) {
        var diff = (dt2.getTime() - dt1.getTime()) / 1000;
        diff /= (60 * 60 * 24 * 7 * 4);
        return Math.abs(Math.round(diff));
      }
      dt1 = modify_date;
      dt2 = current_date;
      var authDate = diff_months(dt1, dt2);
      // if (current_date > modify_date) {
      if (authDate > 6) {
        var arr = [];
        var FSAs = await commonModel.selectFSACodeOfAgents(result[i].id);

        let arrFSAId = FSAs.map(value => value.fsa_id);

        var FSAs = await commonModel.selectFSACodeForEmail(arrFSAId);
        for (var y = 0; y < FSAs.length; y++) {
          arr.push(FSAs[y].fsa_code + ' - ' + FSAs[y].nieghborhood);
        }

        let emailData = {
          name: result[i].first_name + ' ' + (result[i].last_name != '' && result[i].last_name != 'undefined' && result[i].last_name != undefined && result[i].last_name != null && result[i].last_name != 'null' ? result[i].last_name : ''),
          Phone: result[i].mobile,
          text: result[i].textNo,
          email: result[i].email,
          brokerage_name: result[i].brokerageName,
          brokerageStreetAddress: result[i].BrokerageStreetAddress,
          brokerage_City: result[i].BrokerageCity,
          brokerage_Prov: result[i].BrokerageProvince,
          brokerage_Postal_Code: result[i].BrokeragePostalCode,
          brokerage_Phone: result[i].brokerPhoneNo,
          photo: result[i].profile_img,
          website: result[i].website,
          short_bio: result[i].shortBio,
          long_bio: result[i].bio,
          id: result[i].id,
          FSAs: arr
        };

        await mail.sendMailToAgentForAuthorization(emailData);
        await commonModel.update("agent", { is_email_sent_authorization: 1 }, { id: result[i].id });
      }
    }
  }
});

//******************* Agents authorized every 6 months by admin. END *****************************//



//***** GET COUNTRY CODE START *****//
agentController.getCountryCode = async (req, res, next) => {
  try {
    let result = await commonModel.selectAll("countries");
    if (result.length) {
      return res.json({
        status: true,
        msg: resMessage.dataFound,
        data: result,
      });
    } else {
      return res.json({ status: false, msg: resMessage.noDataFound, data: [] });
    }
  } catch (err) {
    return res.json({ status: false, msg: resMessage.noDataFound, data: [] });
  }
};
//***** GET COUNTRY CODE END *****//

agentController.getDefaultAgent = async (req, res, next) => {
  try {
    let result = await commonModel.selectAllWhere("agent", {
      status: 1,
      user_type: 2,
    });
    if (result.length) {
      return res.json({
        status: true,
        msg: resMessage.dataFound,
        data: result,
      });
    } else {
      return res.json({ status: false, msg: resMessage.noDataFound, data: [] });
    }
  } catch (err) {
    return res.json({ status: false, msg: resMessage.noDataFound, data: [] });
  }
};

//***** GET COUNTRY CODE START *****//
agentController.getFSA = async (req, res, next) => {
  try {
    let result = await commonModel.selectAllWhere("fsa", { status: 1 });
    if (result.length) {
      for (let x of result) {
        x.text = x.fsa_code;
      }
      return res.json({
        status: true,
        msg: resMessage.dataFound,
        data: result,
      });
    } else {
      return res.json({ status: false, msg: resMessage.noDataFound, data: [] });
    }
  } catch (err) {
    return res.json({ status: false, msg: resMessage.noDataFound, data: [] });
  }
};
//***** GET COUNTRY CODE END *****//

//****** ADD EDIT START *****//
agentController.editProfile = async (req, res, next) => {
  req.body.last_name = req.body.last_name != '' && req.body.last_name != null && req.body.last_name != undefined && req.body.last_name != 'undefined' ? req.body.last_name : null;

  var agenttype = req.body.agenttype;

  try {
    delete req.body.agenttype
    delete req.body.profile_img;
    if (req.file) req.body.profile_img = req.file.filename;

    if (req.body.password != undefined) req.body.password = cryptr.encrypt(req.body.password);
    if (req.body.userType == 3 && req.body.is_default_agent == 1) {
      req.body.status = 1;
      req.body.agent_type = 0;
    }

    if (req.body.userType == 2 && req.body.is_default_agent == 1 && agenttype == 0) {
      req.body.status = 1;
      req.body.agent_type = 0;
    }
    if (req.body.userType == 2 && req.body.is_default_agent == 1 && agenttype == 1) {
      req.body.status = 1;
      req.body.agent_type = 1;
    }
    if (req.body.userType == 2 && req.body.is_default_agent == 0) {
      req.body.agent_type = 1;
      req.body.status = 1;
    }

    if (req.body.userType != 4) {
      var fsaIds = [];
      if (req.body.fsa_id != '' && req.body.fsa_id != undefined) { fsaIds = req.body.fsa_id.split(","); }
      else { fsaIds = []; }

      let checkFSAActive = await commonModel.selectAllWhere("fsa", { id: fsaIds[0], status: 1 });
      if (checkFSAActive.length == 0) {
        return res.json({ status: 'inactive', msg: 'FSA is inactive!, please choose another FSA' });
      }

      let fsatest = await commonModel.DeleteRemainigFSA(fsaIds.toString(), req.params.id);
      if (fsaIds.length != 0) {
        for (let i = 0; i < fsaIds.length; i++) {
          let myFSA = await commonModel.selectAllWhere('user_fsa', { fsa_id: fsaIds[i], user_id: req.params.id, status: 1 });
          if (myFSA.length == 0) {
            if (req.body.userType == 2 && req.body.is_default_agent == 0) {

              let part1 = await commonModel.insert("user_fsa", {
                address: (await commonModel.selectAllWhere('fsa', { id: fsaIds[i] }))[0].nieghborhood,
                user_id: req.params.id,
                fsa_id: fsaIds[i],
                agent_type: 1,
                user_fsa_no: i + 1
              });
            }
            else if (req.body.userType == 2 && req.body.is_default_agent == 1 && agenttype == 1) {

              let part3 = await commonModel.insert("user_fsa", {
                address: (await commonModel.selectAllWhere('fsa', { id: fsaIds[i] }))[0].nieghborhood,
                user_id: req.params.id,
                fsa_id: fsaIds[i],
                agent_type: 1,
                user_fsa_no: i + 1
              });
            }
            else {
              let part2 = await commonModel.insert("user_fsa", {
                address: (await commonModel.selectAllWhere('fsa', { id: fsaIds[i] }))[0].nieghborhood,
                user_id: req.params.id,
                fsa_id: fsaIds[i],
                user_fsa_no: i + 1
              });
            }
          } else {
            await commonModel.update('user_fsa', { user_fsa_no: i + 1 }, { fsa_id: fsaIds[i], user_id: req.params.id, status: 1 });
          }
        }
      }
    }
    delete req.body.userType;

    let checkIFDefault = await commonModel.selectAllWhere('user_fsa', { user_id: req.params.id, status: 1, activate_status: 1 });
    if (checkIFDefault.length > 0) req.body.is_default_agent = 1;
    else req.body.is_default_agent = 0;
    req.body.profile_status = 1;
    req.body.is_email_sent_authorization = 0;

    let result = await commonModel.update01("agent", req.params.id, req.body);

    let getUserType = await commonModel.selectAllWhere('agent', { id: req.params.id });
    // req.body.password = await bcryptjs.hash(req.body.password, 10);
    return res.json({ status: true, msg: resMessage.updateSucc, user_type: getUserType[0].user_type });
  } catch (err) {
    console.log(err);
    return res.json({ status: false, msg: resMessage.errMsg });
  }
};

agentController.verifyPassword = async (req, res, next) => {
  // console.log(req.body, 'verifyPassword----body')
  try {
    let checkAgentExist = await commonModel.selectAllWhere("agent", {
      email: req.body.email
    });
    // if (checkAgentExist.length) {
    //   if (checkAgentExist[0].id != req.body.id) {
    //     return res.json({ status: false, msg: resMessage.emailExist });
    //   }
    // }
    let result = await commonModel.selectAllWhere('agent', { id: req.body.id });
    if (result.length) {
      result[0].password = cryptr.decrypt(result[0].password);
      if (result[0].password == req.body.password) {
        return res.json({ status: true, msg: 'Password is Verify' });
      } else {
        return res.json({ status: false, msg: 'Password is Wrong' });
      }
    }
  } catch (err) {
    console.log(err);
    return res.json({ status: false, msg: resMessage.errMsg });
  }
}



agentController.admineditProfile = async (req, res, next) => {

  try {
    delete req.body.profile_img;
    if (req.file) req.body.profile_img = req.file.filename;
    let result = await commonModel.update01("agent", req.params.id, req.body);
    return res.json({ status: true, msg: resMessage.updateSucc });
  } catch (err) {
    return res.json({ status: false, msg: resMessage.errMsg });
  }
};
agentController.addEditsubadmin = async (req, res, next) => {

  let page_data = []
  page_data = { ...req.body }
  delete req.body.page_id
  try {
    if (req.params.id == 0) {
      let exist = await commonModel.selectAllWhere('agent', { email: req.body.email })
      if (exist.length) {
        return res.json({ status: false, msg: resMessage.emailExist });
      }
      delete req.body.profile_img;
      if (req.file) req.body.profile_img = req.file.filename;
      if (req.body.password)
        req.body.password = cryptr.encrypt(req.body.password)
      if (req.body.last_name == 'undefined' || req.body.last_name == undefined || req.body.last_name == 'null' || req.body.last_name == null) delete req.body.last_name
      let result = await commonModel.insert('agent', req.body);
      let result2 = commonModel.insert("subAdmin_pages", { user_id: result.insertId, page_id: page_data.page_id });
      return res.json({ status: true, msg: resMessage.addSucc });
    }
    else {
      let result2 = await commonModel.update("subAdmin_pages", { page_id: page_data.page_id }, { user_id: req.params.id });
      delete req.body.profile_img;
      if (req.file) req.body.profile_img = req.file.filename;
      if (req.body.password)
        req.body.password = cryptr.encrypt(req.body.password)
      if (req.body.last_name == 'undefined' || req.body.last_name == undefined || req.body.last_name == 'null' || req.body.last_name == null) delete req.body.last_name
      let result = commonModel.update01("agent", req.params.id, req.body);
      return res.json({ status: true, msg: resMessage.updateSucc });
    }

  } catch (err) {
    return res.json({ status: false, msg: resMessage.errMsg });
  }
};








// agentController.addEditAgent = async (req, res, next) => {
//   try {
//     delete req.body.profile_img;
//     req.body.parent_id = 0;
//     var fsaIds = req.body.fsa_id.split(",");
//     delete req.body.fsa_id;
//     if (req.file) req.body.profile_img = req.file.filename;
//     if (req.params.id == 0) {
//       let checkAgentExist = await commonModel.selectAllWhere("agent", {
//         email: req.body.email,
//       });
//       console.log(checkAgentExist,'exist....')
//       if (checkAgentExist.length)
//         return res.json({ status: false, msg: resMessage.emailExist });
//       // ADD MY PROGRAM
//       if (req.body.password)
//       req.body.password= cryptr.encrypt(req.body.password)
//       // req.body.password = md5(req.body.password)
//         // req.body.password = await bcryptjs.hash(req.body.password, 10);
//       else {
//         delete req.body.password;
//         let token = jwt.sign({ email: req.body.email }, process.env.secret_key);
//         req.body.token = token;
//         mail.updatePassword(req.body);
//       }

//       var userData = await commonModel.insert("agent", req.body);
//       for (var k = 0; k < fsaIds.length; k++) {
//         await commonModel.insert("user_fsa", {
//           address: req.body.address,
//           user_id: userData.insertId,
//           fsa_id: fsaIds[k],
//         });
//       }

//       return res.json({ status: true, msg: resMessage.addSucc });
//     } else {
//       // EDIT MY PROGRAM.
//       // console.log('req.body.password',req.body.password)
//         let checkAgentExist = await commonModel.selectAllWhere("agent", {
//           email: req.body.email,
//         });
//         if (checkAgentExist.length)
//           return res.json({ status: false, msg: resMessage.emailExist });

//       if (req.body.password != undefined)
//       req.body.password= cryptr.encrypt(req.body.password)
//         // req.body.password = await bcryptjs.hash(req.body.password, 10);
//         // req.body.password = md5(req.body.password)
//       if (req.body.user_type == 2 && req.body.is_default_agent == 1)
//         req.body.status = 1;

//       await commonModel.update01("agent", req.params.id, req.body);
//       await commonModel.update(
//         "user_fsa",
//         { status: 0 },
//         { user_id: req.params.id }
//       );
//       for (var k = 0; k < fsaIds.length; k++) {
//         await commonModel.insert("user_fsa", {
//           address: req.body.address,
//           user_id: req.params.id,
//           fsa_id: fsaIds[k],
//         });
//       }
//       return res.json({ status: true, msg: resMessage.updateSucc });
//     }
//   } catch (err) {
//     console.log(err);
//     return res.json({ status: false, msg: resMessage.errMsg });
//   }
// };





/* new for remove space  */



// agentController.addEditAgent = async (req, res, next) => {
//   console.log(req.body,'********',req.params)
//   try {
//     req.body.BrokerageCity = req.body.BrokerageCity[0] != undefined ? req.body.BrokerageCity[0] : req.body.BrokerageCity
//     delete req.body.profile_img;
//     req.body.parent_id = 0;
//     var length = 20;
//     console.log(req.body.fsa_id,'req.body.fsa_id')
//     var fsaIds = req.body.fsa_id.split(",");
//     delete req.body.fsa_id;
//     if (req.file) req.body.profile_img = req.file.filename;
//     // old 07/12/21
//     // if (req.params.id == 0) {
//     //   let checkAgentExist = await commonModel.selectAllWhere("agent", {
//     //     email: req.body.email
//     //   });

//     if (req.params.id == 0) {
//       let checkAgentExist = await commonModel.checkmailavailable({
//         email: req.body.email
//       });
//       let checkAgentAccountNo = await commonModel.checkAccountavailable({
//         account_number: req.body.account_number
//       });
//       if (checkAgentAccountNo.length) {
//         return res.json({ status: false, msg: resMessage.accountNoExist });
//       }

//       // if(req.body.shortBio.length <= length){
//       //   return res.json({ status: false, msg: resMessage.shortBiolength });
//       // }
//       if (checkAgentExist.length)
//         return res.json({ status: false, msg: resMessage.emailExist });
//       // ADD MY PROGRAM
//       if (req.body.password)
//         req.body.password = cryptr.encrypt(req.body.password)
//       // req.body.password = md5(req.body.password)
//       // req.body.password = await bcryptjs.hash(req.body.password, 10);
//       else {
//         delete req.body.password;
//         let token = jwt.sign({ email: req.body.email }, process.env.secret_key);
//         req.body.token = token;
//         mail.updatePassword(req.body);
//       }
//       if (req.body.user_type == 2 && req.body.is_default_agent == 0) {
//         req.body.agent_type = 1;
//         req.body.status = 1;
//       }
//       var userData = await commonModel.insert("agent", req.body);

//       var FSAs = await commonModel.selectFSACodeForEmail(fsaIds);
//       var arr = [];
//       for (var i = 0; i < FSAs.length; i++) {
//         arr.push(FSAs[i].fsa_code + '-' + FSAs[i].nieghborhood);
//       }

//       req.body.fsa = arr.toString().replace(/,/g, "<br>");
//       mail.adminMakeRealtor(
//         req.body
//       )

//       for (var k = 0; k < fsaIds.length; k++) {
//         if (req.body.user_type == 2 && req.body.is_default_agent == 0) {
//           await commonModel.insert("user_fsa", {
//             address: (await commonModel.selectAllWhere('fsa', { id: fsaIds[k] }))[0].nieghborhood,
//             user_id: userData.insertId,
//             fsa_id: fsaIds[k],
//             agent_type: 1
//           });
//         } else {
//           await commonModel.insert("user_fsa", {
//             address: (await commonModel.selectAllWhere('fsa', { id: fsaIds[k] }))[0].nieghborhood,
//             user_id: userData.insertId,
//             fsa_id: fsaIds[k],
//           });
//         }
//       }
//       return res.json({ status: true, msg: resMessage.addSucc });
//     } else {
//       // EDIT MY PROGRAM.
//       // console.log('req.body.password',req.body.password)

//       //old 07/12/21
//       // let checkAgentExist = await commonModel.selectAllWhere("agent", {
//       //   email: req.body.email,
//       // });
//       agentData = await commonModel.selectAllWhere('agent', { id: req.params.id })
//       if (req.body.account_number != agentData[0].account_number) {
//         let checkAgentAccountNo = await commonModel.checkAccountavailable({
//           account_number: req.body.account_number
//         });
//         if (checkAgentAccountNo.length) {
//           return res.json({ status: false, msg: resMessage.accountNoExist });
//         }
//       }

//       let checkAgentExist = await commonModel.checkmailavailable({
//         email: req.body.email
//       });

//       if (checkAgentExist.length)
//         return res.json({ status: false, msg: resMessage.emailExist });

//       // let checkAgentAccountNo = await commonModel.checkAccountavailable({
//       //   account_number: req.body.account_number
//       // });
//       // if(checkAgentAccountNo.length){
//       //   return res.json({ status: false, msg: resMessage.accountNoExist }); 
//       // }
//       if (req.body.password != undefined)
//         req.body.password = cryptr.encrypt(req.body.password)
//       // req.body.password = await bcryptjs.hash(req.body.password, 10);
//       // req.body.password = md5(req.body.password)
//       if (req.body.user_type == 2 && req.body.is_default_agent == 1)
//         req.body.status = 1;
//       if (req.body.user_type == 2 && req.body.is_default_agent == 0) {
//         req.body.agent_type = 1;
//         req.body.status = 1;
//       }

//       let checkIFDefault = await commonModel.selectAllWhere('user_fsa', { user_id: req.params.id, status: 1, activate_status: 1 });
//       if (checkIFDefault.length > 0) req.body.is_default_agent = 1;

//       await commonModel.update01("agent", req.params.id, req.body);
//       // await commonModel.update(
//       //   "user_fsa",
//       //   { status: 2,activate_status:0 },
//       //   { user_id: req.params.id }
//       // );
//       console.log(fsaIds,'faIds-----------')
//       await commonModel.DeleteRemainigFSA(fsaIds.toString(), req.params.id);
//       for (var k = 0; k < fsaIds.length; k++) {
//         let myFSA = await commonModel.selectAllWhere('user_fsa', { fsa_id: fsaIds[k], user_id: req.params.id, status: 1 });
//         if (myFSA.length == 0) {
//           if (req.body.user_type == 2 && req.body.is_default_agent == 0) {
//             await commonModel.insert("user_fsa", {
//               address: (await commonModel.selectAllWhere('fsa', { id: fsaIds[k] }))[0].nieghborhood,
//               user_id: req.params.id,
//               fsa_id: fsaIds[k],
//               agent_type: 1
//             });
//           } else {
//             let runTimeAgent = await commonModel.selectAllWhere('agent', { id: req.params.id });
//             await commonModel.insert("user_fsa", {
//               address: (await commonModel.selectAllWhere('fsa', { id: fsaIds[k] }))[0].nieghborhood,
//               user_id: req.params.id,
//               fsa_id: fsaIds[k],
//               agent_type: runTimeAgent[0].agent_type == 1 ? 1 : 0
//             });
//           }
//         }
//       }
//       return res.json({ status: true, msg: resMessage.updateSucc });
//     }
//   } catch (err) {
//     console.log(err);
//     return res.json({ status: false, msg: resMessage.errMsg });
//   }
// };

agentController.addEditAgent = async (req, res, next) => {
  // console.log('addEditAgent Body', req.body);
  // console.log('addEditAgent Params', req.params);
  try {
    req.body.BrokerageCity = req.body.BrokerageCity[0] != undefined ? req.body.BrokerageCity[0] : req.body.BrokerageCity
    delete req.body.profile_img;
    req.body.parent_id = 0;
    var length = 20;
    var fsaIds = req.body.fsa_id.split(",");
    delete req.body.fsa_id;
    if (req.file) req.body.profile_img = req.file.filename;
    if (req.params.id == 0) {
      // let checkAgentExist = await commonModel.checkmailavailable({
      //   email: req.body.email
      // });
      let checkemailNoAgentExist = await commonModel.checkemailNoAgentExist({
        email: req.body.email,
        mobile: req.body.mobile
      });
      let checkAgentAccountNo = await commonModel.checkAccountavailable({
        account_number: req.body.account_number
      });
      if (checkAgentAccountNo.length) {
        return res.json({ status: false, msg: resMessage.accountNoExist });
      }
      // if(req.body.shortBio.length <= length){
      //   return res.json({ status: false, msg: resMessage.shortBiolength });
      // }      
      if (checkemailNoAgentExist.length) {
        const userData = checkemailNoAgentExist[0];
        const { email, mobile } = req.body;
      
        if (userData.email === email && userData.mobile === mobile) {
          return res.json({ status: false, msg: resMessage.emailNumberExist });
        }
        
        if (userData.email === email) {
          return res.json({ status: false, msg: resMessage.emailExist });
        }
        
        if (userData.mobile === mobile) {
          return res.json({ status: false, msg: resMessage.numberExist });
        }
      }    
      // ADD MY PROGRAM
      if (req.body.password)
        req.body.password = cryptr.encrypt(req.body.password)
      // req.body.password = md5(req.body.password)
      // req.body.password = await bcryptjs.hash(req.body.password, 10);
      else {
        delete req.body.password;
        let token = jwt.sign({ email: req.body.email }, process.env.secret_key);
        req.body.token = token;
        mail.updatePassword(req.body);
      }
      if (req.body.user_type == 2 && req.body.is_default_agent == 0) {
        req.body.agent_type = 1;
        req.body.status = 1;
      }
      var userData = await commonModel.insert("agent", req.body);

      var FSAs = await commonModel.selectFSACodeForEmail(fsaIds);
      var arr = [];
      for (var i = 0; i < FSAs.length; i++) {
        arr.push(FSAs[i].fsa_code + '-' + FSAs[i].nieghborhood);
      }

      req.body.fsa = arr.toString().replace(/,/g, "<br>");
      mail.adminMakeRealtor(
        req.body
      )

      for (var k = 0; k < fsaIds.length; k++) {
        if (req.body.user_type == 2 && req.body.is_default_agent == 0) {
          await commonModel.insert("user_fsa", {
            address: (await commonModel.selectAllWhere('fsa', { id: fsaIds[k] }))[0].nieghborhood,
            user_id: userData.insertId,
            fsa_id: fsaIds[k],
            agent_type: 1,
            user_fsa_no: k + 1
          });
        } else {
          await commonModel.insert("user_fsa", {
            address: (await commonModel.selectAllWhere('fsa', { id: fsaIds[k] }))[0].nieghborhood,
            user_id: userData.insertId,
            fsa_id: fsaIds[k],
            user_fsa_no: k + 1
          });
        }
      }
      return res.json({ status: true, msg: resMessage.addSucc });
    } else {
      // EDIT MY PROGRAM.
      // console.log('req.body.password',req.body.password)

      //old 07/12/21
      // let checkAgentExist = await commonModel.selectAllWhere("agent", {
      //   email: req.body.email,
      // });
      agentData = await commonModel.selectAllWhere('agent', { id: req.params.id })
      if (req.body.account_number != agentData[0].account_number) {
        let checkAgentAccountNo = await commonModel.checkAccountavailable({
          account_number: req.body.account_number
        });
        if (checkAgentAccountNo.length) {
          return res.json({ status: false, msg: resMessage.accountNoExist });
        }
      }

      let oldEmail = agentData[0].email.toLowerCase();
      let newEmail = req.body.email.toLowerCase();
      if (newEmail != oldEmail) {
        let checkAgentExist = await commonModel.checkmailavailable({ email: req.body.email });
        if (checkAgentExist.length)
          return res.json({ status: false, msg: resMessage.emailExist });
      }

      // let checkAgentAccountNo = await commonModel.checkAccountavailable({
      //   account_number: req.body.account_number
      // });
      // if(checkAgentAccountNo.length){
      //   return res.json({ status: false, msg: resMessage.accountNoExist }); 
      // }
      if (req.body.password != undefined)
        req.body.password = cryptr.encrypt(req.body.password)
      // req.body.password = await bcryptjs.hash(req.body.password, 10);
      // req.body.password = md5(req.body.password)
      if (req.body.user_type == 2 && req.body.is_default_agent == 1)
        req.body.status = 1;
      if (req.body.user_type == 2 && req.body.is_default_agent == 0) {
        req.body.agent_type = 1;
        req.body.status = 1;
      }

      let checkIFDefault = await commonModel.selectAllWhere('user_fsa', { user_id: req.params.id, status: 1, activate_status: 1 });
      if (checkIFDefault.length > 0) req.body.is_default_agent = 1;

      await commonModel.update01("agent", req.params.id, req.body);
      // await commonModel.update(
      //   "user_fsa",
      //   { status: 2,activate_status:0 },
      //   { user_id: req.params.id }
      // );

      await commonModel.DeleteRemainigFSA(fsaIds.toString(), req.params.id);

      for (var k = 0; k < fsaIds.length; k++) {
        let myFSA = await commonModel.selectAllWhere('user_fsa', { fsa_id: fsaIds[k], user_id: req.params.id, status: 1 });
        if (myFSA.length == 0) {
          if (req.body.user_type == 2 && req.body.is_default_agent == 0) {
            await commonModel.insert("user_fsa", {
              address: (await commonModel.selectAllWhere('fsa', { id: fsaIds[k] }))[0].nieghborhood,
              user_id: req.params.id,
              fsa_id: fsaIds[k],
              agent_type: 1,
              user_fsa_no: k + 1
            });
          } else {
            let runTimeAgent = await commonModel.selectAllWhere('agent', { id: req.params.id });
            await commonModel.insert("user_fsa", {
              address: (await commonModel.selectAllWhere('fsa', { id: fsaIds[k] }))[0].nieghborhood,
              user_id: req.params.id,
              fsa_id: fsaIds[k],
              agent_type: runTimeAgent[0].agent_type == 1 ? 1 : 0,
              user_fsa_no: k + 1
            });
          }
        } else {
          await commonModel.update('user_fsa', { user_fsa_no: k + 1 }, { fsa_id: fsaIds[k], user_id: req.params.id, status: 1 });
        }
      }
      return res.json({ status: true, msg: resMessage.updateSucc });
    }
  } catch (err) {
    console.log(err);
    return res.json({ status: false, msg: resMessage.errMsg });
  }
};




/* End new for remove space  */


//***** ADD EDIT PROGRAM END *****//

//***** GET AGENT LIST START *****//
agentController.getAgentList = async (req, res, next) => {
  try {
    if (req.body.count) req.body.count = parseInt(req.body.count * req.body.limit);
    let result = await commonModel.getAgentList(
      req.body.id,
      req.body.search,
      req.body.filterStatus,
      req.body.count,
      req.body.limit
    );
    let total = await commonModel.getAgentList_total(req.body.id);
    if (result.length) {
      for (let x of result) {
        x.profile_img = process.env.image_path + x.profile_img;
        x.name = x.first_name + "   " + x.last_name;
      }
      return res.json({
        status: true,
        msg: resMessage.dataFound,
        data: result,
        total: total,
      });
    } else {
      return res.json({ status: false, msg: resMessage.noDataFound, data: [] });
    }
  } catch (err) {
    return res.json({ status: false, msg: resMessage.noDataFound, data: [] });
  }
};
//***** GET AGENT LIST END *****//

agentController.getDefaultAndPartnerAgent = async (req, res, next) => {
  try {
    if (req.body.count) req.body.count = parseInt(req.body.count * req.body.limit);
    let result = await commonModel.getDefaultAndPartnerAgent(
      req.body.id,
      req.body.search,
      req.body.filterStatus,
      req.body.count,
      req.body.limit
    );
    let total = await commonModel.getFSAwithDefaultAgentTotal();
    if (result.length) {
      for (let x of result) {
        x.profile_img = process.env.image_path + x.profile_img;
        x.name = x.first_name + "   " + x.last_name;
      }
      return res.json({
        status: true,
        msg: resMessage.dataFound,
        data: result,
        total: total[0].total,
      });
    } else {
      return res.json({ status: false, msg: resMessage.noDataFound, data: [] });
    }
  } catch (err) {
    console.log(err);
    return res.json({ status: false, msg: resMessage.errMsg, data: [] });
  }
};

agentController.getnearbyForAgentList = async (req, res, next) => {
  try {
    let result = await commonModel.getnearbyForAgentList(
      req.body.search,
    );
    if (result.length) {
      for (let x of result) {
        x.profile_img = process.env.image_path + x.profile_img;
        x.name = x.first_name + "   " + x.last_name;
      }
      return res.json({
        status: true,
        msg: resMessage.dataFound,
        data: result
      });
    } else {
      return res.json({ status: false, msg: resMessage.noDataFound, data: [] });
    }
  } catch (err) {
    console.log(err);
    return res.json({ status: false, msg: resMessage.errMsg, data: [] });
  }
};

agentController.getnearbyAgent = async (req, res, next) => {
  try {
      let result = await commonModel.getnearbyAgent();
      if (result.length) {
        return res.json({
          status: true,
          msg: resMessage.dataFound,
          data: result
        });
      } else {
        return res.json({ status: false, msg: resMessage.noDataFound, data: [] });
      }
  } catch (err) {
    console.log(err);
    return res.json({ status: false, msg: resMessage.errMsg, data: [] });
  }
};


agentController.updateNearbyAgent = async (req, res, next) => {
  try {
    let agentsData = req.body.agentsData
    if (agentsData.length) {
      for (let i = 0; i < agentsData.length; i++) {
        // console.log('agentsData------->',agentsData[i]);
        await commonModel.update("near_by", { s_no: agentsData[i].s_no }, { id: agentsData[i].id });
      }
      return res.json({ status: true, msg: resMessage.updateSucc, Data: [] });
    }
  } catch (err) {
    console.log(err);
    return res.json({ status: false, msg: resMessage.errMsg, data: [] });
  }
};

agentController.deleteNearbyAgent = async (req, res, next) => {
  try {
    let id = req.body.id
    if (id) {
      let result = await commonModel.update("near_by", { is_deleted: 1 }, { id: id });
      // console.log('result-><<<><>', result);
      return res.json({
        status: true,
        msg: resMessage.DeleteSucc,
        data: []
      });
    }
  } catch (err) {
    console.log(err);
    return res.json({ status: false, msg: resMessage.errMsg, data: [] });
  }
};

agentController.addNearbyAgent = async (req, res, next) => {
  try {
    let agentData = req.body.agentData

    let result = await commonModel.getDescOneUser();
    console.log('result++++++++++++',result);
    let s_no = result.length == 0 ? 1 : result[0].s_no  + 1;
  
    let nearbyAgentData = {
      user_id: agentData.id,
      s_no: s_no,
      fullname: agentData.fullname,
    };
    await commonModel.insert("near_by", nearbyAgentData);
    return res.json({ status: true, msg: resMessage.addSucc });
  } catch (err) {
    console.log(err);
    return res.json({ status: false, msg: resMessage.errMsg, data: [] });
  }
};

agentController.getClientListAdmin = async (req, res, next) => {
  try {
    if (req.body.count) req.body.count = parseInt(req.body.count * req.body.limit);
    let result = await commonModel.getClientListAdmin(
      req.body.id,
      req.body.search,
      req.body.filterStatus,
      req.body.count,
      req.body.limit
    );
    let total = await commonModel.getClientListAdmin_total(req.body.id);
    if (result.length) {
      for (let x of result) {
        x.profile_img = process.env.image_path + x.profile_img;
        x.name = x.first_name + "   " + x.last_name;
      }
      return res.json({
        status: true,
        msg: resMessage.dataFound,
        data: result,
        total: total,
      });
    } else {
      return res.json({ status: false, msg: resMessage.noDataFound, data: [] });
    }
  } catch (err) {
    console.log(err);
    return res.json({ status: false, msg: resMessage.noDataFound, data: [] });
  }
};
//***** GET AGENT LIST START *****//
agentController.getPartnerList = async (req, res, next) => {
  try {
    let result = await commonModel.getPartnerList(req.params.id);
    if (result.length) {
      for (let x of result) {
        x.profile_img = process.env.image_path + x.profile_img;
        x.name = x.first_name + "   " + x.last_name;
      }
      return res.json({
        status: true,
        msg: resMessage.dataFound,
        data: result,
      });
    } else {
      return res.json({ status: false, msg: resMessage.noDataFound, data: [] });
    }
  } catch (err) {
    return res.json({ status: false, msg: resMessage.noDataFound, data: [] });
  }
};
//***** GET AGENT LIST END *****//

//***** GET AGENT BY ID START *****//
agentController.getAgentById = async (req, res, next) => {
  try {
    let result = await commonModel.getAgentById(req.params.id);
    // password = await cryptr.encrypt(req.body.newpassword
    if (result.length) {
      if (result[0].password != null) result[0].password = cryptr.decrypt(result[0].password);
      if (result[0].user_type != 1) {
        let result01 = await commonModel.getAgentFsa(result[0].fsa_id);
        result[0].agentFsa = result01;
      }
      let result03 = await commonModel.getBecome(req.params.id)
      result[0].become = result03[0];
      let result02 = await commonModel.getClientPartnerCount(req.params.id);
      result[0].profile_img = process.env.image_path + result[0].profile_img;
      result[0].count = result02[0].count;
      var FSAData = await commonModel.selectAllWhere("user_fsa", {
        user_id: req.params.id,
        status: 1,
      });
      var arr = [];
      for (var z = 0; z < FSAData.length; z++) {
        arr.push(parseInt(FSAData[z].fsa_id));
      }
      let requestDataPublic = await commonModel.allrequestDataPublic(req.params.id);
      if (requestDataPublic.length) result[0].requestData = requestDataPublic;

      let requestDataPartner = await commonModel.allrequestDataPartner(req.params.id);
      if (requestDataPartner.length) result[0].requestDataPartner = requestDataPartner;
      // if (result[0].user_type == 3) {
      //     let fsa_id = [];
      //     result[0].fsa_id.split(',').map(function (item) { fsa_id.push(parseInt(item)) });
      //     result[0].fsa_id = fsa_id;
      // }
      // else result[0].fsa_id = parseInt(result[0].fsa_id);
      result[0].fsa_id = arr;
      result[0].FSAData = await commonModel.getFSA(req.params.id);
      // console.log(result[0].FSAData,'result[0].FSAData')
      return res.json({
        status: true,
        msg: resMessage.dataFound,
        data: result,
      });
    } else {
      return res.json({ status: false, msg: resMessage.noDataFound, data: [] });
    }
  } catch (err) {
    console.log("err", err)
    return res.json({ status: false, msg: resMessage.noDataFound, data: [] });
  }
};
//***** GET AGENT BY ID END *****//

//***** GET LAST ID START *****//
agentController.getLastId = async (req, res, next) => {
  try {
    let result = await commonModel.getLastId();
    if (result.length) {
      result[0].lastId = result[0].lastId + 1;
      return res.json({
        status: true,
        msg: resMessage.dataFound,
        data: result,
      });
    } else {
      return res.json({ status: false, msg: resMessage.noDataFound, data: [] });
    }
  } catch (err) {
    return res.json({ status: false, msg: resMessage.noDataFound, data: [] });
  }
};
//***** GET LAST ID END *****//

//***** CHANGE STATUS  START *****//
agentController.changeAgentStatus = async (req, res, next) => {
  try {
    if (req.body.user_type != 4) {
      if (req.body.status == 0) {
        req.body.is_want_referrals = 1;
        req.body.unsubscribe = 0;
      }
      if (req.body.agent_type == 1) req.body.user_type = 2;
      else { req.body.user_type = 3; }
    }

    if (req.body.status == 1) { req.body.status = 0; req.body.is_default_agent = 0; }
    else { req.body.status = 1; }

    await commonModel.update("agent", req.body, { id: req.params.id });
    await commonModel.update("user_fsa", { activate_status: 0 }, { user_id: req.params.id }); // add [15-11-22]

    return res.json({ status: true, msg: resMessage.statusChange });
  } catch (err) {
    return res.json({ status: false, msg: resMessage.statusChangeErr });
  }
};

//***** CHANGE STATUS  END *****//

agentController.activateFSA = async (req, res, next) => {
  try {
    if (req.body.status == false) req.body.status = 0;
    else req.body.status = 1;
    var checkFSA = await commonModel.selectAllWhere("user_fsa", {
      fsa_id: req.body.fsa_id,
      activate_status: 1,
      status: 1,
    });

    if (req.body.status == 1) {
      if (checkFSA.length == 0) {
        await commonModel.update(
          "user_fsa",
          { activate_status: req.body.status },
          { user_id: req.params.id, fsa_id: req.body.fsa_id, status: 1 }
        );
        await commonModel.update("agent", { status: 1 }, { id: req.params.id });
        return res.json({
          status: true,
          msg: "Default Agent is activated successfully with this FSA",
        });
      } else {
        return res.json({
          status: false,
          msg: "Default Agent is already activated with this FSA",
        });
      }
    } else {
      await commonModel.update(
        "user_fsa",
        { activate_status: req.body.status },
        { user_id: req.params.id, fsa_id: req.body.fsa_id, status: 1 }
      );
      var getRemaningFSA = await commonModel.selectAllWhere("user_fsa", {
        user_id: req.params.id,
        activate_status: 1,
        status: 1,
      });
      if (getRemaningFSA.length == 0) {
        await commonModel.update("agent", { status: 0 }, { id: req.params.id });
      }
      return res.json({
        status: true,
        msg: "Default Agent is deactivated successfully with this FSA",
      });
    }
    return res.json({ status: true, msg: resMessage.statusChange });
  } catch (err) {
    return res.json({ status: false, msg: resMessage.statusChangeErr });
  }
};

agentController.makeDefaultAgentAdmin = async (req, res, next) => {
  try {
    req.body.status = 1;
    if (req.body.user_type == 2) {
      let userFSa = await commonModel.selectAllWhere("user_fsa", {
        user_id: req.params.id,
        status: 1,
      });
      let count = 0;
      for (let l = 0; l < userFSa.length; l++) {
        let checkFSAIsAleadyActiveData =
          await commonModel.checkFSAIsAleadyActive(userFSa[l].fsa_id);
        if (checkFSAIsAleadyActiveData.length > 0) {
          count += 1;
        } else {
          await commonModel.update(
            "user_fsa",
            { activate_status: req.body.status },
            { user_id: req.params.id, fsa_id: userFSa[l].fsa_id }
          );
          let result = await commonModel.update(
            "agent",
            { is_default_agent: 1, status: req.body.status },
            { id: req.params.id }
          );
        }
      }
      if (count == userFSa.length) {
        return res.json({
          status: false,
          isActivated: false,
          data: [],
          msg: "Agent are aleady active in your all FSA",
        });
      } else {
        return res.json({
          status: true,
          isActivated: false,
          data: [],
          msg: resMessage.statusChange,
        });
      }
    } else {
      let result = await commonModel.update(
        "agent",
        { status: req.body.status },
        { id: req.params.id }
      );
      return res.json({
        status: true,
        isActivated: false,
        data: [],
        msg: resMessage.statusChange,
      });
    }
  } catch (err) {
    console.log(err);
    return res.json({
      status: false,
      isActivated: false,
      data: [],
      msg: resMessage.statusChangeErr,
    });
  }
};
//***** CHANGE STATUS WITH FSA FOR DEFAULT AGENT START *****//
agentController.changeDefaultAgentStatus = async (req, res, next) => {
  try {
    // let result01 = await commonModel.getWhereFsa(req.body);
    // if (!req.body.status) {
    //     let result = await commonModel.getWhereFsa(req.body);
    //     console.log(result,'test')
    //     if (result.length) return res.json({ status: true, isActivated: true, data: result, msg: resMessage.alreadyActivated });
    // }

    if (req.body.status == 1) {
      req.body.status = 0;
      if (req.body.user_type == 2) {
        let status_result = await commonModel.update(
          "user_fsa",
          { activate_status: req.body.status },
          { user_id: req.params.id }
        );
      }
      let result = await commonModel.update(
        "agent",
        { status: req.body.status },
        { id: req.params.id }
      );
      return res.json({
        status: true,
        isActivated: false,
        data: [],
        msg: resMessage.statusChange,
      });
    } else {
      req.body.status = 1;
      if (req.body.user_type == 2) {
        let userFSa = await commonModel.selectAllWhere("user_fsa", {
          user_id: req.params.id,
          status: 1,
        });
        let count = 0;
        for (let l = 0; l < userFSa.length; l++) {
          let checkFSAIsAleadyActiveData =
            await commonModel.checkFSAIsAleadyActive(userFSa[l].fsa_id);
          if (checkFSAIsAleadyActiveData.length > 0) {
            count += 1;
          } else {
            await commonModel.update(
              "user_fsa",
              { activate_status: req.body.status },
              { user_id: req.params.id, fsa_id: userFSa[l].fsa_id }
            );
            let result = await commonModel.update(
              "agent",
              { is_default_agent: 1, status: req.body.status },
              { id: req.params.id }
            );
          }
        }
        if (count == userFSa.length) {
          return res.json({
            status: false,
            isActivated: false,
            data: [],
            msg: "Agent are already active in your all FSA",
          });
        } else {
          return res.json({
            status: true,
            isActivated: false,
            data: [],
            msg: resMessage.statusChange,
          });
        }
      } else {
        let result = await commonModel.update(
          "agent",
          { status: req.body.status },
          { id: req.params.id }
        );
        return res.json({
          status: true,
          isActivated: false,
          data: [],
          msg: resMessage.statusChange,
        });
      }
    }

    // if (req.body.status == 1) req.body.status = 0;
    // else req.body.status = 1;
    //    let result =  await commonModel.update("agent", { status: req.body.status }, { id: req.params.id });
    //    console.log(result)
    // return res.json({ status: true, isActivated: false, data: [], msg: resMessage.statusChange });
  } catch (err) {
    console.log(err);
    return res.json({
      status: false,
      isActivated: false,
      data: [],
      msg: resMessage.statusChangeErr,
    });
  }
};

// agentController.changeDefaultAgentStatus = async(req,res,next) => {
//     console.log(req.body.status)
//     try {
//         if(req.body.status == 1) req.body.status = 0;
//         else req.body.status = 1;
//         await commonModel.update("agent",{ status: req.body.status},{ id: req.params.id});
//         return res.json({status: true, msg: resMessage.statusChange})
//     } catch (err) {
//         console.log(err)
//         return res.json({ status: false, msg: resMessage.statusChangeErr });
//     }
// }
//***** CHANGE STATUS WITH FSA FOR DEFAULT AGENT END *****//

//***** UPDATE PASSWORD START *****//
agentController.updatePass = async (req, res, next) => {
  try {
    let getToken = await selectAllWhere("agent", { token: req.params.token });
    if (!getToken.length)
      return res.json({ status: false, msg: resMessage.invalidToken });
    // req.body.password = await bcryptjs.hash(req.body.password, 10);
    // req.body.password = md5(req.body.password)
    req.body.password = cryptr.encrypt(req.body.password)
    await commonModel.update(
      "agent",
      { password: req.body.password },
      { token: req.params.token }
    );
    return res.json({ status: true, msg: resMessage.updateSucc });
  } catch (err) {
    return res.json({ status: false, msg: resMessage.errMsg });
  }
};
//***** UPDATE PASSWORD END *****//

//***** GET USER LIST START *****//
agentController.getUserList = async (req, res, next) => {
  try {
    let result = await commonModel.getUserList();
    if (result.length) {
      for (let x of result) {
        x.profile_img = process.env.image_path + x.profile_img;
        x.name = x.first_name + "   " + x.last_name;
      }
      return res.json({
        status: true,
        msg: resMessage.dataFound,
        data: result,
      });
    } else {
      return res.json({ status: false, msg: resMessage.noDataFound, data: [] });
    }
  } catch (err) {
    return res.json({ status: false, msg: resMessage.noDataFound, data: [] });
  }
};
//***** GET USER LIST END *****//

//***** GET USER BY ID START *****//
agentController.getUserById = async (req, res, next) => {
  // console.log(req.params, "dasdfdsfdfdafdsafdsafdsfdsfdsfdffdsfdsfds")
  try {
    let result = await commonModel.getUserById(req.params.id);
    result[0].password = cryptr.decrypt(result[0].password);
    // console.log(result[0].password, 'password')
    if (result.length) {
      let resulltFas = await commonModel.getUserByIdFSA(req.params.id);
      result[0].agentFsa = resulltFas.map((e) => {
        return { id: e.id, itemName: e.fsa_code + " - " + e.nieghborhood }
      })
      result[0].profile_img = process.env.image_path + result[0].profile_img;
      if (result[0].user_type == 3) {
        let fsa_id = [];
        if (result[0].fsa_id != null) {
          result[0].fsa_id.split(",").map(function (item) {
            fsa_id.push(parseInt(item));
          });
        }
        result[0].fsa_id = fsa_id;
      } else {
        result[0].fsa_id = parseInt(result[0].fsa_id);
        result[0].FSAData = [];
      }
      if (result[0].userType != 4) result[0].FSAData = await commonModel.getFSA(req.params.id);
      else result[0].FSAData = [];

      return res.json({
        status: true,
        msg: resMessage.dataFound,
        data: result,
      });
    } else {
      return res.json({ status: false, msg: resMessage.noDataFound, data: [] });
    }
  } catch (err) {
    console.log(err)
    return res.json({ status: false, msg: resMessage.noDataFound, data: [] });
  }
};


agentController.getadminById = async (req, res, next) => {
  // console.log(req.params, "dasdfdsfdfdafdsafdsafdsfdsfdsfdffdsfdsfds")
  try {
    let result = await commonModel.getUserById(req.params.id);
    // result[0].password = cryptr.decrypt(result[0].password);
    delete result[0].password
    if (result.length) {
      result[0].profile_img = process.env.image_path + result[0].profile_img;
      let page_id = await commonModel.selectAllWhere('subAdmin_pages', { user_id: result[0].id })
      // console.log(page_id, "page_id")
      result = { ...result[0], page_id: page_id[0].page_id }
      return res.json({
        status: true,
        msg: resMessage.dataFound,
        data: result,

      });
    } else {
      return res.json({ status: false, msg: resMessage.noDataFound, data: [] });
    }
  } catch (err) {
    console.log(err)
    return res.json({ status: false, msg: resMessage.noDataFound, data: [] });
  }
};
//***** GET USER BY ID END *****//

agentController.getLoginUserDetail = async (req, res, next) => {
  try {
    let result = await commonModel.selectAllWhere("agent", {
      id: req.params.id,
    });

    return res.json({ status: true, msg: resMessage.dataFound, data: result });
  } catch (err) {
    return res.json({ status: false, msg: resMessage.noDataFound, data: [] });
  }
};

agentController.getUserDetailsById = async (req, res, next) => {
  try {
    let result = await commonModel.selectAllWhere("agent", {
      id: req.params.id,
    });

    if (result.length) {
      let fsa = await commonModel.getUserDetailsById(req.params);
      result[0].fsa = fsa.map((e) => {
        return { id: e.id, itemName: e.fsa_code, nieghborhood: e.nieghborhood };
      });
      result[0].fsa_ids = fsa.map((e) => e.id);
      // result[0].fsa  = await commonModel.getUserDetailsById(req.params.agentid);
      return res.json({
        status: true,
        msg: resMessage.dataFound,
        data: result,
      });
    } else {
      return res.json({ status: false, msg: resMessage.noDataFound, data: [] });
    }
  } catch (err) {
    return res.json({ status: false, msg: resMessage.noDataFound, data: [] });
  }
};
agentController.FSAByUserIdData = async (req, res, next) => {
  try {
    let result = await commonModel.GetFSAByUserId(req.params.id);
    return res.json({ status: true, msg: resMessage.dataFound, data: result });
  } catch (err) {
    return res.json({ status: false, msg: resMessage.noDataFound, data: [] });
  }
};

agentController.updateUserData = async (req, res, next) => {
  try {
    delete req.body.profile_img;
    req.body.user_type = 3;
    var fsaIds = req.body.fsa_id.split(",");
    let req_id = req.body.req_id;
    let agent_id = req.body.agent_id;
    delete req.body.agent_id;
    delete req.body.req_id;
    delete req.body.fsa_id;
    // req.body.password = await bcryptjs.hash(req.body.password, 10);
    // req.body.password = md5(req.body.password);
    req.body.password = cryptr.encrypt(req.body.password)
    if (req.file) req.body.profile_img = req.file.filename;
    await commonModel.update01("agent", req.params.id, req.body);
    await commonModel.update(
      "user_fsa",
      { status: 0 },
      { user_id: req.params.id }
    );
    for (var k = 0; k < fsaIds.length; k++) {
      await commonModel.insert("user_fsa", {
        user_id: req.params.id,
        fsa_id: fsaIds[k],
      });
    }
    await commonModel.update("request", { status: 3 }, { id: req_id });
    let resdata = await commonModel.selectAllWhere("agent", {
      id: req.body.id,
    });
    let agentData = await commonModel.selectAllWhere("agent", { id: agent_id });
    await mail.sendMailToAgentFieldForm({
      public_user_name: req.body.first_name + " " + req.body.last_name,
      public_email: req.body.email,
      agent_name: agentData[0].first_name + " " + agentData[0].last_name,
    });

    return res.json({ status: true, msg: "Saved Successfully", data: resdata });
  } catch (err) {
    console.log(err);
    return res.json({ status: false, msg: resMessage.errMsg, data: [] });
  }
};
agentController.setUserPinMap = async (req, res, next) => {
  try {
    await commonModel.update(
      "agent",
      { pinMapLat: req.body.lat, pinMapLng: req.body.lng },
      { id: req.body.userid }
    );
    return res.json({ status: true, msg: "Saved Successfully", data: [] });
  } catch (err) {
    console.log(err);
    return res.json({ status: false, msg: resMessage.errMsg, data: [] });
  }
};

agentController.getDefaultAgentInAdminList = async (req, res, next) => {
  try {
    let agent = await commonModel.getDefaultAgentInAdminList();
    for (let x of agent) {
      x.profile_img = process.env.image_path + x.profile_img;
      x.name = x.first_name + "   " + x.last_name;
    }
    return res.json({ status: true, msg: "Successfully", data: agent });
  } catch (err) {
    console.log(err);
    return res.json({ status: false, msg: resMessage.errMsg, data: [] });
  }
};

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

// agentController.JoinUs = async (req, res, next) => {
//   try {
//     delete req.body.profile_img;
//     if (req.file) req.body.profile_img = req.file.filename;
//     let getLastAgentEntry = await commonModel.getLastAgentEntry("agent");
//     let string = "" + getLastAgentEntry[0].id;
//     let pad = "000000";
//     let n =
//       new Date().getFullYear() +
//       pad.substring(0, pad.length - string.length) +
//       string;
//     if (req.body.last_name == 'undefined' || req.body.last_name == undefined ) req.body.last_name = " ";
//     var InData = {
//       first_name: req.body.first_name,
//       last_name: req.body.last_name,
//       email: req.body.email,
//       mobile: req.body.mobile,
//       isEmailVerify: create_UUID(),
//       latitude: req.body.latitude,
//       longitude: req.body.longitude,
//       brokerPhoneNo: req.body.brokerage_phone,
//       brokerageName: req.body.estate_brokeraege,
//       account_number: n,
//       shortBio: req.body.shortBio,
//       bio: req.body.longBio,
//       website: req.body.website,
//       facebook: req.body.facebook,
//       whatsapp: req.body.whatsapp,
//       messenger: req.body.messenger,
//       wechat: req.body.wechat,
//       account_number: req.body.account_number,
//       shownOnMap: req.body.shownOnMap,
//       textNo: req.body.textNo,
//       BrokerageStreetAddress: req.body.BrokerageStreetAddress,
//       BrokerageCity: req.body.BrokerageCity,
//       BrokerageProvince: req.body.BrokerageProvince,
//       BrokeragePostalCode: req.body.BrokeragePostalCode
//     };

//   var  emailData = {
//       name: req.body.first_name + ' ' + req.body.last_name,
//       email: req.body.email,
//       phone: req.body.mobile,
//       estate_brokeraege: req.body.estate_brokeraege
//     }

//     if (req.file) InData.profile_img = req.body.profile_img;
//     req.body.isEmailVerify = InData.isEmailVerify;
//     if (req.params.id == 'null') {
//       let checkAgentExist = await commonModel.checkmailavailable({ email: req.body.email })
//       if (checkAgentExist.length) return res.json({ status: false, msg: resMessage.emailExist });

//       let resData = InData;
//       resData.user_type = 3;
//       resData.status = 5;
//       resData.is_default_agent = 0;
//       resData.agent_type = 0;

//       let userInserted = await commonModel.insert("agent", InData);
//       let fsa = req.body.fsa_id.split(",");
//       for (var i = 0; i < fsa.length; i++) {
//         await commonModel.insert("user_fsa", {
//           user_id: userInserted.insertId,
//           fsa_id: fsa[i],
//           address: (await commonModel.selectAllWhere('fsa', { id: fsa[i] }))[0].nieghborhood,
//           activate_status: 0
//         });
//       }
//       var responseEmail = await mail.RealtorRegistrationFromLink(req.body);
//       var responseEmailadmin = await mail.sendMailToAdminForRealtorSignUp(emailData)
//       if (responseEmail == true) {
//         return res.json({
//           status: true,
//           msg: "Realtor Registered Successfully, Please verify your email from link sent to your Email id",
//         });
//       } else {
//         return res.json({
//           status: true,
//           msg: "Realtor Registered Successfully But Verification Link Has Not Been Sent To Your Email , Please Contact admin",
//         });
//       }
//     }
//     else {
//       let result01 = await commonModel.selectAllWhere("agent", { id: req.params.id });
//       if (result01[0].email != req.body.email) {
//         let checkAgentExist = await commonModel.checkmailavailable({ email: req.body.email })
//         if (checkAgentExist.length)
//           return res.json({ status: false, msg: resMessage.emailExist });
//         let result = await commonModel.update01("agent", req.params.id, InData);
//       }
//       else if (result01[0].email == req.body.email) {
//         let result = await commonModel.update01("agent", req.params.id, InData);
//       } else {
//         let checkAgentExist = await commonModel.checkmailavailable({ email: req.body.email })
//         if (checkAgentExist.length)
//           return res.json({ status: false, msg: resMessage.emailExist });
//       }
//       let fsa = req.body.fsa_id.split(",");

//       let fsatest = await commonModel.DeleteRemainigFSA(fsa.toString(), req.params.id);
//       for (var i = 0; i < fsa.length; i++) {

//         let myFSA = await commonModel.selectAllWhere('user_fsa', { fsa_id: fsa[i], user_id: req.params.id, status: 1 });
//         if (myFSA.length == 0) {
//           if (req.body.userType == 2 && req.body.is_default_agent == 0) {
//             let part1 = await commonModel.insert("user_fsa", {
//               address: (await commonModel.selectAllWhere('fsa', { id: fsa[i] }))[0].nieghborhood,
//               user_id: req.params.id,
//               fsa_id: fsa[i],
//               agent_type: 1
//             });
//           } else {
//             let part2 = await commonModel.insert("user_fsa", {
//               address: (await commonModel.selectAllWhere('fsa', { id: fsa[i] }))[0].nieghborhood,
//               user_id: req.params.id,
//               fsa_id: fsa[i],
//             });
//           }
//         }
//       }

//       var responseEmail = await mail.RealtorRegistrationFromLink(req.body);
//      var responseEmailadmin =  await mail.sendMailToAdminForRealtorSignUp(emailData)
//       if (responseEmail == true) {
//         return res.json({
//           status: true,
//           msg: "Realtor Registered Successfully, Please verify your email from link sent to your Email id",
//         });
//       } else {
//         return res.json({
//           status: true,
//           msg: "Realtor Registered Successfully But Verification Link Has Not Been Sent To Your Email , Please Contact admin",
//         });
//       }
//     }
//   } catch (err) {
//     console.log(err);
//     return res.json({
//       status: false,
//       msg: "Something Went Wrong In Api",
//       data: [],
//     });
//   }
// };

agentController.JoinUs = async (req, res, next) => {
  try {
    delete req.body.profile_img;
    if (req.file) req.body.profile_img = req.file.filename;
    let getLastAgentEntry = await commonModel.getLastAgentEntry("agent");
    let string = "" + getLastAgentEntry[0].id;
    let pad = "000000";
    let n =
      new Date().getFullYear() +
      pad.substring(0, pad.length - string.length) +
      string;
    if (req.body.last_name == 'undefined' || req.body.last_name == undefined) req.body.last_name = " ";
    var InData = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      mobile: req.body.mobile,
      isEmailVerify: create_UUID(),
      password: cryptr.encrypt(req.body.password),
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      brokerPhoneNo: req.body.brokerage_phone,
      brokerageName: req.body.estate_brokeraege,
      account_number: n,
      shortBio: req.body.shortBio,
      bio: req.body.longBio,
      website: req.body.website,
      facebook: req.body.facebook,
      whatsapp: req.body.whatsapp,
      messenger: req.body.messenger,
      wechat: req.body.wechat,
      account_number: req.body.account_number,
      shownOnMap: req.body.shownOnMap,
      textNo: req.body.textNo,
      BrokerageStreetAddress: req.body.BrokerageStreetAddress,
      BrokerageCity: req.body.BrokerageCity,
      BrokerageProvince: req.body.BrokerageProvince,
      BrokeragePostalCode: req.body.BrokeragePostalCode
    };
    if (req.body.status) InData.status = req.body.status;


    var emailData = {
      name: req.body.first_name + ' ' + req.body.last_name,
      email: req.body.email,
      mobile: req.body.mobile,
      brokerageName: req.body.estate_brokeraege
    }

    if (req.file) InData.profile_img = req.body.profile_img;
    req.body.isEmailVerify = InData.isEmailVerify;

    if (req.params.id == 'null') {
      let checkAgentExist = await commonModel.checkmailavailable({ email: req.body.email })
      if (checkAgentExist.length) return res.json({ status: false, msg: resMessage.emailExist });

      let resData = InData;
      resData.user_type = 3;
      resData.status = req.body.btn_type == 3 ? 5 : 1;
      resData.is_default_agent = 0;
      resData.agent_type = 0;

      let fsa = req.body.fsa_id.split(",");
      let checkFSAActive = await commonModel.selectAllWhere("fsa", { id: fsa[0], status: 1 });
      if (checkFSAActive.length == 0) {
        return res.json({ status: 'inactive', msg: 'FSA is inactive!, please choose another FSA' });
      }

      let userInserted = await commonModel.insert("agent", resData);


      for (var i = 0; i < fsa.length; i++) {
        await commonModel.insert("user_fsa", {
          user_id: userInserted.insertId,
          fsa_id: fsa[i],
          address: (await commonModel.selectAllWhere('fsa', { id: fsa[i] }))[0].nieghborhood,
          activate_status: 0,
          user_fsa_no: i + 1
        });
      }
      if (userInserted) req.body.id = userInserted.insertId;
      var responseEmail = await mail.RealtorRegistrationFromLink(req.body);
      var responseEmailadmin = await mail.sendMailToAdminForRealtorSignUp(emailData)
      if (responseEmail == true) {
        return res.json({
          status: true,
          msg: "Realtor Registered Successfully, Please verify your email from link sent to your Email id",
        });
      } else {
        return res.json({
          status: true,
          msg: "Realtor Registered Successfully But Verification Link Has Not Been Sent To Your Email , Please Contact admin",
        });
      }
    }
    else {
      let result01 = await commonModel.selectAllWhere("agent", { id: req.params.id });
      if (req.body.btn_type == 2) { InData.status = 1; InData.is_want_referrals = 1; InData.unsubscribe = 0; }
      InData.is_email_sent_authorization = 0;

      if (result01[0].email != req.body.email) {
        let checkAgentExist = await commonModel.checkmailavailable({ email: req.body.email })
        if (checkAgentExist.length)
          return res.json({ status: false, msg: resMessage.emailExist });
        let result = await commonModel.update01("agent", req.params.id, InData);
      }
      else if (result01[0].email == req.body.email) {
        let result = await commonModel.update01("agent", req.params.id, InData);
      } else {
        let checkAgentExist = await commonModel.checkmailavailable({ email: req.body.email })
        if (checkAgentExist.length)
          return res.json({ status: false, msg: resMessage.emailExist });
      }

      var FSAs = [];
      if (req.body.fsa_id != '') FSAs = await commonModel.selectFSACodeForEmail1(req.body.fsa_id);
      else { FSAs = []; }
      var fsa = [];
      if (req.body.fsa_id != '' && req.body.fsa_id != undefined) { fsa = req.body.fsa_id.split(","); }
      else { fsa = []; }

      let checkFSAActive = await commonModel.selectAllWhere("fsa", { id: fsa[0], status: 1 });
      if (checkFSAActive.length == 0) {
        return res.json({ status: 'inactive', msg: 'FSA is inactive!, please choose another FSA' });
      }

      let fsatest = await commonModel.DeleteRemainigFSA(fsa.toString(), req.params.id);
      for (var i = 0; i < fsa.length; i++) {

        let myFSA = await commonModel.selectAllWhere('user_fsa', { fsa_id: fsa[i], user_id: req.params.id, status: 1 });
        if (myFSA.length == 0) {
          if (req.body.userType == 2 && req.body.is_default_agent == 0) {
            let part1 = await commonModel.insert("user_fsa", {
              address: (await commonModel.selectAllWhere('fsa', { id: fsa[i] }))[0].nieghborhood,
              user_id: req.params.id,
              fsa_id: fsa[i],
              agent_type: 1,
              user_fsa_no: i + 1
            });
          } else {
            let part2 = await commonModel.insert("user_fsa", {
              address: (await commonModel.selectAllWhere('fsa', { id: fsa[i] }))[0].nieghborhood,
              user_id: req.params.id,
              fsa_id: fsa[i],
              user_fsa_no: i + 1
            });
          }
        } else {
          await commonModel.update('user_fsa', { user_fsa_no: i + 1 }, { fsa_id: fsa[i], user_id: req.params.id, status: 1 });
        }
      }

      req.body.id = req.params.id;
      req.body.name = req.body.first_name + ' ' + req.body.last_name;

      let check_verified = await commonModel.selectAllWhere("agent", { id: req.params.id });

      // var responseEmail = await mail.RealtorRegistrationFromLink(req.body);
      if (req.body.btn_type == 2) var responseEmail = await mail.VerifiedAccountMail(req.body);
      var responseEmailadmin = await mail.sendMailToAdminForRealtorSignUp(emailData)
      if (responseEmail == true) {
        return res.json({
          status: true,
          // msg: "Realtor Registered Successfully, Please verify your email from link sent to your Email id",
          msg: req.body.btn_type == 2 ? "Realtor Verified Successfully!" : "Realtor Account Information Updated Successfully",
          update_type: req.body.btn_type == 1 ? 1 : 2,
          agent_status: check_verified[0].status
        });
      } else {
        return res.json({
          status: true,
          msg: req.body.btn_type == 2 ? "Realtor Verified Successfully But Verified Email Has Not Been Sent To Your Email , Please Contact admin" : "Realtor Account Information Updated Successfully",
          update_type: req.body.btn_type == 1 ? 1 : 2,
          agent_status: check_verified[0].status
        });
      }
    }
  } catch (err) {
    console.log(err);
    return res.json({ status: false, msg: "Something Went Wrong In Api", data: [] });
  }
};

// agentController.deletePofile = async (req, res, next) => {
//   try {
//     await commonModel.update("agent", req.body, { id: req.body.id });
//     await commonModel.update("user_fsa", { status: 2, activate_status: 0 }, { user_id: req.body.id });

//     let agentData = await commonModel.selectAllWhere("agent", { id: req.body.id });
//     let emailData = {
//       name: agentData[0].first_name + ' ' + (agentData[0].last_name != undefined && agentData[0].last_name !='undefined' && agentData[0].last_name !='null' && agentData[0].last_name !=null  ? agentData[0].last_name: '' ),
//       phone: agentData[0].mobile,
//       email: agentData[0].email
//     }
//     await mail.AgentOptOutSystemGeneratedMailToAdmin(emailData)

//     //  let res_mail = await mail.realtorOptOutMailToAdmin(emailData)

//     return res.json({ status: true, msg: req.body.is_want_referrals == 2 ? "Opted Out Successfully" : "Deleted Successfully." });
//   } catch (err) {
//     console.log(err);
//     return res.json({ status: false, msg: "Something Went Wrong In Api", data: [] });
//   }
// };


agentController.deletePofile = async (req, res, next) => {
  try {

    if (req.body.agent_type == 1) {
      req.body.user_type = 2;
      await commonModel.update("agent", req.body, { id: req.body.id });
      await commonModel.update("user_fsa", { activate_status: 0, agent_type: 1 }, { user_id: req.body.id });
    } else {
      req.body.user_type = 3;
      await commonModel.update("agent", req.body, { id: req.body.id });
      await commonModel.update("user_fsa", { activate_status: 0, agent_type: 0 }, { user_id: req.body.id });
    }
    // await commonModel.update("agent", req.body, { id: req.body.id });
    // await commonModel.update("user_fsa", { activate_status: 0 }, { user_id: req.body.id });

    if (req.body.is_want_referrals == 2) {
      let agentData = await commonModel.selectAllWhere("agent", { id: req.body.id });
      let AgentEmailData = {
        name: agentData[0].first_name + ' ' + (agentData[0].last_name != undefined && agentData[0].last_name != 'undefined' && agentData[0].last_name != 'null' && agentData[0].last_name != null ? agentData[0].last_name : ''),
        phone: agentData[0].mobile,
        email: agentData[0].email
      }
      await mail.AgentOptOutSystemGeneratedMailToAdmin(AgentEmailData);

      // **************************************************************
      var checkPendingRequest = await commonModel.selectAllWhere("request", { agent_id: req.body.id, status: 0 });
      for (let i = 0; i < checkPendingRequest.length; i++) {
        if (checkPendingRequest.length >= 1 || checkPendingRequest.length == 0) {
          var checkNextAgentOfFSA = await commonModel.selectAllWhere("user_fsa", { fsa_id: checkPendingRequest[i].fsa, status: 1 });
          var output = [];
          output = checkNextAgentOfFSA.map(s => s.user_id)
          let CheckAgentStatus = await commonModel.checkRealtorStatus(output);   // changed in query[25-11-22] 

          if (CheckAgentStatus.length > 0) {
            var RequestAgentData = await commonModel.selectAllWhere("request", { user_id: checkPendingRequest[i].user_id, agent_id: checkPendingRequest[i].agent_id, status: 0 });
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

            await commonModel.update("request", { status: 2 }, { id: RequestAgentData[0].id });
            if (CheckAgentStatus.length != 0) await commonModel.insert("request", nextAgentData);
            // email send to next agent for new request?
          } else {
            await commonModel.update("request", { status: 2 }, { id: checkPendingRequest[i].id });
            let emailData = {
              name: agentData[0].first_name + ' ' + (agentData[0].last_name != undefined && agentData[0].last_name != 'undefined' && agentData[0].last_name != 'null' && agentData[0].last_name != null ? agentData[0].last_name : ''),
              phone: agentData[0].mobile,
              email: agentData[0].email
            }
            let res_mail = await mail.realtorOptOutMailToAdmin(emailData);
          }
        }
      }
    }
    // **************************************************************    
    return res.json({ status: true, msg: req.body.is_want_referrals == 2 ? "Opted Out Successfully" : "Deleted Successfully." });
  } catch (err) {
    console.log(err);
    return res.json({ status: false, msg: "Something Went Wrong In Api", data: [] });
  }
};

agentController.deleteUser = async (req, res, next) => {
  try {
    await commonModel.update("agent", { status: 2 }, { id: req.body.id });
    await commonModel.update(
      "user_fsa",
      { status: 2 },
      { user_id: req.body.id }
    );
    // await commonModel.update(
    //   "user_fsa",
    //   { status: 2, activate_status: 0 },
    //   { user_id: req.body.id }
    // );
    return res.json({ status: true, msg: "Deleted Successfully." });
  } catch (err) {
    console.log(err);
    return res.json({
      status: false,
      msg: "Something Went Wrong In Api",
      data: [],
    });
  }
};

agentController.recoverUser = async (req, res, next) => {
  try {
    await commonModel.update("agent", { status: 1 }, { id: req.body.id });
    await commonModel.update(
      "user_fsa",
      { status: 1 },
      { user_id: req.body.id }
    );
    // await commonModel.update(
    //   "user_fsa",
    //   { status: 1, activate_status: 1 },
    //   { user_id: req.body.id }
    // );
    if (req.body.status == 5) {
      return res.json({ status: true, msg: "Verify  Successfully." });
    } else {
      return res.json({ status: true, msg: "Activate  Successfully." });
    }
  } catch (err) {
    console.log(err);
    return res.json({
      status: false,
      msg: "Something Went Wrong In Api",
      data: [],
    });
  }
};


agentController.MakeFavorite = async (req, res, next) => {
  try {
    console.log(req.body);
    if (req.body.type != "red") {
      await commonModel.update(
        "favorite",
        { status: 2 },
        { user_id: req.body.userid, agent_id: req.body.agent_id, status: 1 }
      );
      return res.json({ status: true, msg: "Removed Successfully." });
    } else {
      await commonModel.insert("favorite", {
        user_id: req.body.userid,
        agent_id: req.body.agent_id,
        status: 1,
      });
      return res.json({ status: true, msg: "Favourite Successfully." });
    }
  } catch (err) {
    console.log(err);
    return res.json({
      status: false,
      msg: "Something Went Wrong In Api",
      data: [],
    });
  }
};

agentController.addAgentClient = async (req, res, next) => {
  try {



    var replaceNewID = req.body.defaultAgetDetail[0].id;
    var FSAstr = req.body.fsa_id.toString();
    var fsaId = FSAstr.split(",");
    // delete req.body.fsa_id;


    let result07 = await commonModel.selectAllWhere("user_fsa", {

      user_id: replaceNewID,
      fsa_id: fsaId,
    });


    // console.log('*************',result07[0].activate_status,result07)
    if (result07[0].activate_status == 0) {

      return res.json({ status: false, msg: "No default agent for this FSA", check: false });
    } else {


      var InData = {
        first_name: req.body.first_name.split(" ")[0],
        last_name: req.body.first_name.split(" ")[1] ? req.body.first_name.split(" ")[1] : '',
        email: req.body.email,
        mobile: req.body.mobile,
        // password: await bcryptjs.hash(req.body.password, 10),
        // password: md5(req.body.password),
        password: cryptr.encrypt(req.body.password),
        user_type: 3,
        is_default_agent: 0,
        status: 0
      };
      var userid = req.body.userId;
      let data = await commonModel.checkmailavailable({ email: req.body.email })
      let data01 = await commonModel.selectAllWhere("agent", {
        id: req.body.userId,
      });
      let dataAgent = await commonModel.selectAllWhere("agent", {
        id: req.body.agent_id_replace_to,
      });
      let client = await commonModel.selectAllWhere("agent", {
        id: req.body.userId,
      });
      var FSAs = await commonModel.selectFSACodeForEmail(fsaId);
      var arr = [];
      for (var i = 0; i < FSAs.length; i++) {
        arr.push(FSAs[i].fsa_code + '-' + FSAs[i].nieghborhood + '<br>');
      }
      if (data.length) {
        let clientData = {
          user_id: userid,
          agent_id: data[0].id,
          agent_id_replace_to: replaceNewID,
          fsa_id: req.body.fsa_id,
        };

        let result_client = await commonModel.insert("client_map", clientData);

        //********************************************************* */
        for (var k = 0; k < fsaId.length; k++) {
          let result03 = await commonModel.insert("user_fsa", {
            address: (await commonModel.selectAllWhere('fsa', { id: fsaId[k] }))[0].nieghborhood,
            user_id: data[0].id,
            fsa_id: fsaId[k],
          });
        }
        //********************************************************** */

        mail.sendMailToAgentIfExists({
          // agent_name: data[0].first_name + " " + data[0].last_name
          agent_name: data[0].first_name + ' ' + (data[0].last_name != '' && data[0].last_name != 'undefined' && data[0].last_name != undefined && data[0].last_name != null && data[0].last_name != 'null' ? data[0].last_name : ''),
          new_agent_email: req.body.email,
          agent_brokerageName: data01[0].brokerageName,
          agent_phone: req.body.mobile,
          client_name: client[0].first_name + " " + (client[0].last_name != '' && client[0].last_name != 'undefined' && client[0].last_name != undefined && client[0].last_name != null && client[0].last_name != 'null' ? client[0].last_name : ''),
          agent_id: data[0].id,
          clientName: dataAgent[0].first_name + " " + (dataAgent[0].last_name != '' && dataAgent[0].last_name != 'undefined' && dataAgent[0].last_name != undefined && dataAgent[0].last_name != null && dataAgent[0].last_name != 'null' ? dataAgent[0].last_name : ''),
          clientEmail: dataAgent[0].email,
          clientPhone: dataAgent[0].mobile,
          agent_phone: data01[0].mobile,
          agent_email: data01[0].email,
          id: req.body.userId,
          fsa: arr.toString()
        });
        return res.json({
          status: true,
          msg: "Added Successfully.",
          data: result_client,
        });
      } else {
        let result = await commonModel.insert("agent", InData);
        let clientData = {
          user_id: userid,
          agent_id: result.insertId,
          agent_id_replace_to: replaceNewID,
          fsa_id: req.body.fsa_id,
        };

        let result_client = await commonModel.insert("client_map", clientData);


        //********************************************************* */
        for (var k = 0; k < fsaId.length; k++) {
          let result03 = await commonModel.insert("user_fsa", {
            address: (await commonModel.selectAllWhere('fsa', { id: fsaId[k] }))[0].nieghborhood,
            user_id: result.insertId,
            fsa_id: fsaId[k],
          });
        }
        //********************************************************** */

        mail.sendMailToAgentIfNotExists({
          agent_name: req.body.first_name,
          agent_phone: data01[0].mobile,
          agent_brokerageName: data01[0].brokerageName,
          agent_id: result.insertId,
          agent_email: data01[0].email,
          new_agent_email: req.body.email,
          client_name: client[0].first_name + ' ' + (client[0].last_name != '' && client[0].last_name != 'undefined' && client[0].last_name != undefined && client[0].last_name != null && client[0].last_name != 'null' ? client[0].last_name : ''),
          fsa: arr.toString()
        });
        return res.json({ status: true, msg: "Added Successfully.", data: result });
      }
    }
  } catch (err) {
    console.log(err);
    return res.json({
      status: false,
      msg: "Something Went Wrong In Api",
      data: [],
    });
  }
};

agentController.addToMyNetwork = async (req, res, next) => {
  try {
    var userid = req.body.userId;
    // let data = await commonModel.selectAllWhere("agent", {
    //   email: req.body.email,
    // });
    let clientData = {
      user_id: userid,
      agent_id: req.body.agent_id_replace_to,
      agent_id_replace_to: req.body.agent_id_replace_to,
      fsa_id: req.body.fsa_id,
    };
    let result_client = await commonModel.insert("client_map", clientData);
    return res.json({
      status: true,
      msg: "Added Successfully.",
      data: result_client,
    });
  } catch (err) {
    console.log(err);
    return res.json({
      status: false,
      msg: "Something Went Wrong In Api",
      data: [],
    });
  }
};


// agentController.UnsubscribeAgent = async (req, res, next) => {
//   console.log(req.params,'unsubscribe======')
//   try {
//     let dataAgent = await commonModel.selectAllWhere("agent", { id: req.params.id, });
//     let fsadata = await commonModel.selectAllWhere("user_fsa", { user_id: req.params.id, activate_status: 1 });
//     console.log(fsadata,'fsadata')
//     await commonModel.update("user_fsa", { activate_status: 0 }, { user_id: req.params.id });
//     if (dataAgent[0].agent_type == 1) {
//       await commonModel.update("agent", { is_default_agent: 0, user_type: 2 }, { id: req.params.id });
//     }
//     if (dataAgent[0].agent_type == 0) {
//       await commonModel.update("agent", { is_default_agent: 0, user_type: 3 }, { id: req.params.id });
//     }

//     let a = await commonModel.fsadatabyid(fsadata[i].fsa_id)
//       console.log(a,'aaaaaaaaaa')
//       let c = a.map((e) => e.user_id);
//         console.log(c,'cccccccccccc')



//     // for (var i = 0; i < fsadata.length; i++) {
//     //   let a = await commonModel.fsadatabyid(fsadata[i].fsa_id)
//     //   console.log(a,'aaaaaaaaaa')
//     //   let c = a.map((e) => e.user_id);
//     //   console.log(c,'cccccccccccc')
//     //   var value = req.params.id
//     //   arr = c.filter(item => item != value)
//     //   console.log(arr,'arrrrrrrrrrrr',i,'ii')
//     //   var unique = arr.filter(function (item, i, ar) { return ar.indexOf(item) === i; });
//     //   console.log(unique,'uniqueeeeeeeeeee')
//     //   let de = await commonModel.checkDefault(unique);
//     //   console.log(de,'dedededededededededededede')
//     //   let uid = de.map((e) => e.user_id);
//     //   console.log(uid,'uididddddddddddddd',i)
//     //   var unique1 = uid.filter(function (item, i, ar) { return ar.indexOf(item) === i; });
//     //   console.log(unique1,'uunique111111111111')
//     //   if(unique1.length){ var data = await commonModel.countFsarequest(unique1); console.log(data,'999999999999')} 
//     //   else{ var data = [] }

//     //   console.log(data,'data============')
//     //   if (data.length) {
//     //     console.log('data====iffffffffff')
//     //     await commonModel.update("agent", { is_default_agent: 1, user_type: 2 }, { id: data[0].agent_id });
//     //     await commonModel.update("user_fsa", { activate_status: 1 }, { user_id: data[0].agent_id, fsa_id: fsadata[i].fsa_id })
//     //     await commonModel.update("user_fsa", { activate_status: 0 }, { id: fsadata[i].id })
//     //   }
//     //   else {
//     //     let value1 = await commonModel.checkdefaultAgent(unique);
//     //     console.log('data====elseeeeeeeee',value1)
//     //     if(value1.length){
//     //       await commonModel.update("agent", { is_default_agent: 1, user_type: 2 }, { id: value1[0].user_id });
//     //       await commonModel.update("user_fsa", { activate_status: 1 }, { user_id: value1[0].user_id, fsa_id: fsadata[i].fsa_id })
//     //       await commonModel.update("user_fsa", { activate_status: 0 }, { id: fsadata[i].id })
//     //     }
//     //     // emailDataOptOut = {
//     //     //   name: dataAgent[0].first_name + ' ' + (dataAgent[0].last_name != undefined && dataAgent[0].last_name != 'undefined' && dataAgent[0].last_name != 'null' && dataAgent[0].last_name != null ? dataAgent[0].last_name : ''),
//     //     //   phone: dataAgent[0].mobile,
//     //     //   email: dataAgent[0].email
//     //     // }
//     //     // let optOutMailRes = await mail.realtorOptOutMailToAdmin(emailDataOptOut);
//     //     // console.log(optOutMailRes,'optOutMailRes---')
//     //   }
//     // }
//   }
//   catch (err) {
//     console.log(err);
//     return res.json({
//       status: false,
//       msg: "Something Went Wrong In Api",
//       data: [],
//     });
//   }
// }

agentController.UnsubscribeAgent = async (req, res, next) => {
  try {
    let dataAgent = await commonModel.selectAllWhere("agent", { id: req.params.id, });
    let fsadata = await commonModel.selectAllWhere("user_fsa", { user_id: req.params.id, activate_status: 1 });
    if (fsadata[0]) await commonModel.update("user_fsa", { activate_status: 0, status: 1 }, { user_id: req.params.id });    // [02-12-2022]
    // if (fsadata[0]) await commonModel.update("user_fsa", { activate_status: 0, status: 3 }, { user_id: req.params.id, fsa_id: fsadata[0].fsa_id });
    if (dataAgent[0].agent_type == 1) {
      await commonModel.update("agent", { is_default_agent: 0, user_type: 2, unsubscribe: 1 }, { id: req.params.id });
    }
    if (dataAgent[0].agent_type == 0) {
      await commonModel.update("agent", { is_default_agent: 0, user_type: 3, unsubscribe: 1 }, { id: req.params.id });
    }

    if (fsadata.length != 0) {
      var FSAs = await commonModel.selectFSACodeForEmail(fsadata[0].fsa_id);
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

      for (var i = 0; i < fsadata.length; i++) {
        let a = await commonModel.fsadatabyid(fsadata[i].fsa_id)
        let c = a.map((e) => e.user_id);
        var value = req.params.id
        arr = c.filter(item => item != value)
        var unique = arr.filter(function (item, i, ar) { return ar.indexOf(item) === i; });
        if (unique.length) var de = await commonModel.checkDefault(unique); else var de = [];
        let uid = de.map((e) => e.user_id);
        var unique1 = uid.filter(function (item, i, ar) { return ar.indexOf(item) === i; });
        if (unique1.length) { var data = await commonModel.countFsarequest(unique1); }
        else { var data = [] }

        let RequestAgent = await commonModel.selectAllWhere("agent", { id: unique1[0] });
        if (unique1.length) {
          await commonModel.update("agent", { is_default_agent: 1, user_type: 2 }, { id: unique1[0] });
          await commonModel.update("user_fsa", { activate_status: 1 }, { user_id: unique1[0], fsa_id: fsadata[i].fsa_id })
          await commonModel.update("user_fsa", { activate_status: 0 }, { id: fsadata[i].id })

          // *************************************************
          var RequestAgentData = await commonModel.selectAllWhere("request", { id: req.params.reqId });

          let nextAgentData = {
            user_id: RequestAgentData[0].user_id,
            agent_id: unique1[0] ? unique1[0] : RequestAgentData[0].agent_id,
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

          await commonModel.update("request", { status: 2 }, { id: RequestAgentData[0].id });
          var reqRes = await commonModel.insert("request", nextAgentData);

          await mail.CreateRequest({
            req_id: reqRes.insertId,
            agent_id: RequestAgent[0].id,
            unsubscribe_agent: unique1[0],
            arrfsa: arrfsa.toString(),
            nieghborhood: arrNieghborhood.toString(),
            name: RequestAgent[0].first_name + " " + (RequestAgent[0].last_name != undefined && RequestAgent[0].last_name != 'undefined' && RequestAgent[0].last_name != null && RequestAgent[0].last_name != 'null' ? RequestAgent[0].last_name : ''),
            agent_email: RequestAgent[0].email,
            agent_name: RequestAgent[0].first_name + " " + (RequestAgent[0].last_name != undefined && RequestAgent[0].last_name != 'undefined' && RequestAgent[0].last_name != null && RequestAgent[0].last_name != 'null' ? RequestAgent[0].last_name : ''),
          });
          // ******************************************************
        }
        else {
          await commonModel.update("request", { status: 2 }, { id: req.params.reqId });  // add[22-11-22]

          emailDataOptOut = {
            name: dataAgent[0].first_name + ' ' + (dataAgent[0].last_name != undefined && dataAgent[0].last_name != 'undefined' && dataAgent[0].last_name != 'null' && dataAgent[0].last_name != null ? dataAgent[0].last_name : ''),
            phone: dataAgent[0].mobile,
            email: dataAgent[0].email
          }
          let optOutMailRes = await mail.realtorOptOutMailToAdmin(emailDataOptOut);
        }
      }
    }
  }
  catch (err) {
    console.log(err);
    return res.json({
      status: false,
      msg: "Something Went Wrong In Api",
      data: [],
    });
  }
}


agentController.getFsaCodeAndNeighborhood = async (req, res, next) => {
  try {
    let newdata = [];
    for (let index = 0; index < req.body.fsaArr.length; index++) {
      newdata.push(`'${req.body.fsaArr[index]}'`)
    }
    req.body.fsaString = newdata.toString();
    let result = await commonModel.getFsaCodeAndNeighborhood(req.body);
    // let result = await commonModel.selectAllWhere("fsa", { fsa_code: req.body.fsa_code, status: 1 });
    if (result.length) return res.json({ status: true, msg: resMessage.dataFound, data: result });
    else return res.json({ status: false, msg: resMessage.noDataFound, data: [], alreadyEntered: newdata.length != 0 ? 1 : 0 });
  } catch (err) {
    console.log(err);
    return res.json({ status: false, msg: resMessage.noDataFound, data: [] });
  }
};

agentController.getActiveAgentTotal = async (req, res, next) => {
  try {
    let result = await commonModel.getAgentsTotal();
    let getClientAgent = await commonModel.getClientAgent();
    result[0].getClientAgent = getClientAgent;

    return res.json({ status: true, data: result });
  } catch (err) {
    return res.json({ status: false, data: [] });
  }
}

agentController.getNextAgentId = async (req, res, next) => {
  try {
    let result = await commonModel.getNextClientAgent(req.params.id);
    return res.json({ status: true, data: result });
  } catch (err) {
    return res.json({ status: false, data: [] });
  }
}

agentController.getPreviousAgentId = async (req, res, next) => {
  try {
    let result = await commonModel.getPreviousClientAgent(req.params.id);

    return res.json({ status: true, data: result });
  } catch (err) {
    return res.json({ status: false, data: [] });
  }
}

agentController.getAgentAuthorizedStatus = async (req, res, next) => {
  try {
    let result = await commonModel.getAgentAuthorized(req.body.id);
    if (result.length) {
      return res.json({ status: true, msg: resMessage.dataFound, data: result });
    } else {
      return res.json({ status: false, msg: resMessage.noDataFound, data: [] });
    }
  } catch (err) {
    console.log(err);
    return res.json({ status: false, msg: resMessage.noDataFound, data: [] });
  }
};
agentController.getAgentByEmail = async (req, res, next) => {

  // console.log(req.body, "emaillll")
  let result = await commonModel.selectAllWhere('agent', { email: req.body.email });

  if (result.length) {
    return res.json({ status: true, msg: resMessage.dataFound, data: result });
  }
  return res.json({ status: false, msg: resMessage.noDataFound, data: [] });

}


// Patner Buttton--------------------------------------------------
agentController.getNextButton = async (req, res, next) => {
  // console.log(req.params, '-*****************--------');
  let result = await commonModel.getPatnerNextButton(req.params.id, req.body.status);
  // console.log(result,'-----------')
  if (result.length) {
    return res.json({ status: true, msg: resMessage.dataFound, data: result });
  }
  return res.json({ status: false, msg: resMessage.noDataFound, data: [] });

}

agentController.getPreviousButton = async (req, res, next) => {

  let result = await commonModel.getPatnerPreviusButton(req.params.id, req.body.status);
  // console.log(result,'-----------')
  if (result.length) {
    return res.json({ status: true, msg: resMessage.dataFound, data: result });
  }
  return res.json({ status: false, msg: resMessage.noDataFound, data: [] });

}
//-----------------------------------------------------------------

// User BUtttton --------------------------------------------

agentController.UserNextButton = async (req, res, next) => {
  if (req.body.status != 1 && req.body.status != 0) { req.body.status = '1,0' }
  let result = await commonModel.getUserNextButton(req.params.id, req.body.status);
  if (result.length) {
    return res.json({ status: true, msg: resMessage.dataFound, data: result });
  }
  return res.json({ status: false, msg: resMessage.noDataFound, data: [] });

}

agentController.UserPreviusButton = async (req, res, next) => {
  if (req.body.status != 1 && req.body.status != 0) { req.body.status = '1,0' }
  let result = await commonModel.getUserPreviusButton(req.params.id, req.body.status);
  if (result.length) {
    return res.json({ status: true, msg: resMessage.dataFound, data: result });
  }
  return res.json({ status: false, msg: resMessage.noDataFound, data: [] });

}


//-----------------------------------------------------------------------------------------------------------

//----------------- Client Button -------------------------------------------------------------------------

agentController.ClientNextButton = async (req, res, next) => {

  let result = await commonModel.getClentNextButton(req.params.id, req.body.status);

  if (result.length) {
    return res.json({ status: true, msg: resMessage.dataFound, data: result });
  }
  return res.json({ status: false, msg: resMessage.noDataFound, data: [] });

}

agentController.ClientPreviusButton = async (req, res, next) => {

  let result = await commonModel.getClientPreviusButton(req.params.id, req.body.status);

  if (result.length) {
    return res.json({ status: true, msg: resMessage.dataFound, data: result });
  }
  return res.json({ status: false, msg: resMessage.noDataFound, data: [] });

}



//------------------------------------------------------------------------------------------------------------

agentController.ChangAgentAuthorizedStatus = async (req, res, next) => {
  try {
    if (req.body.agent_authorized == 1) req.body.agent_authorized = 0;
    else req.body.agent_authorized = 1;
    await commonModel.update("agent_authorized", { agent_authorized: req.body.agent_authorized }, { id: req.params.id });
    return res.json({ status: true, msg: resMessage.statusChange });
  } catch (err) {
    return res.json({ status: false, msg: resMessage.statusChangeErr });
  }
};

agentController.getsubAdminList = async (req, res, next) => {
  // console.log(req.body,"========================")
  try {
    let result = await commonModel.selectsubadmin(
      'agent',
      { user_type: 5 },
      req.body.filter,
      req.body.status,
      req.body.count,
      req.body.limit
    );

    let total = await commonModel.subadmin_total()

    if (result.length) {
      for (let x of result) x.profile_img = process.env.image_path + x.profile_img;

      return res.json({ status: true, msg: resMessage.dataFound, data: result, total: total, });

    } else return res.json({ status: false, msg: resMessage.noDataFound, data: [] });

  } catch (err) {
    return res.json({ status: false, msg: resMessage.noDataFound, data: [] });
  }
}

agentController.getuserroles = async (req, res, next) => {
  // console.log(req.body, "----------------------------------")
  try {
    let result = await commonModel.selectAllWhere('subAdmin_pages', req.body)
    // console.log(result,"result----------------------------")
    if (result.length) {
      return res.json({ status: true, msg: resMessage.dataFound, data: result });
    } else return res.json({ status: false, msg: resMessage.noDataFound, data: [] });
  }
  catch (err) {
    return res.json({ status: false, msg: resMessage.noDataFound, data: [] });
  }
}


agentController.changeadminStatus = async (req, res, next) => {
  // console.log(req.body, "-----------------------------------       ------------")
  try {
    // if (req.body.status == 1) req.body.status = 0;
    // else req.body.status = 1;
    await commonModel.update("agent", { status: req.body.status }, { id: req.params.id });
    return res.json({ status: true, msg: resMessage.statusChange });
  } catch (err) {
    return res.json({ status: false, msg: resMessage.statusChangeErr });
  }
};

agentController.getsubadminById = async (req, res, next) => {

  try {
    let result = await commonModel.getsubadminById(req.params.id);
    for (let x of result) x.profile_img = process.env.image_path + x.profile_img;
    return res.json({ status: true, msg: resMessage.dataFound, data: result });
  } catch (err) {
    return res.json({ status: false, msg: resMessage.noDataFound });
  }
};



agentController.myAgentDataById = async (req, res, next) => {

  try {
    let data = [];
    let data1 = [];
    let result = await commonModel.myAgentData(req.body.id);
    const ids = result.map(o => o.fsa_id)
    result = result.filter(({ fsa_id }, index) => !ids.includes(fsa_id, index + 1))

    for (i = 0; i < result.length; i++) {
      data1 = await commonModel.myAddedAgentData(result[i].agent_id);
      data1[0].FSAData = await commonModel.myAddedAgentFSAData(result[i].fsa_id);
      data1[0].FSAData[0].created_date = result[i].created_date
      data.push(data1[0]);
    }
    for (let x of data) x.profile_img = process.env.image_path + x.profile_img;
    return res.json({ status: true, msg: resMessage.dataFound, data: data });
  }
  catch (err) {
    return res.json({ status: false, msg: resMessage.noDataFound });
  }
};


agentController.myClientData = async (req, res, next) => {
  try {
    let data = [];
    let data1 = [];
    let result = await commonModel.myClientData(req.body.id);
    for (i = 0; i < result.length; i++) {
      data1 = await commonModel.myAddedClientData(result[i].user_id);
      data1[0].FSAData = await commonModel.myAddedAgentFSAData(result[i].fsa_id);
      data1[0].created_date = result[i].created_date;
      data.push(data1[0]);
    }
    for (let x of data) x.profile_img = process.env.image_path + x.profile_img;
    return res.json({ status: true, msg: resMessage.dataFound, data: data });
  }
  catch (err) {
    return res.json({ status: false, msg: resMessage.noDataFound });
  }
};

agentController.addNoteData = async (req, res, next) => {
  // console.log(req.body,'*************');

  try {
    let result = await commonModel.insert("notepad",
      {
        user_id: req.body.id,
        note: req.body.note
      })
    return res.json({ status: true, msg: resMessage.addSucc });

  }
  catch (err) {
    return res.json({ status: false, msg: resMessage.noDataFound });
  }
};

agentController.getNoteData = async (req, res, next) => {
  // console.log(req.body,'/-------------------------------------');

  try {
    let result = await commonModel.getNodeData(req.body.id);

    return res.json({ status: true, msg: resMessage.addSucc, data: result });

  }
  catch (err) {
    return res.json({ status: false, msg: resMessage.noDataFound });
  }
};

agentController.editNoteData = async (req, res, next) => {


  try {
    console.log("notepad", req.params.id, req.body);

    let result = await commonModel.update02("notepad", req.params.id, req.body);

    console.log('//////////////----------------------', result);
    return res.json({ status: true, msg: resMessage.edit });

  }
  catch (err) {
    return res.json({ status: false, msg: resMessage.noDataFound });
  }
};



module.exports = agentController;
