const commonModel = require('../models/commonModel');
// const myProgramModel = require('../models/myProgramModel');
const fsaController = function () { };
const resMessage = require('../helpers/res-message');
const mail = require('../helpers/mail');
const fs = require('fs');
const bcryptjs = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { use } = require('../routes/routes');
const cron = require('node-cron');
const { address } = require('ip');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');

// fsaController.getActiveFSA_total = async (req, res, next) => {
//     try {
//         // let result = await commonModel.selectAll("fsa");
//         let result_total = await commonModel.getFSAwithDefaultAgent_total();
//         return res.json({ status: true, data: result_total });
//     } catch (err) {
//         console.log(err,'err')
//         return res.json({ status: false, data: [] });
//     }
// }

// fsaController.getActiveFSA = async (req, res, next) => {

//     try {
//         if (req.query.count) req.query.count = parseInt(req.query.count + "0");
//         let result = await commonModel.getFSAwithDefaultAgent(req.query.search, req.query.count);
//         // let result_total = await commonModel.getFSAwithDefaultAgent_total();
//         // console.log(result_total,'toal')
//         return res.json({ status: true, data: result, total:result_total });
//     } catch (err) {
//         return res.json({ status: false, data: [] });
//     }
// }


fsaController.getActiveFSA = async (req, res, next) => {
    try {
        // if(req.body.limit == 0 || null || undefined) req.body.limit = 20;
        // if (req.query.count) req.query.count = parseInt(req.query.count + "0");
        if (req.query.count) req.query.count = parseInt(req.query.count * req.query.limit);

        let result = await commonModel.getFSAwithDefaultAgent(req.query.search, req.query.count, req.query.limit);
        let result_total = await commonModel.getFSAwithDefaultAgent_total();
        for (let m = 0; m < result.length; m++) {
            result[m].agent = await commonModel.getFSADefaultAgentAddress(result[m].id);
        }
        return res.json({ status: true, data: result, total: result_total });
    } catch (err) {
        console.log(err)
        return res.json({ status: false, data: [] });
    }
}


fsaController.getActiveFSATotal = async (req, res, next) => {
    try {
        let result = await commonModel.getFSAtotal();
        return res.json({ status: true, data: result });
    } catch (err) {
        return res.json({ status: false, data: [] });
    }
}



fsaController.getActiveFSAWithDefaultAgent = async (req, res, next) => {
    try {
        let agentdata = await commonModel.getActiveFSAWithDefaultAgent(req.params.id);
        if (agentdata.length > 0) return res.json({ status: true, data: { name: agentdata[0].first_name + ' ' + agentdata[0].last_name } });
        else return res.json({ status: true, data: { name: 'Not found' } });

    } catch (err) {
        return res.json({ status: false, data: [] });
    }
}

fsaController.getActiveFSAStatus = async (req, res, next) => {
    try {
        let result = await commonModel.getActiveFSAStatus();
        return res.json({ status: true, data: result });
    } catch (err) {
        return res.json({ status: false, data: [] });
    }
}


fsaController.getActiveFSAIdAndData = async (req, res, next) => {
    try {
        let result = await commonModel.getActiveFSAIdAndData();
        return res.json({ status: true, data: result });
    } catch (err) {
        return res.json({ status: false, data: [] });
    }
}

fsaController.getActiveFsaWithAdderess = async (req, res, next) => {
    try {
        let result = await commonModel.getActiveFSAWithAdderess()
        return res.json({ status: true, data: result })
    } catch (err) {
        console.log(err);
        return res.json({ status: false, data: [] });
    }
}

fsaController.getActiveFSAForMap = async (req, res, next) => {
    try {
        var arr = [];
        let result = await commonModel.selectAllWhere("fsa", { status: 1 });
        for (let index = 0; index < result.length; index++) {
            arr.push(result[index].id);
        }
        return res.json({ status: true, data: result, fsaArr: arr });

    } catch (err) {
        return res.json({ status: false, data: [] });
    }
}

fsaController.fsaById = async (req, res, next) => {
    try {
        let result = await commonModel.selectAllWhere("fsa", { id: req.params.id });
        return res.json({ status: true, data: result });
    } catch (err) {
        return res.json({ status: false, data: [] });
    }
}

fsaController.fsaAddressById = async (req, res, next) => {
    try {
        let result = await commonModel.selectAllWhere("fsa", { id: req.params.id });
        return res.json({ status: true, data: result });
    } catch (err) {
        return res.json({ status: false, data: [] });
    }
}

fsaController.fsaName = async (req, res, next) => {
    try {
        let result = await commonModel.update01("fsa", req.params.id, req.body);
        return res.json({ status: true, msg: 'FSA Name Changed Successfully.', data: result });
    } catch (err) {
        return res.json({ status: false, data: [] });
    }
}
fsaController.neighborhood = async (req, res, next) => {
    try {
        let result = await commonModel.update01("fsa", req.params.id, { nieghborhood: req.body.address });
        return res.json({ status: true, msg: 'neighborhood Changed Successfully.', data: result });
    } catch (err) {
        return res.json({ status: false, data: [] });
    }
}

fsaController.FSAChangeStatus = async (req, res, next) => {

    try {
        if (req.body.status == 1) req.body.status = 0;
        else req.body.status = 1;
        await commonModel.update("fsa", { status: req.body.status }, { id: req.params.id });
        return res.json({ status: true, msg: 'Status Changed Successfully.' });
    } catch (err) {
        return res.json({ status: false, msg: 'Status Change Failed.' });
    }
}

// Dev Sir
// fsaController.changeFSAAgentStatus = async (req, res, next) => {
//     console.log('deeeeeeeeeee',req.body)
//     // console.log('deeeeeeparamseeeee',req.params)
//     try {
//             if (req.body.fsa_status == 1) {
//                 req.body.fsa_status = 0;
//                 await commonModel.update("user_fsa", {activate_status:0},{user_id:req.body.id,fsa_id:req.body.fsa_id});
//                 let checkIf = await commonModel.selectAllWhere('user_fsa',{activate_status:1,user_id:req.body.id});
//                 // console.log('-------------------------------',checkIf.length)
//                 if(checkIf.length == 0){
//                     await commonModel.update01("agent", req.body.id, { user_type: 3, is_default_agent: 0 });
//                 }
//                 return res.json({ status: true, msg: 'Default Agent Removed Successfully.' });
//             }
//             else {
//                 req.body.fsa_status = 1;
//                 let getDefaultAgent = await commonModel.selectAllWhere('user_fsa',{activate_status:1,fsa_id:req.body.fsa_id});
//                 console.log(getDefaultAgent,'getDefaultAgent')
//                 await commonModel.update("user_fsa", {activate_status:0},{fsa_id:req.body.fsa_id});
//                 await commonModel.update01("agent", req.body.id, { user_type: 2, is_default_agent: 1 });
//                 await commonModel.update("user_fsa", {activate_status:1},{user_id:req.body.id,fsa_id:req.body.fsa_id});

//                 if(getDefaultAgent.length > 0){
//                     let checkIf = await commonModel.selectAllWhere('user_fsa',{activate_status:1,user_id:getDefaultAgent[0].user_id});
//                     // console.log('------------------4444444444-------------',checkIf.length)
//                     if(checkIf.length == 0){
//                         await commonModel.update01("agent", req.body.id, { user_type: 3, is_default_agent: 0 });
//                     }
//                     await commonModel.update01("agent", getDefaultAgent[0].user_id, { user_type: 3, is_default_agent: 0 });

//                 }
//                  return res.json({ status: true, msg: 'Default Agent Added Successfully.' });
//             }
//     } catch (err) {
//         console.log(err)
//         return res.json({ status: false, data: [] });
//     }
// }

//Azhar

// fsaController.changeFSAAgentStatus = async (req,res,next) => {
//     console.log(req.body,'body')
//     // if (req.body.count) req.body.count = parseInt(req.body.count * req.body.limit);
//     try {

//         if(req.body.fsa_status == 1){
//             console.log('active')
//             req.body.fsa_status = 0;
//             console.log(req.body.fsa_status,'part 1 status Active');
//             let Data = await commonModel.selectAllWhere('user_fsa',{id: req.body.fsa_id});
//             console.log(Data,'data')
//             let checkIf = await commonModel.selectAllWhere('user_fsa',{activate_status:1,user_id:req.body.id});
//                             console.log('-------------------------------',checkIf.length)
//             let result = await commonModel.update("user_fsa", {activate_status:0},{user_id:req.body.id,fsa_id:req.body.fsa_id});
//             let result02 = await commonModel.update("agent", { user_type: 3, is_default_agent: 0 }, {id: req.body.id })
//             console.log(result02,'result02')
//             console.log(result,'result1')
//             return res.json({ status: true, msg: 'Default Agent Removed Successfully.' });
//         }else {
//             req.body.fsa_status = 1;
//             console.log('InActive')
//             console.log(req.body.fsa_status,'part 2 status');
//             let Data = await commonModel.selectAllWhere('user_fsa',{id: req.body.fsa_id});
//             console.log(Data,'data2')
//             let result = await commonModel.update("user_fsa", {activate_status:1},{user_id:req.body.id,fsa_id:req.body.fsa_id});
//             let result04 = await commonModel.update("agent", { user_type: 2, is_default_agent: 1 }, {id: req.body.id })
//             console.log(result04,'result04')
//             console.log(result,'result2')
//             return res.json({ status: true, msg: 'Default Agent Add Successfully.' });
//         }

//Dev sir

// fsaController.changeFSAAgentStatus = async (req, res, next) => {
//     console.log('deeeeeeeeeee',req.body)
//     // console.log('deeeeeeparamseeeee',req.params)
//     try {
//             if (req.body.fsa_status == 1) {
//                 req.body.fsa_status = 0;
//                 await commonModel.update("user_fsa", {activate_status:0},{user_id:req.body.id,fsa_id:req.body.fsa_id});
//                 let checkIf = await commonModel.selectAllWhere('user_fsa',{activate_status:1,user_id:req.body.id});
//                 if(checkIf.length == 0){
//                     // console.log('----------------if-----i----------',checkIf.length)
//                     await commonModel.update01("agent", req.body.id, { user_type: 3, is_default_agent: 0 });
//                 }
//                 return res.json({ status: true, msg: 'Default Agent Removed Successfully.' });
//             }
//             else {
//                 req.body.fsa_status = 1;
//                 let getDefaultAgent = await commonModel.selectAllWhere('user_fsa',{activate_status:1,fsa_id:req.body.fsa_id});
//                 console.log(getDefaultAgent,'getDefaultAgent')
//                 await commonModel.update("user_fsa", {activate_status:0},{fsa_id:req.body.fsa_id});
//                 await commonModel.update01("agent", req.body.id, { user_type: 2, is_default_agent: 1 });
//                 await commonModel.update("user_fsa", {activate_status:1},{user_id:req.body.id,fsa_id:req.body.fsa_id});

//                 if(getDefaultAgent.length > 0){
//                     let checkIf = await commonModel.selectAllWhere('user_fsa',{activate_status:1,user_id:getDefaultAgent[0].user_id});
//                     console.log('------------------4444444444-------------',checkIf.length)
//                     if(checkIf.length == 0){
//                         await commonModel.update01("agent", getDefaultAgent[0].user_id, { user_type: 3, is_default_agent: 0 });
//                     }
//                     let check = await commonModel.selectAllWhere('user_fsa',{activate_status:1,user_id:req.body.id});

//                     if(check.length == 0){
//                         await commonModel.update01("agent", req.body.id, { user_type: 3, is_default_agent: 0 });

//                     }


//     } catch (err) {
//         console.log(err)
//         return res.json({ status: false, data: [] });
//     }
// }


fsaController.changeFSAAgentStatus = async (req, res, next) => {
    try {
        if (req.body.fsa_status == 1) {
            let agentRecord = await commonModel.selectAllWhere('agent', { id: req.body.id });
            if (agentRecord[0].agent_type == 1) {
                req.body.fsa_status = 0;
                let result = await commonModel.update("user_fsa", { activate_status: 0, }, { user_id: req.body.id, fsa_id: req.body.fsa_id });
                let checkIf = await commonModel.selectAllWhere('user_fsa', { activate_status: 1, user_id: req.body.id });

                if (checkIf.length == 0) {
                    let check01 = await commonModel.update01("agent", req.body.id, { user_type: 2, is_default_agent: 0, agent_type: 1 });
                }
                return res.json({ status: true, msg: 'Default Agent Removed Successfully.' });
            } else {
                req.body.fsa_status = 0;
                let result = await commonModel.update("user_fsa", { activate_status: 0 }, { user_id: req.body.id, fsa_id: req.body.fsa_id });
                let checkIf = await commonModel.selectAllWhere('user_fsa', { activate_status: 1, user_id: req.body.id });
                if (checkIf.length == 0) {
                    // let check01 = await commonModel.update01("agent", req.body.id, { user_type: 3, is_default_agent: 0 }); // [15-11-22 vishal]
                    let check01 = await commonModel.update01("agent", req.body.id, { user_type: 3, is_default_agent: 0, agent_type: 0 });
                }
                return res.json({ status: true, msg: 'Default Agent Removed Successfully.' });
            }
        }
        else {
            req.body.fsa_status = 1;
            let getDefaultAgent = await commonModel.selectAllWhere('user_fsa', { activate_status: 1, fsa_id: req.body.fsa_id });
            let result01 = await commonModel.update("user_fsa", { activate_status: 0 }, { fsa_id: req.body.fsa_id });
            // let result02 = await commonModel.update01("agent", req.body.id, { user_type: 2, is_default_agent: 1 });
            let result04 = await commonModel.update("agent", { user_type: 2, is_default_agent: 1 }, { id: req.body.id })
            let result03 = await commonModel.update("user_fsa", { activate_status: 1 }, { user_id: req.body.id, fsa_id: req.body.fsa_id });
            if (getDefaultAgent.length > 0) {
                for (let i = 0; i < getDefaultAgent.length; i++) {
                    let checkIf = await commonModel.selectAllWhere('user_fsa', { activate_status: 1, user_id: getDefaultAgent[i].user_id });
                    if (checkIf.length == 0) {
                        if (getDefaultAgent[i].agent_type == 1) {
                            //   let check01 =  await commonModel.update01("agent", req.body.id, { user_type: 3, is_default_agent: 0 });
                            let check02 = await commonModel.update("agent", { user_type: 2, is_default_agent: 0, agent_type: 1 }, { id: req.body.id });
                            let result01 = await commonModel.update("user_fsa", { activate_status: 0, agent_type: 1 }, { fsa_id: req.body.fsa_id });
                        } else {
                            let check02 = await commonModel.update("agent", { user_type: 3, is_default_agent: 0, agent_type: 0 }, { id: req.body.id });
                            let result01 = await commonModel.update("user_fsa", { activate_status: 0, agent_type: 0 }, { fsa_id: req.body.fsa_id });
                        }
                    }
                    if (getDefaultAgent[i].agent_type == 1) {
                        let result05 = await commonModel.update("agent", { user_type: 2, is_default_agent: 0, agent_type: 1 }, { id: getDefaultAgent[i].user_id });
                        let result01 = await commonModel.update("user_fsa", { activate_status: 0, agent_type: 1 }, { fsa_id: getDefaultAgent[i].fsa_id });
                        //   let result05 =  await commonModel.update01("agent", getDefaultAgent[0].user_id, { user_type: 3, is_default_agent: 0 });
                    } else {
                        let result05 = await commonModel.update("agent", { user_type: 3, is_default_agent: 0, agent_type: 0 }, { id: getDefaultAgent[i].user_id });
                        let result01 = await commonModel.update("user_fsa", { activate_status: 0, agent_type: 0 }, { fsa_id: getDefaultAgent[i].fsa_id });
                    }
                }
            }
            return res.json({ status: true, msg: 'Default Agent Added Successfully.' });
        }
    } catch (err) {
        console.log(err)
        return res.json({ status: false, data: [] });
    }
}

// fsaController.changeFSAAgentStatus = async (req, res, next) => {
//     // console.log('deeeeeeeeeee',req.body.fsa_status)
//     // console.log('deeeeeeparamseeeee',req.body)
//     try {
//             if (req.body.fsa_status == 1) {
//                 let agentRecord =  await commonModel.selectAllWhere('agent',{id:req.body.id});
//                 console.log(agentRecord,'recorddddddd')
//                 if(agentRecord[0].agent_type == 1){
//                     console.log('ifififiififiififififiifif')
//                     req.body.fsa_status = 0;
//                     let result = await commonModel.update("user_fsa", {activate_status:0, agent_type:1},{user_id:req.body.id,fsa_id:req.body.fsa_id});
//                     // console.log(result,'result')
//                     let checkIf = await commonModel.selectAllWhere('user_fsa',{activate_status:1,user_id:req.body.id});
//                     // console.log('-------------------------------',checkIf,checkIf.length)
//                     if(checkIf.length == 0){
//                         let check01 = await commonModel.update01("agent", req.body.id, { user_type: 2, is_default_agent: 0 , agent_type:1});
//                         console.log(check01,'check01')
//                     }
//                     return res.json({ status: true, msg: 'Default Agent Removed Successfully.' });
//                 }else{
//                     console.log('elseeeeeeeeeelseeeeeeeeeelelelssese')
//                     req.body.fsa_status = 0;
//                     let result = await commonModel.update("user_fsa", {activate_status:0, agent_type:0},{user_id:req.body.id,fsa_id:req.body.fsa_id});
//                     // console.log(result,'result')
//                     let checkIf = await commonModel.selectAllWhere('user_fsa',{activate_status:1,user_id:req.body.id});
//                     // console.log('-------------------------------',checkIf,checkIf.length)
//                     if(checkIf.length == 0){
//                         let check01 = await commonModel.update01("agent", req.body.id, { user_type: 3, is_default_agent: 0 , agent_type:0});
//                         console.log(check01,'check01')
//                     }
//                     return res.json({ status: true, msg: 'Default Agent Removed Successfully.' });
//                 }
//             }
//             else {
//                 console.log('elseeee2222222')
//                 req.body.fsa_status = 1;
//                 // console.log(req.body.fsa_status,'status')
//                 let getDefaultAgent = await commonModel.selectAllWhere('user_fsa',{activate_status:1,fsa_id:req.body.fsa_id});
//                 console.log(getDefaultAgent,'getDefaultAgent')
//                 let result01 = await commonModel.update("user_fsa", {activate_status:0},{fsa_id:req.body.fsa_id});
//                 console.log(result01,'result01')
//                 // let result02 = await commonModel.update01("agent", req.body.id, { user_type: 2, is_default_agent: 1 });
//                 // console.log(result02,'result02')
//                 let result04 = await commonModel.update("agent", { user_type: 2, is_default_agent: 1, agent_type:0 }, {id: req.body.id })
//                 console.log(result04,'result04')
//                let result03 = await commonModel.update("user_fsa", {activate_status:1,agent_type:0},{user_id:req.body.id,fsa_id:req.body.fsa_id});
//                 console.log(result03,'result03')
//                 if(getDefaultAgent.length > 0){
//                     let checkIf = await commonModel.selectAllWhere('user_fsa',{activate_status:1,user_id:getDefaultAgent[0].user_id});
//                     console.log('------------------4444444444-------------',checkIf.length)
//                     if(checkIf.length == 0){
//                     //   let check01 =  await commonModel.update01("agent", req.body.id, { user_type: 3, is_default_agent: 0 });
//                     //   console.log(check01,'check01')
//                        let check02 = await commonModel.update("agent",{ user_type: 3, is_default_agent: 0 },{id: req.body.id});
//                        console.log(check02,'check02')


//                     }
//                     let result05 = await commonModel.update("agent",{ user_type: 3, is_default_agent: 0 },{ id:getDefaultAgent[0].user_id})
//                 //   let result05 =  await commonModel.update01("agent", getDefaultAgent[0].user_id, { user_type: 3, is_default_agent: 0 });
//                   console.log(result05,'result05')

//                 }
//                  return res.json({ status: true, msg: 'Default Agent Added Successfully.' });
//             }
//     } catch (err) {
//         console.log(err)
//         return res.json({ status: false, data: [] });
//     }
// }



// fsaController.changeFSAAgentStatus = async (req, res, next) => {
//     console.log('deeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',req.body)
//     // console.log('deeeeeeparamseeeee',req.params)

//     try {
//             if (req.body.fsa_status == 1) {
//                 // console.log(req.body)
//                 req.body.fsa_status = 0;
//                 await commonModel.update("user_fsa", {activate_status:0},{user_id:req.body.id,fsa_id:req.body.fsa_id});
//                 let checkIf = await commonModel.selectAllWhere('user_fsa',{activate_status:1,user_id:req.body.id});

//                 //    let agentdata = await commonModel.selectAllWhere('agent', {id:req.body.id})
//             //    console.log(checkIf,"hkjhkjhkjhkjh")
//             //    console.log(agentdata[0].agent_type,"kjkjkljkjkljj")
//                 if(checkIf.length == 0){
//                     console.log('----------------if-----i----------',checkIf.length)
//                     await commonModel.update01("agent", req.body.id, { user_type: 3, is_default_agent: 0 });
//                 }
//                 // await commonModel.update01("agent", req.body.id, { user_type: agentdata[0].agent_type ,is_default_agent: 0 });
//                 //  await commonModel.update01("agent", req.body.id, { user_type: agentdata[0].agent_type });
//                 return res.json({ status: true, msg: 'Default Agent Removed Successfully.' });
//             }
//             else {
//                 req.body.fsa_status = 1;
//                 let getDefaultAgent = await commonModel.selectAllWhere('user_fsa',{activate_status:1,fsa_id:req.body.fsa_id});
//                 console.log(getDefaultAgent,'getDefaultAgent')
//                 await commonModel.update("user_fsa", {activate_status:0},{fsa_id:req.body.fsa_id});
//                 await commonModel.update01("agent", req.body.id, { user_type: 2, is_default_agent: 1 , agent_type:req.body.user_type});
//                 await commonModel.update("user_fsa", {activate_status:1},{user_id:req.body.id,fsa_id:req.body.fsa_id});

//                 if(getDefaultAgent.length > 0){
//                     let checkIf = await commonModel.selectAllWhere('user_fsa',{activate_status:1,user_id:getDefaultAgent[0].user_id});
//                     console.log('------------------4444444444-------------',checkIf.length)
//                     if(checkIf.length == 0){
//                         await commonModel.update01("agent", getDefaultAgent[0].user_id, { user_type: 3, is_default_agent: 0 });
//                     }
//                     let check = await commonModel.selectAllWhere('user_fsa',{activate_status:1,user_id:req.body.id});

//                     if(check.length == 0){
//                         await commonModel.update01("agent", req.body.id, { user_type: 3, is_default_agent: 0 });

//                     }


//                 }
//                  return res.json({ status: true, msg: 'Default Agent Added Successfully.' });
//             }
//     } catch (err) {
//         console.log(err)
//         return res.json({ status: false, data: [] });
//     }
// }







// fsaController.changeFSAAgentStatus = async (req, res, next) => {
//     console.log('deeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', req.body)


//     try {
//         if (req.body.fsa_status == 1) {

//             console.log('dhfgkjhfskljghkjfdklgfjldfhgklfsklgggggggggggggjggggjjjjjjjjjjjjjjjjjj')

//             req.body.fsa_status = 0;
//             await commonModel.update("user_fsa", { activate_status: 0 }, { user_id: req.body.id, fsa_id: req.body.fsa_id });
//                 let count = await commonModel.fsacount(req.body.id)

//             if (count[0].total == 0 && count[0].agent_type == 3) {
//                 await commonModel.update01("agent", req.body.id, { user_type: 3, is_default_agent: 0 });
//             }

//             if (count[0].total == 0 && count[0].agent_type == 2){              
//                 await commonModel.update01("agent", req.body.id, { user_type: 2, is_default_agent: 0 });
//             }

//             // if (count[0].total != 0 && count[0].agent_type == 2) {
//             //     await commonModel.update01("agent", req.body.id, { user_type: 2, is_default_agent: 1 });
//             // }


//             // if (count[0].total != 0 && count[0].agent_type == 3) {
//             //     await commonModel.update01("agent", req.body.id, { user_type: 3, is_default_agent: 1 });
//             // }




//             return res.json({ status: true, msg: 'Default Agent Removed Successfully.' });
//         }
//         else {
//             // console.log('kjhkjhkjghfskjvghdkjshfkjh')
//             req.body.fsa_status = 1;
//             let getDefaultAgent = await commonModel.selectAllWhere('user_fsa', { activate_status: 1, fsa_id: req.body.fsa_id });
//             console.log('getDefaultAgedyhdgfhdgsfhdtsyhnt')
//             await commonModel.update("user_fsa", { activate_status: 0 }, { fsa_id: req.body.fsa_id });

//             let data = await commonModel.fsacount(req.body.id)
//           if(data[0].total == 0 ){
//             await commonModel.update01("agent", req.body.id, { user_type: 2, is_default_agent: 1, agent_type: req.body.user_type });
//              }

//             await commonModel.update("user_fsa", { activate_status: 1 }, { user_id: req.body.id, fsa_id: req.body.fsa_id });

//             if (getDefaultAgent.length > 0) {
//                 let checkIf = await commonModel.selectAllWhere('user_fsa', { activate_status: 1, user_id: getDefaultAgent[0].user_id });
//                 console.log('------------------4444444444-------------', checkIf.length)
//                 if (checkIf.length == 0) {
//                     await commonModel.update01("agent", getDefaultAgent[0].user_id, { user_type: 3, is_default_agent: 0 });
//                 }
//                 let check = await commonModel.selectAllWhere('user_fsa', { activate_status: 1, user_id: req.body.id });

//                 if (check.length == 0) {
//                     await commonModel.update01("agent", req.body.id, { user_type: 3, is_default_agent: 0 });

//                 }


//             }
//             return res.json({ status: true, msg: 'Default Agent Added Successfully.' });
//         }
//     } catch (err) {
//         console.log(err)
//         return res.json({ status: false, data: [] });
//     }
// }



fsaController.getDefaultAgent = async (req, res, next) => {
    try {
        var FSAdata = await commonModel.selectAllWhere('fsa', { fsa_code: req.params.id });
        var userData = await commonModel.selectAllWhere('agent', { fsa_id: FSAdata[0].id, parent_id: 1 });
        for (var i = 0; i < userData.length; i++) {
            userData[i].profile_img = process.env.image_path + userData[i].profile_img;
        } return res.json({ status: true, data: userData });
    } catch (err) {
        return res.json({ status: false, data: [] });
    }
}

fsaController.checkMapAgentExist = async (req, res, next) => {
    try {
        let getAgents = await commonModel.selectAllWhere("client_map", { user_id: req.body.user_id });
        if (getAgents.length) return res.json({ status: true, msg: resMessage.dataFound });
        else return res.json({ status: false, msg: resMessage.mapAgents });
    } catch (err) {
        return res.json({ status: false, msg: resMessage.mapAgents });
    }
}
// old
// fsaController.getDefaultAgentPost = async (req, res, next) => {
//     try {
//         if (req.body.user_type == 2 && req.body.changeNetWork == 2) {
//             console.log('if')
//             let ar = [];
//             let FSAdata = [], getFsa, FsaId = [], fsa;

//             let fsaRes = await commonModel.selectAllWhere('client_map', { user_id: req.body.user_id });
//             for (let zk = 0; zk < fsaRes.length; zk++) {
//                 ar.push(fsaRes[zk].fsa_id)
//             }
//             if (ar.length > 0) {

//                 FSAdata = await commonModel.GetAgentActiveStatus(ar.toString());
//                 for (let index = 0; index < FSAdata.length; index++) {
//                     var tempData = await commonModel.selectAllWhere('agent', { id: FSAdata[index].user_id });
//                     if (tempData[0] == undefined) {
//                         delete FSAdata[index];
//                     } else {
//                         if (tempData[0].user_type == 2 && tempData[0].is_default_agent == 1) {
//                             if (req.body.user_id != null) {
//                                 let checkInClientMap = await commonModel.selectAllWhere('client_map', { fsa_id: FSAdata[index].fsa_id, user_id: req.body.user_id, agent_id_replace_to: tempData[0].id })
//                                 if (checkInClientMap.length > 0) {
//                                     tempData = await commonModel.selectAllWhere('agent', { id: checkInClientMap[0].agent_id });
//                                 }
//                             }
//                             tempData[0].profile_img = process.env.image_path + tempData[0].profile_img;
//                             FSAdata[index].userData = tempData[0];
//                         } else {
//                             delete FSAdata[index];

//                         }

//                     }

//                 }

//             }
//             return res.json({ status: true, data: FSAdata, changeNetWork: req.body.changeNetWork });

//         } else {
//             console.log('else')

//             let FSAdata, getFsa, FsaId = [], fsa;
//             // let getAgents = await commonModel.selectAllWhere("client_map", { user_id: req.body.user_id });
//             // if (req.body.user_type == 2 && req.body.changeNetWork == 2 && getAgents.length) {
//             //     for (let x of getAgents) {
//             //         getFsa = await commonModel.selectAllWhere("user_fsa", { user_id: x.agent_id, activate_status: 1 });
//             //         fsa = getFsa.map(e => e.fsa_id);
//             //         FsaId = [...FsaId, ...fsa];
//             //     }
//             //     let unique = [...new Set(FsaId.map(item => item))];
//             //     FSAdata = await commonModel.GetAgentActiveStatus(unique);
//             // } else {
//             req.body.changeNetWork = 1;
//             FSAdata = await commonModel.GetAgentActiveStatus(req.body.fsa.toString());
//             // }

//             for (let index = 0; index < FSAdata.length; index++) {
//                 var tempData = await commonModel.selectAllWhere('agent', { id: FSAdata[index].user_id });
//                 // var tempData = await commonModel.selectAllWhere('agent', { id: FSAdata[index].user_id, is_default_agent: 1 });
//                 if (tempData[0] == undefined) {
//                     delete FSAdata[index];
//                 } else {
//                     // if(req.body.user_id != null){
//                     //     let checkInClientMap = await commonModel.selectAllWhere('client_map',{fsa_id:FSAdata[index].fsa_id,user_id:req.body.user_id,agent_id_replace_to:tempData[0].id})
//                     //     if(checkInClientMap.length > 0){
//                     //         tempData = await commonModel.selectAllWhere('agent', { id: checkInClientMap[0].agent_id });
//                     //     }
//                     // }
//                     // tempData[0].profile_img = process.env.image_path + tempData[0].profile_img;
//                     // FSAdata[index].userData = tempData[0];

//                     if (tempData[0].user_type == 2 && tempData[0].is_default_agent == 1) {
//                         if (req.body.user_id != null) {
//                             let checkInClientMap = await commonModel.selectAllWhere('client_map', { fsa_id: FSAdata[index].fsa_id, user_id: req.body.user_id, agent_id_replace_to: tempData[0].id })
//                             if (checkInClientMap.length > 0) {
//                                 console.log('checkInClientMap', checkInClientMap)
//                                 tempData = await commonModel.selectAllWhere('agent', { id: checkInClientMap[0].agent_id });
//                             }
//                         }
//                         tempData[0].profile_img = process.env.image_path + tempData[0].profile_img;
//                         FSAdata[index].userData = tempData[0];
//                     } else {
//                         delete FSAdata[index];

//                     }
//                 }

//             }
//             // if (!getAgents.length) return res.json({ status: false, msg: "No agent found in your map!", data: FSAdata, changeNetWork: 1 });
//             return res.json({ status: true, data: FSAdata, changeNetWork: req.body.changeNetWork });
//         }


//     } catch (err) {
//         console.log(err)
//         return res.json({ status: false, data: [] });
//     }
// }

// orignal (last running function before lakshya change anything )
// fsaController.getDefaultAgentPost01 = async (req, res, next) => {
//     try {
//         if (req.body.user_type == 2 && req.body.changeNetWork == 2) {
//             let ar = [];
//             let FSAdata = [], getFsa, FsaId = [], fsa;
//             let fsaRes = await commonModel.selectAllWhere('client_map', { user_id: req.body.user_id });

//             // changed for show logged In profile START //
//             let fsaRes01 = await commonModel.selectAllWhere('client_map', { user_id: req.body.user_id, agent_id: req.body.user_id });
//             // changed for show logged In profile END //

//             for (let zk = 0; zk < fsaRes.length; zk++) {
//                 ar.push(fsaRes[zk].fsa_id)
//             }
//             if (ar.length > 0) {
//                 FSAdata = await commonModel.GetAgentActiveStatus(ar.toString());

//                 // changed for show logged In profile START //
//                 for (let z = 0; z < FSAdata.length; z++) {
//                     for (let y = 0; y < fsaRes01.length; y++) {
//                         if (fsaRes01[y].fsa_id == FSAdata[z].fsa_id) {
//                             FSAdata[z].user_id = fsaRes01[y].agent_id
//                         }
//                     }
//                 }
//                 // changed for show logged In profile END //               

//                 for (let index = 0; index < FSAdata.length; index++) {
//                     var tempData = await commonModel.selectAllWhere('agent', { id: FSAdata[index].user_id });
//                     if (tempData[0] == undefined) {
//                         delete FSAdata[index];
//                     } else {
//                         if (tempData[0].user_type == 2 && tempData[0].is_default_agent == 1) {
//                             if (req.body.user_id != null) {
//                                 let checkInClientMap = await commonModel.selectAllWhere('client_map', { fsa_id: FSAdata[index].fsa_id, user_id: req.body.user_id, agent_id_replace_to: tempData[0].id })

//                                 if (checkInClientMap.length > 0) {
//                                     for (let y = 0; y < checkInClientMap.length; y++) {                                       
//                                         tempData = await commonModel.selectAllWhere('agent', { id: checkInClientMap[checkInClientMap.length - 1].agent_id });
//                                     }
//                                 }
//                             }
//                             let thumbImg = tempData[0].profile_img
//                             tempData[0].profile_img = process.env.image_path + thumbImg;
//                             tempData[0].thumbnailProfile_img = process.env.thumbnailImg_path + thumbImg;
//                             FSAdata[index].userData = tempData[0];
//                         } else {
//                             delete FSAdata[index];
//                         }
//                     }
//                 }
//             }

//             const results = FSAdata.filter(element => {
//                 if (Object.keys(element).length !== 0) {
//                     return true;
//                 }

//                 return false;
//             });
//             return res.json({ status: true, data: results, changeNetWork: req.body.changeNetWork });

//         } else {
//             let FSAdata, getFsa, FsaId = [], fsa;
//             req.body.changeNetWork = 1;

//             if (req.body.fsa != undefined) {
//                 FSAdata = await commonModel.GetAgentActiveStatus(req.body.fsa.toString());
//             }

//             if (req.body.user_id != null) {
//                 var LoggedInUser = await commonModel.selectAllWhere('agent', { id: req.body.user_id });
//                 LoggedInUser[0].profile_img0 = LoggedInUser[0].profile_img;
//                 LoggedInUser[0].profile_img = ''
//                 var profileLogged = LoggedInUser[0].profile_img0;
//                 var LoggedInUser_FSAs = await commonModel.LoggedInUser_FSA(req.body.user_id);
//                 if (LoggedInUser_FSAs[0].fsa_ids != null) {
//                     var FSA_Arr = LoggedInUser_FSAs[0].fsa_ids.split(",");
//                 }
//                 var LoggedDefault_FSA = await commonModel.LoggedDefault_FSA(LoggedInUser_FSAs[0].fsa_ids);

//                 var defaultUserFSAData = await commonModel.defaultUserFSAData(LoggedDefault_FSA[0].user_ids);
//             }

//             if (FSAdata) {
//                 for (let index = 0; index < FSAdata.length; index++) {
//                     var tempData = await commonModel.selectAllWhere('agent', { id: FSAdata[index].user_id, status: 1 });
//                     if (tempData[0] == undefined) {
//                         delete FSAdata[index];
//                     } else {

//                         if (tempData[0].user_type == 2 && tempData[0].is_default_agent == 1) {
//                             if (req.body.user_id != null) {
//                                 let checkInClientMap = await commonModel.selectAllWhere('client_map', { fsa_id: FSAdata[index].fsa_id, user_id: req.body.user_id, agent_id_replace_to: tempData[0].id })
//                                 if (checkInClientMap.length > 0) {
//                                     for (let y = 0; y < checkInClientMap.length; y++) {
                                        
//                                         tempData = await commonModel.selectAllWhere('agent', { id: checkInClientMap[checkInClientMap.length - 1].agent_id });
//                                     }
//                                 }
//                             }

//                             let thumbImg0 = tempData[0].profile_img
//                             tempData[0].profile_img = process.env.image_path + thumbImg0;
//                             tempData[0].thumbnailProfile_img = process.env.thumbnailImg_path + thumbImg0;
//                             FSAdata[index].userData = tempData[0];

//                             // changed for show logged In profile START //                            
//                             if (FSA_Arr != undefined) {
//                                 for (let y = 0; y < FSA_Arr.length; y++) {
//                                     var thumbImg1 = profileLogged
//                                     if (FSAdata[index].fsa_id == FSA_Arr[y]) {
//                                         delete FSAdata[index].userData;
//                                         LoggedInUser[0].profile_img = process.env.image_path + thumbImg1;
//                                         LoggedInUser[0].thumbnailProfile_img = process.env.thumbnailImg_path + thumbImg1;
//                                         FSAdata[index].userData = LoggedInUser[0];
//                                         LoggedInUser[0].profile_img0 = '';
//                                     }
//                                 }
//                             }
//                             // changed for show logged In profile END //
//                         } else {
//                             delete FSAdata[index];
//                         }
//                     }
//                 }
//             }
//             return res.json({ status: true, data: FSAdata, changeNetWork: req.body.changeNetWork });
//         }

//     } catch (err) {
//         console.log(err)
//         return res.json({ status: false, data: [] });
//     }
// }
// modified by lakshya
fsaController.getDefaultAgentPost = async (req, res, next) => {
    try {
        if (req.body.user_type == 2 && req.body.changeNetWork == 2) {
            let ar = [];
            let FSAdata = [], getFsa, FsaId = [], fsa;
            let fsaRes = await commonModel.selectColumnWhere('client_map', { user_id: req.body.user_id },'fsa_id');

            // changed for show logged In profile START //
            let fsaRes01 = await commonModel.selectColumnWhere('client_map', { user_id: req.body.user_id, agent_id: req.body.user_id },'fsa_id,agent_id');
            // changed for show logged In profile END //

            // for (let zk = 0; zk < fsaRes.length; zk++) {
            //     ar.push(fsaRes[zk].fsa_id)
            // }
            ar = fsaRes.map(item => item.fsa_id);

            if (ar.length > 0) {
                FSAdata = await commonModel.GetAgentActiveStatus(ar.toString());

                // changed for show logged In profile START //
                // for (let z = 0; z < FSAdata.length; z++) {
                //     for (let y = 0; y < fsaRes01.length; y++) {
                //         if (fsaRes01[y].fsa_id == FSAdata[z].fsa_id) {
                //             FSAdata[z].user_id = fsaRes01[y].agent_id
                //         }
                //     }
                // }
                const fsaRes01Map = new Map(fsaRes01.map(item => [item.fsa_id, item.agent_id]));
                FSAdata.forEach(fsaItem => {
                    if (fsaRes01Map.has(fsaItem.fsa_id)) {
                        fsaItem.user_id = fsaRes01Map.get(fsaItem.fsa_id);
                    }
                });
                // changed for show logged In profile END //               

                for (let index = 0; index < FSAdata.length; index++) {
                    var tempData = await commonModel.selectColumnWhere('agent', { id: FSAdata[index].user_id },"user_type,id,first_name,last_name,email,profile_img,address,pinMapLat,pinMapLng,mobile,fsa_id,fsa_name,enteredBy,brokerPhoneNo,whatsapp,messenger,facebook,wechat,brokerageName,BrokerageStreetAddress,status,is_default_agent,website,agent_type");
                    if (tempData[0] == undefined) {
                        delete FSAdata[index];
                    } else {
                        if (tempData[0].user_type == 2 && tempData[0].is_default_agent == 1) {
                            if (req.body.user_id != null) {
                                let checkInClientMap = await commonModel.selectColumnWhere('client_map', { fsa_id: FSAdata[index].fsa_id, user_id: req.body.user_id, agent_id_replace_to: tempData[0].id },'agent_id')

                                if (checkInClientMap.length > 0) {
                                    // for (let y = 0; y < checkInClientMap.length; y++) { // we dont need this loop any more as we getting the latest value always
                                    //     tempData = await commonModel.selectAllWhere('agent', { id: checkInClientMap[checkInClientMap.length - 1].agent_id });
                                    // }
                                    let lastAgentId = checkInClientMap[checkInClientMap.length - 1].agent_id;
                                    tempData = await commonModel.selectColumnWhere('agent', { id: lastAgentId },"user_type,id,first_name,last_name,email,profile_img,address,pinMapLat,pinMapLng,mobile,fsa_id,fsa_name,enteredBy,brokerPhoneNo,whatsapp,messenger,facebook,wechat,brokerageName,BrokerageStreetAddress,status,is_default_agent,website,agent_type");

                                }
                            }
                            let thumbImg = tempData[0].profile_img
                            tempData[0].profile_img = process.env.image_path + thumbImg;
                            tempData[0].thumbnailProfile_img = process.env.thumbnailImg_path + thumbImg;
                            FSAdata[index].userData = tempData[0];
                        } else {
                            delete FSAdata[index];
                        }
                    }
                }
            }

            const results = FSAdata.filter(element => {
                if (Object.keys(element).length !== 0) {
                    return true;
                }

                return false;
            });
            return res.json({ status: true, data: results, changeNetWork: req.body.changeNetWork });

        } else {
            let FSAdata, getFsa, FsaId = [], fsa;
            req.body.changeNetWork = 1;

            if (req.body.fsa != undefined) {
                FSAdata = await commonModel.GetAgentActiveStatus(req.body.fsa.toString());
            }

            if (req.body.user_id != null) {
                var LoggedInUser = await commonModel.selectColumnWhere('agent', { id: req.body.user_id },"user_type,id,first_name,last_name,email,profile_img,address,pinMapLat,pinMapLng,mobile,fsa_id,fsa_name,enteredBy,brokerPhoneNo,whatsapp,messenger,facebook,wechat,brokerageName,BrokerageStreetAddress,status,is_default_agent,website,agent_type");
                LoggedInUser[0].profile_img0 = LoggedInUser[0].profile_img;
                LoggedInUser[0].profile_img = ''
                var profileLogged = LoggedInUser[0].profile_img0;
                var LoggedInUser_FSAs = await commonModel.LoggedInUser_FSA(req.body.user_id);
                if (LoggedInUser_FSAs[0].fsa_ids != null) {
                    var FSA_Arr = LoggedInUser_FSAs[0].fsa_ids.split(",");
                }
                // var LoggedDefault_FSA = await commonModel.LoggedDefault_FSA(LoggedInUser_FSAs[0].fsa_ids);

                // var defaultUserFSAData = await commonModel.defaultUserFSAData(LoggedDefault_FSA[0].user_ids);
            }

            if (FSAdata) {
                const fsaSet = new Set(FSA_Arr);
                for (let index = 0; index < FSAdata.length; index++) {
                    var tempData = await commonModel.selectColumnWhere('agent', { id: FSAdata[index].user_id, status: 1 },"user_type,id,first_name,last_name,email,profile_img,address,pinMapLat,pinMapLng,mobile,fsa_id,fsa_name,enteredBy,brokerPhoneNo,whatsapp,messenger,facebook,wechat,brokerageName,BrokerageStreetAddress,status,is_default_agent,website,agent_type");
                    if (tempData[0] == undefined) {
                        delete FSAdata[index];
                    } else {

                        if (tempData[0].user_type == 2 && tempData[0].is_default_agent == 1) {
                            if (req.body.user_id != null) {
                                let checkInClientMap = await commonModel.selectAllWhere('client_map', { fsa_id: FSAdata[index].fsa_id, user_id: req.body.user_id, agent_id_replace_to: tempData[0].id })
                                if (checkInClientMap.length > 0) {
                                    // for (let y = 0; y < checkInClientMap.length; y++) {{ // we dont need this loop any more as we getting the latest value always
                                    //     tempData = await commonModel.selectAllWhere('agent', { id: checkInClientMap[checkInClientMap.length - 1].agent_id });
                                    // }
                                    let lastAgentId = checkInClientMap[checkInClientMap.length - 1].agent_id;
                                    tempData = await commonModel.selectColumnWhere('agent', { id: lastAgentId },"user_type,id,first_name,last_name,email,profile_img,address,pinMapLat,pinMapLng,mobile,fsa_id,fsa_name,enteredBy,brokerPhoneNo,whatsapp,messenger,facebook,wechat,brokerageName,BrokerageStreetAddress,status,is_default_agent,website,agent_type");
                                }
                            }

                            let thumbImg0 = tempData[0].profile_img
                            tempData[0].profile_img = process.env.image_path + thumbImg0;
                            tempData[0].thumbnailProfile_img = process.env.thumbnailImg_path + thumbImg0;
                            FSAdata[index].userData = tempData[0];

                            // changed for show logged In profile START //                            
                            if (FSA_Arr != undefined) {   
                            //     for (let y = 0; y < FSA_Arr.length; y++) { // lakshya removed this
                            //         var thumbImg1 = profileLogged
                            //         if (FSAdata[index].fsa_id == FSA_Arr[y]) {
                            //             delete FSAdata[index].userData;
                            //             LoggedInUser[0].profile_img = process.env.image_path + thumbImg1;
                            //             LoggedInUser[0].thumbnailProfile_img = process.env.thumbnailImg_path + thumbImg1;
                            //             FSAdata[index].userData = LoggedInUser[0];
                            //             LoggedInUser[0].profile_img0 = '';
                            //         }
                            //     }
                            if (fsaSet.has(FSAdata[index].fsa_id)) {
                                var thumbImg1 = profileLogged;
                                delete FSAdata[index].userData;
                                LoggedInUser[0].profile_img = process.env.image_path + thumbImg1;
                                LoggedInUser[0].thumbnailProfile_img = process.env.thumbnailImg_path + thumbImg1;
                                FSAdata[index].userData = LoggedInUser[0];
                                LoggedInUser[0].profile_img0 = '';
                            }
                            }

                            // changed for show logged In profile END //
                        } else {
                            delete FSAdata[index];
                        }
                    }
                }
            }
            
            return res.json({ status: true, data: FSAdata, changeNetWork: req.body.changeNetWork });
        }

    } catch (err) {
        console.log(err)
        return res.json({ status: false, data: [] });
    }
}




// Latest-------------Start
// fsaController.getDefaultAgentPost = async (req, res, next) => {
//     try {
//         if (req.body.user_type == 2 && req.body.changeNetWork == 2) {
//             let ar = [];
//             let FSAdata = [], getFsa, FsaId = [], fsa;
//             let fsaRes = await commonModel.selectAllWhere('client_map', { user_id: req.body.user_id });
//             for (let zk = 0; zk < fsaRes.length; zk++) {
//                 ar.push(fsaRes[zk].fsa_id)
//             }
//             if (ar.length > 0) {
//                 FSAdata = await commonModel.GetAgentActiveStatus(ar.toString());
//                 for (let index = 0; index < FSAdata.length; index++) {
//                     var tempData = await commonModel.selectAllWhere('agent', { id: FSAdata[index].user_id });
//                     // console.log(tempData,'tempData===')
//                     if (tempData[0] == undefined) {
//                         delete FSAdata[index];
//                     } else {
//                         if (tempData[0].user_type == 2 && tempData[0].is_default_agent == 1) {
//                             if (req.body.user_id != null) {
//                                 let checkInClientMap = await commonModel.selectAllWhere('client_map', { fsa_id: FSAdata[index].fsa_id, user_id: req.body.user_id, agent_id_replace_to: tempData[0].id })

//                                 if (checkInClientMap.length > 0) {
//                                     for (let y = 0; y < checkInClientMap.length; y++) {
//                                         tempData = await commonModel.selectAllWhere('agent', { id: checkInClientMap[checkInClientMap.length - 1].agent_id });
//                                     }
//                                 }
//                             }
//                             let thumbImg = tempData[0].profile_img
//                             tempData[0].profile_img = process.env.image_path + tempData[0].profile_img;
//                             tempData[0].thumbnailProfile_img = process.env.thumbnailImg_path + thumbImg;
//                             FSAdata[index].userData = tempData[0];
//                         } else {
//                             delete FSAdata[index];
//                         }
//                     }
//                 }
//             }
//             return res.json({ status: true, data: FSAdata, changeNetWork: req.body.changeNetWork });

//         } else {
//             let FSAdata, getFsa, FsaId = [], fsa;
//             req.body.changeNetWork = 1;
//             FSAdata = await commonModel.GetAgentActiveStatus(req.body.fsa.toString());

//             for (let index = 0; index < FSAdata.length; index++) {
//                 var tempData = await commonModel.selectAllWhere('agent', { id: FSAdata[index].user_id });
//                 if (tempData[0] == undefined) {
//                     delete FSAdata[index];
//                 } else {
//                     if (tempData[0].user_type == 2 && tempData[0].is_default_agent == 1) {
//                         if (req.body.user_id != null) {
//                             let checkInClientMap = await commonModel.selectAllWhere('client_map', { fsa_id: FSAdata[index].fsa_id, user_id: req.body.user_id, agent_id_replace_to: tempData[0].id })
//                             if (checkInClientMap.length > 0) {
//                                 for (let y = 0; y < checkInClientMap.length; y++) {
//                                     tempData = await commonModel.selectAllWhere('agent', { id: checkInClientMap[checkInClientMap.length - 1].agent_id });
//                                 }
//                             }
//                         }
//                         let thumbImg = tempData[0].profile_img
//                         tempData[0].profile_img = process.env.image_path + tempData[0].profile_img;
//                         tempData[0].thumbnailProfile_img = process.env.thumbnailImg_path + thumbImg;
//                         FSAdata[index].userData = tempData[0];
//                     } else {
//                         delete FSAdata[index];
//                     }
//                 }
//             }
//             return res.json({ status: true, data: FSAdata, changeNetWork: req.body.changeNetWork });
//         }

//     } catch (err) {
//         console.log(err)
//         return res.json({ status: false, data: [] });
//     }
// }
// Latest---------------End

fsaController.GetSubagentForMap = async (req, res, next) => {
    try {
        var FSAdata = await commonModel.GetFsaForSubAgentByUserId(req.body.id);
        for (let index = 0; index < FSAdata.length; index++) {
            var tempData = await commonModel.selectAllWhere('agent', { parent_id: FSAdata[index].user_id });
            tempData[0].profile_img = process.env.image_path + tempData[0].profile_img;
            FSAdata[index].userData = tempData[0];
        }

        for (var i = 0; i < FSAdata.length; i++) {
            FSAdata[i].lat = parseFloat(FSAdata[i].lat) + 0.05;
            FSAdata[i].lng = parseFloat(FSAdata[i].lng) + 0.05;

        }
        return res.json({ status: true, data: FSAdata });

    } catch (err) {
        return res.json({ status: false, data: [] });
    }
}

fsaController.getSubAgentByFSA = async (req, res, next) => {
    try {
        var fsaResult = await commonModel.selectAllWhere('fsa', { fsa_code: req.body.fsa });
        // var getAgetntData = await commonModel.getUserDefaultIdByFSA(fsaResult[0].id);
        var FSAdata = await commonModel.GetFsaForSubAgentByUserId(fsaResult[0].id);
        for (let index = 0; index < FSAdata.length; index++) {
            var tempData = await commonModel.selectAllWhere('agent', { id: FSAdata[index].user_id });
            tempData[0].profile_img = process.env.image_path + tempData[0].profile_img;
            FSAdata[index].userData = tempData[0];
        }
        for (var i = 0; i < FSAdata.length; i++) {
            // FSAdata[i].lat = parseFloat(FSAdata[i].lat) + 0.05;
            // FSAdata[i].lng = parseFloat(FSAdata[i].lng) + 0.05;

            FSAdata[i].lat = parseFloat(FSAdata[i].lat) + 0.09;
            FSAdata[i].lng = parseFloat(FSAdata[i].lng) + 0.09;
        }
        return res.json({ status: true, data: FSAdata });
    } catch (err) {
        return res.json({ status: false, data: [] });
    }
}
fsaController.getDefaultAgentOrSubAgent = async (req, res, next) => {
    try {
        var FSAdata = await commonModel.selectAllWhere('fsa', { fsa_code: req.params.fsa });
        if (req.params.userid == 0) {
            var userData = await commonModel.selectAllWhere('agent', { fsa_id: FSAdata[0].id, parent_id: 1 });
            for (var i = 0; i < userData.length; i++) {
                userData[i].profile_img = process.env.image_path + userData[i].profile_img;
            }
        } else {

            var userData = await commonModel.selectAllSubAgent(FSAdata[0].id, req.params.userid);
            for (var i = 0; i < userData.length; i++) {
                userData[i].profile_img = process.env.image_path + userData[i].profile_img;
            }
        }
        return res.json({ status: true, data: userData });
    } catch (err) {
        return res.json({ status: false, data: [] });
    }
}

fsaController.getSubAgent = async (req, res, next) => {
    try {
        var userData = await commonModel.selectAllWhere('agent', { parent_id: req.body.agent_id, status: 1 });
        for (var i = 0; i < userData.length; i++) {
            userData[i].profile_img = process.env.image_path + userData[i].profile_img;
        }
        return res.json({ status: true, data: userData });
    } catch (err) {
        return res.json({ status: false, data: [] });
    }
}



fsaController.threeDefaultAgent = async (req, res, next) => {
    try {
        let FSAIDs
        let result1 = await commonModel.getnearbyAgent();
        
        let result
        if(!result1.length){
            result = await commonModel.threeDefaultAgent();
        }else{
            const userIds = result1.map(item => item.user_id).join(',');
            // console.log('userIds-------->',userIds);
            result = await commonModel.getNewDefaultAgent(userIds);
        }
        for (var j = 0; j < result.length; j++) {
            let fsaIDD = (await commonModel.selectAllWhere('user_fsa', { user_id: result[j].id, status: 1, activate_status: 1 }))
            if (fsaIDD.length > 0) FSAIDs = fsaIDD[0].fsa_id;
            else fsa_id = 0;

            result[j].fsa_id = FSAIDs;
            is_favorite = 0;
            result[j].profile_img = process.env.image_path + result[j].profile_img
            //favorite
            if (req.body.loginid != null) {
                let favorite = await commonModel.selectAllWhere('favorite', { agent_id: result[j].id, user_id: req.body.loginid, status: 1 });
                if (favorite.length > 0) is_favorite = 1;
                result[j].is_favorite = is_favorite;
            } else {
                result[j].is_favorite = is_favorite;
            }
            let d = await commonModel.selectAllWhere('request', { user_id: req.body.loginid, agent_id: result[j].id });

            for (let k = 0; k < d.length; k++) {
                // const element = d[k];
                result[j].statusDataRequest = d[k].status;
                if (result[j].statusDataRequest == 2 || result[j].statusDataRequest == 4) {
                    result[j].statusData = true
                } else {
                    result[j].statusData = false
                }

                // const start_date = new Date(d[k].created_at)
                const start_date = new Date()
                const end_date = new Date(d[k].created_at);
                end_date.setDate(end_date.getDate() + 14);
                result[j].start_date = start_date;
                result[j].end_date = end_date;
                result[j].name = d[k].name;

                // if (start_date > end_date) {
                //     console.log('tst3')
                //     result[j].expireDateStatus = true;
                //     // cron.schedule('* * * * *',async function() {
                //     //     let status = 4;
                //     //     let result = await commonModel.update('request', {status: status},{ id: request_id});
                //     //   });

                // }
                // else result[j].expireDateStatus = false;
                if (d[k].status == 2 || d[k].status == 4) {
                    result[j].expireDateStatus = true;
                }
                else result[j].expireDateStatus = false;
            }
            result[j].requestShowStatus = d.length == 0 ? false : true;
        };
        if (result1.length) {
            result = result.sort((a, b) => a.s_no - b.s_no);
        }
        // console.log('result*****************',result);
        
        // let nearByData = result.data.sort((a, b) => a.s_no - b.s_no);
        return res.json({ status: true, data: result });
    } catch (error) {
        console.log(error)
        return res.json({ status: false, data: [] });
    }
}



fsaController.GetDefaultAgentByLatLong = async (req, res, next) => {
    try {
        var userData = await commonModel.GetDefaultAgentByLatLong(req.body);
        let arr = [];
        let is_favorite = 0;
        for (var i = 0; i < userData.length; i++) {
            arr.push(userData[i].id);
        }
        var agentData = await commonModel.getAgentDataByNearAgent1(arr.toString(), req.body.loginid);

        for (var j = 0; j < agentData.length; j++) {
            is_favorite = 0;
            agentData[j].profile_img = process.env.image_path + agentData[j].profile_img;
            agentData[j].fsa_id = agentData[j].fsaIDD;
            //favorite
            if (req.body.loginid != null) {
                let favorite = await commonModel.selectAllWhere('favorite', { agent_id: agentData[j].id, user_id: req.body.loginid, status: 1 });
                if (favorite.length > 0) is_favorite = 1;
                agentData[j].is_favorite = is_favorite;
            } else {
                agentData[j].is_favorite = is_favorite;
            }
            let d = await commonModel.selectAllWhere('request', { user_id: req.body.loginid, agent_id: agentData[j].id });
            for (let k = 0; k < d.length; k++) {
                // const element = d[k];
                agentData[j].statusDataRequest = d[k].status;
                // const start_date = new Date(d[k].created_at)
                const start_date = new Date()
                const end_date = new Date(d[k].created_at);
                end_date.setDate(end_date.getDate() + 14);
                agentData[j].start_date = start_date;
                agentData[j].end_date = end_date;
                agentData[j].name = d[k].name;

                if (start_date > end_date) {
                    agentData[j].expireDateStatus = true;
                    // cron.schedule('* * * * *',async function() {
                    //     let status = 4;
                    //     let result = await commonModel.update('request', {status: status},{ id: request_id});
                    //   });

                }
                else agentData[j].expireDateStatus = false;
                if (d[k].status == 2) {
                    agentData[j].expireDateStatus = true;
                }

            }
            agentData[j].requestShowStatus = d.length == 0 ? false : true;

        }
        return res.json({ status: true, data: agentData });
    } catch (err) {
        return res.json({ status: false, data: [] });
    }
}


/* comment by Dev 12-11-2021 7:00  AM
fsaController.getFSAActiveDefaultAgent = async (req, res, next) => {
    try {
        if (req.query.count) req.query.count = parseInt(req.query.count * req.query.limit);
        let result = await commonModel.getFSAActiveDefaultAgent(req.params.id, req.query.search, req.query.count, req.query.limit);
        let total = await commonModel.getFSAwithDefaultAgentTotal1(req.params.id);
        for (x of result) {
            x.profile_img = process.env.image_path + x.profile_img
            if (x.user_type == 3) x.status = 0;
        }
        return res.json({ status: true, data: result, total: total[0].total });
    } catch (err) {
        return res.json({ status: false, data: [] });
    }
}
*/


fsaController.getFSAActiveDefaultAgent = async (req, res, next) => {
    try {
        if (req.query.count) req.query.count = parseInt(req.query.count * req.query.limit);

        let result = await commonModel.getFSAActiveDefaultAgent(req.params.id, req.query.search, req.query.count, req.query.limit);
        let totalFSAAgent = await commonModel.getActiveDefaulAgenttTotal(req.params.id);

        // add for preference order   

        let UserFsaCounts = await commonModel.FsaUserCounts(req.params.id);
        for (let z = 0; z < UserFsaCounts.length; z++) {
            let FSACount = await commonModel.fsacountUser(UserFsaCounts[z].id)
            for (let k = 0; k < result.length; k++) {
                if (UserFsaCounts[z].id == result[k].id) {
                    result[k].totalUserFSA = FSACount[0].totalUserFSA
                }
            }
        }
        result.sort((a, b) => a.activate_status == 1 ? -1 : b.activate_status == 1 ? 1 : b.totalUserFSA - a.totalUserFSA);

        // add for preference order

        let total = await commonModel.getFSAwithDefaultAgentTotal1(req.params.id);
        for (x of result) {
            x.profile_img = process.env.image_path + x.profile_img
            if (x.user_type == 3) x.status = 0;
        }
        return res.json({ status: true, data: result, total: total[0].total, totalFSAAgent: totalFSAAgent });
    } catch (err) {
        console.log(err, 'err')
        return res.json({ status: false, data: [] });
    }
}

fsaController.getDefaultAgentByFSA = async (req, res, next) => {
    try {
        var FSAdata = await commonModel.selectAllWhere('fsa', { fsa_code: req.params.id });
        var userData = await commonModel.selectAllWhere('agent', { fsa_id: FSAdata[0].id, parent_id: 1, status: 1 });
        for (var i = 0; i < userData.length; i++) {
            userData[i].profile_img = process.env.image_path + userData[i].profile_img;
        } return res.json({ status: true, data: userData });
    } catch (err) {
        return res.json({ status: false, data: [] });
    }
}
fsaController.getAgentsByCityRealtor = async (req, res, next) => {
    try {
        if (req.body.a == 1 && !req.body.id) {
            let result = await commonModel.getAgentsByCityRealtor(req.body);
            for (x of result) { x.profile_img = process.env.image_path + x.profile_img }
            return res.json({ status: true, data: result });
        }
        else if (req.body.a == 2 && req.body.id) {
            let result = await commonModel.myMapSearchBar(req.body);
            for (x of result) { x.profile_img = process.env.image_path + x.profile_img }
            return res.json({ status: true, data: result });
        }
    } catch (err) {
        return res.json({ status: false, data: [] });
    }
}

fsaController.getAgentsFSA = async (req, res, next) => {
    try {
        let result = await commonModel.selectAllWhere('user_fsa', { user_id: req.body.id, status: 1, activate_status: 1 });
        let fsa = [];
        for (x of result) {
            fsa.push(x.fsa_id)
        }
        return res.json({ status: true, data: fsa });
    } catch (err) {
        return res.json({ status: false, data: [] });
    }
}
fsaController.GetNeighbourhoodAgent = async (req, res, next) => {
    try {
        //*********25/03/2022******** */
        let FSADefaultAgent = await commonModel.getFSADefaultAgent(req.body.fsa_id);
        //******************** */

        let is_favorite = 0;
        let agent = await commonModel.GetNeighbourhoodAgentDATAFInal1(req.body.userData.id, req.body.fsa_code);

        // let agent = await commonModel.GetNeighbourhoodAgentDATAFInal(req.body.userData.id);
        for (let j = 0; j < agent.length; j++) {
            agent[j].profile_img = process.env.image_path + agent[j].profile_img;
            if (req.body.loginid != null) {
                let favorite = await commonModel.selectAllWhere('favorite', { agent_id: agent[j].id, user_id: req.body.loginid, status: 1 });
                if (favorite.length > 0) is_favorite = 1;
                agent[j].is_favorite = is_favorite;
            } else {
                agent[j].is_favorite = is_favorite;
            }
            try {
                let data = await commonModel.selectAllWhere('request', { user_id: req.body.loginid, agent_id: agent[j].agent_id });
                for (let k = 0; k < data.length; k++) {
                    agent[j].statusDataRequest = data[k].status;
                    if (agent[j].statusDataRequest == 2 || agent[j].statusDataRequest == 4) {
                        agent[j].statusData = true
                    } else {
                        agent[j].statusData = false
                    }
                    const start_date = new Date()
                    const end_date = new Date(data[k].created_at);
                    end_date.setDate(end_date.getDate() + 14);
                    agent[j].start_date = start_date;
                    agent[j].end_date = end_date;
                    agent[j].name = data[k].name;
                    if (start_date > end_date) {
                        agent[j].expireDateStatus = true;
                    }
                    else agent[j].expireDateStatus = false;
                }
                agent[j].requestShowStatus = data.length == 0 ? false : true;

            } catch (error) {
            }
        }
        // for (x of agent) { x.profile_img = process.env.image_path + x.profile_img
        //     x.requestShowStatus = x.length == 0 ? true : false ;
        // }
        return res.json({ status: true, data: agent, PopupDefaultAgent: FSADefaultAgent });
    } catch (err) {
        return res.json({ status: false, data: [] });
    }
}

fsaController.getUserDataForPayment = async (req, res, next) => {
    try {
        let checkEmail = await commonModel.selectAllWhere('agent', { id: req.params.id });
        if (checkEmail.length == 0) return res.json({ status: false, data: [] });

        if (checkEmail[0].password)
            checkEmail[0].password = cryptr.decrypt(checkEmail[0].password);

        var getUserFSA = await commonModel.selectAllWhere('user_fsa', { user_id: req.params.id, status: 1 });
        let arr = [];
        for (let z = 0; z < getUserFSA.length; z++) {
            arr.push(getUserFSA[z].fsa_id);
        }
        let fsa_data = await commonModel.getFSA(req.params.id);
        checkEmail[0].FSAData = fsa_data;

        if (getUserFSA.length) {
            let resulltFas = await commonModel.getUserByIdFSA(req.params.id);
            checkEmail[0].fsaData = resulltFas.map((e) => {
                return { id: e.id, itemName: e.fsa_code + " - " + e.nieghborhood }
            })
        }
        checkEmail[0].fsa = arr;
        let image = checkEmail[0].profile_img;
        try {
            if (fs.existsSync('./public/images/' + image)) {
                checkEmail[0].imageExists = true;
            } else {
                checkEmail[0].imageExists = false;
            }
        } catch (err) {
            checkEmail[0].imageExists = false;
        }

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

// cron job for cancle request after 14 days automatically

cron.schedule('*/10 * * * * *', async function () {
    //runs every 10 seconds
    let result = await commonModel.requestStatusData();
    for (let i = 0; i < result.length; i++) {
        const created_at_date = new Date(result[i].created_at);
        const current_date = new Date();
        created_at_date.setDate(created_at_date.getDate() + 14);
        // console.log(created_at_date,'create')
        if (current_date > created_at_date) {
            data = await commonModel.update('request', { status: 4 }, { id: result[i].id });
        }
    }
});

//cron end



fsaController.addToMap = async (req, res, next) => {
    try {
        let result = await commonModel.selectAllWhere("client_map", req.body);
        if (result.length) return res.json({ status: false, msg: resMessage.alreadyAddedToMap });
        await commonModel.insert("client_map", req.body);
        return res.json({ status: true, msg: resMessage.addSucc });

    } catch (err) {
        return res.json({ status: false, msg: resMessage.errMsg });
    }
}

fsaController.DeleteAgentFromMap = async (req, res, next) => {
    try {
        let result1 = await commonModel.selectAllWhere("client_map", { fsa_id: req.body.fsa_id, user_id: req.body.user_id });
        let result2 = await commonModel.update('client_map', { agent_id: req.body.agent_id }, { fsa_id: req.body.fsa_id });
        let result = await commonModel.DeleteAgentFromMap(req.body);
        return res.json({ status: true, msg: resMessage.DeleteSucc });

    } catch (err) {
        return res.json({ status: false, msg: err.sqlMessage });
    }
}

fsaController.checkIfFsaIsAlready = async (req, res, next) => {
    try {
        let arr = [];
        for (let i = 0; i < req.body.length; i++) {
            let ch = await commonModel.checkIfFsaIsAlready(req.body[i]);
            if (ch.length != 0) arr.push(ch[0].fsa_code);
        }
        if (arr.length == 0) {
            return res.json({ status: true, msg: 'success' });
        } else {
            let msg = 'Other Default Agent is already working on ' + arr.toString() + ' FSA';
            return res.json({ status: false, msg: msg });
        }
    } catch (err) {
        return res.json({ status: false, msg: err });
    }
}

fsaController.getDefaultAgentOnMap = async (req, res, next) => {
    try {
        let tempData = await commonModel.getDefaultAgentOnMap();
        for (let index = 0; index < tempData.length; index++) {
            tempData[index].profile_img = process.env.image_path + tempData[index].profile_img;
        }
        return res.json({ status: true, msg: 'success', data: tempData });

    } catch (err) {
        return res.json({ status: false, msg: err, data: [] });
    }
}



fsaController.updateFsaLatLong = async (req, res, next) => {
    try {
        await commonModel.update('fsa', { lat: req.body.lat, lng: req.body.lng }, { id: req.body.fsa_id });
        return res.json({ status: true, msg: 'Updated Successfully', data: [] });
    } catch (err) {
        return res.json({ status: false, msg: 'Update Failed', data: [] });
    }
}


fsaController.GetHomepageMapData = async (req, res, next) => {
    try {
        let FSAdata = await commonModel.GetHomepageMapData();
        for (let index = 0; index < FSAdata.length; index++) {

            if (FSAdata[index].user_type == 2 && FSAdata[index].is_default_agent == 1) {
                if (req.body.user_id != null) {
                    let checkInClientMap = await commonModel.selectAllWhere('client_map', { fsa_id: FSAdata[index].fsa_id, user_id: req.body.user_id, agent_id_replace_to: FSAdata[index].id })
                    let data = FSAdata[index]
                    if (checkInClientMap.length > 0) {
                        FSAdata[index] = await commonModel.selectAllWhere('agent', { id: checkInClientMap[0].agent_id });
                    }
                }
                FSAdata[index].profile_img = process.env.image_path + FSAdata[index].profile_img;
                // FSAdata[index].userData = FSAdata[index];
            } else {
                delete FSAdata[index];

            }
        }
        return res.json({ status: true, msg: ' Successfully', data: FSAdata });
    } catch (err) {
        console.log(err)
        return res.json({ status: false, msg: ' Failed', data: [] });
    }
}

// Sourabh Api -------------------------------------------


fsaController.getAllFSA = async (req, res, next) => {
    try {
        let result = await commonModel.getallactiveFSA();
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

// fsaController.getAgentMail = async (req, res, next) => {
//     try {
//         console.log(req.body,'-+-------------+-----------+-+-+---+------------')
//         let result = await commonModel.getClientAgentMail(req.body);
//         if (result.length) {

//             return res.json({
//                 status: true,
//                 msg: resMessage.dataFound,
//                 data: result,
//             });


fsaController.getAllAgentsName = async (req, res, next) => {
    try {
        let result = await commonModel.getAllAgentsName();
        if (result.length) {
            return res.json({ status: true, msg: resMessage.dataFound, data: result });
        } else {
            return res.json({ status: false, msg: resMessage.noDataFound, data: [] });
        }
    } catch (err) {
        return res.json({ status: false, msg: resMessage.noDataFound, data: [] });
    }
};


fsaController.getAgentMail = async (req, res, next) => {
    try {
        let result = await commonModel.getClientAgentMail(req.body);
        if (result.length) {
            return res.json({ status: true, msg: resMessage.dataFound, data: result });
        } else {
            return res.json({ status: false, msg: resMessage.noDataFound, data: [] });
        }
    } catch (err) {
        return res.json({ status: false, msg: resMessage.noDataFound, data: [] });
    }
};

fsaController.getAgentByName = async (req, res, next) => {
    try {
        const [first, last] = req.body.name.split(' ');
        req.body.first_name = first;
        req.body.last_name = last;
        let result = await commonModel.getAgentByName(req.body);
        if (result.length) {
            return res.json({ status: true, msg: resMessage.dataFound, data: result });
        } else {
            return res.json({ status: false, msg: resMessage.noDataFound, data: [] });
        }
    } catch (err) {
        return res.json({ status: false, msg: resMessage.noDataFound, data: [] });
    }
};


fsaController.getDefaultagentByFSARefer = async (req, res, next) => {
    try {
        let result = await commonModel.getDefaultagentByFSA(req.query);
        if (result.length) { var DefaultData = await commonModel.selectAllWhere('agent', { id: result[0].user_id }); }

        if (DefaultData != undefined) {
            return res.json({ status: true, msg: resMessage.dataFound, data: DefaultData });
        } else {
            return res.json({ status: false, msg: resMessage.noDataFound, data: [] });
        }
    } catch (err) {
        return res.json({ status: false, msg: resMessage.noDataFound, data: [] });
    }
};



//-----------------------------------**********************Sourabh******************-------------------------------------------------

fsaController.sendReferral = async (req, res, next) => {
    try {
        let datta = {
            agent_id: req.body.receivingAgent.id,
            user_id: req.body.referralAgent.id,
            name: req.body.name,
            phone: req.body.mobile,
            email: req.body.email,
            message: req.body.message,
            // office_address: checkClientExist[0].address,
            fsa: req.body.fsa_id,
            status: 0,
            refer_client: 1,
            referring_agent_id: req.body.referralAgent.id
        }
        let reqData = await commonModel.insert("request", datta);

        // console.log('reqData.insertId->', reqData);
        let requestData = await commonModel.selectAllWhere("request", { id: reqData.insertId });
        // console.log('requestData---------->', requestData[0]);

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

        // let emailData = {
        //     client_name: req.body.name,
        //     client_phone: req.body.mobile,
        //     client_email: req.body.email,
        //     referring_agent_name: req.body.referralAgent.first_name + ' ' + (req.body.referralAgent.last_name != undefined && req.body.referralAgent.last_name != 'undefined' && req.body.referralAgent.last_name != 'null' && req.body.referralAgent.last_name != null ? req.body.referralAgent.last_name : ''),
        //     referring_agent_brokerageName: req.body.referralAgent.brokerageName,
        //     referring_agent_phone: req.body.referralAgent.mobile,
        //     referring_agent_email: req.body.referralAgent.email,
        //     receiving_agent_name: req.body.receivingAgent.first_name + ' ' + (req.body.receivingAgent.last_name != undefined && req.body.receivingAgent.last_name != 'undefined' && req.body.receivingAgent.last_name != 'null' && req.body.receivingAgent.last_name != null ? req.body.receivingAgent.last_name : ''),
        //     receiving_agent_email: req.body.receivingAgent.email
        // }
        // mail.MailToAgentforReferAClient(emailData);

        if (req.body.referLocation == 1) {
            await mail.CreateRequestForMapRefer({
                req_id: reqData.insertId,
                agent_id: req.body.receivingAgent.id,
                unsubscribe_agent: req.body.receivingAgent.id,
                arrfsa: arrfsa.toString(),
                nieghborhood: arrNieghborhood.toString(),
                agent_email: req.body.receivingAgent.email,
                agent_name: req.body.receivingAgent.first_name + ' ' + (req.body.receivingAgent.last_name != undefined && req.body.receivingAgent.last_name != 'undefined' && req.body.receivingAgent.last_name != 'null' && req.body.receivingAgent.last_name != null ? req.body.receivingAgent.last_name : ''),
                referring_agent_name: req.body.referralAgent.first_name + ' ' + (req.body.referralAgent.last_name != undefined && req.body.referralAgent.last_name != 'undefined' && req.body.referralAgent.last_name != 'null' && req.body.referralAgent.last_name != null ? req.body.referralAgent.last_name : ''),
            });
        } else {
            await mail.CreateRequest({
                req_id: reqData.insertId,
                agent_id: req.body.receivingAgent.id,
                unsubscribe_agent: req.body.receivingAgent.id,
                arrfsa: arrfsa.toString(),
                nieghborhood: arrNieghborhood.toString(),
                agent_email: req.body.receivingAgent.email,
                agent_name: req.body.receivingAgent.first_name + ' ' + (req.body.receivingAgent.last_name != undefined && req.body.receivingAgent.last_name != 'undefined' && req.body.receivingAgent.last_name != 'null' && req.body.receivingAgent.last_name != null ? req.body.receivingAgent.last_name : ''),
            });
        }

        return res.json({ status: true, msg: "Referral Sent Successfully !" });

    } catch (err) {
        console.log(err)
        return res.json({ status: false, msg: resMessage.serverError, data: [] });
    }
};


// fsaController.sendReferral = async (req, res, next) => {
//     try {
//         let checkClientExist = await commonModel.getClientAgentMail(req.body);
//         if (checkClientExist.length != 0) {
//             let emailData = {
//                 client_name: checkClientExist[0].first_name + ' ' + (checkClientExist[0].last_name != undefined && checkClientExist[0].last_name != 'undefined' && checkClientExist[0].last_name != 'null' && checkClientExist[0].last_name != null ? checkClientExist[0].last_name : ''),
//                 client_phone: checkClientExist[0].mobile == null ? '' : checkClientExist[0].mobile,
//                 client_email: checkClientExist[0].email,
//                 referring_agent_name: req.body.referralAgent.first_name + ' ' + (req.body.referralAgent.last_name != undefined && req.body.referralAgent.last_name != 'undefined' && req.body.referralAgent.last_name != 'null' && req.body.referralAgent.last_name != null ? req.body.referralAgent.last_name : ''),
//                 referring_agent_brokerageName: req.body.referralAgent.brokerageName,
//                 referring_agent_phone: req.body.referralAgent.mobile,
//                 referring_agent_email: req.body.referralAgent.email,
//                 receiving_agent_name: req.body.receivingAgent.first_name + ' ' + (req.body.receivingAgent.last_name != undefined && req.body.receivingAgent.last_name != 'undefined' && req.body.receivingAgent.last_name != 'null' && req.body.receivingAgent.last_name != null ? req.body.receivingAgent.last_name : ''),
//                 receiving_agent_email: req.body.receivingAgent.email
//             }
//             commonModel.insert("user_fsa", {
//                 user_id: checkClientExist[0].id,
//                 fsa_id: req.body.fsa_id,
//                 address: (await commonModel.selectAllWhere('fsa', { id: req.body.fsa_id }))[0].nieghborhood,
//                 activate_status: 0
//             });

//             mail.MailToAgentforReferAClient(emailData);

//             let datta = {
//                 agent_id: req.body.receivingAgent.id,
//                 user_id: checkClientExist[0].id,
//                 name: req.body.name,
//                 phone: req.body.mobile,
//                 email: req.body.email,
//                 message: req.body.message,
//                 office_address: checkClientExist[0].address,
//                 fsa: req.body.fsa_id,
//                 status: 0,
//                 refer_client: 1,
//                 referring_agent_id: req.body.referralAgent.id
//             }
//             commonModel.insert("request", datta);

//             return res.json({ status: true, msg: "Referral Sent Successfully !" });

//         } else {
//             if (req.body.name) {
//                 const [first, last] = req.body.name.split(' ');
//                 req.body.first_name = first; req.body.last_name = last;
//             }
//             let newReferData = {
//                 user_type: 3,
//                 first_name: req.body.first_name,
//                 last_name: req.body.last_name,
//                 email: req.body.email,
//                 mobile: req.body.mobile
//             }
//             let insertedUser = await commonModel.insert("agent", newReferData);
//             commonModel.insert("user_fsa", {
//                 user_id: insertedUser.insertId,
//                 fsa_id: req.body.fsa_id,
//                 address: (await commonModel.selectAllWhere('fsa', { id: req.body.fsa_id }))[0].nieghborhood,
//                 activate_status: 0
//             });

//             let datta = {
//                 agent_id: req.body.receivingAgent.id,
//                 user_id: insertedUser.insertId,
//                 name: req.body.name,
//                 phone: req.body.mobile,
//                 email: req.body.email,
//                 message: req.body.message,
//                 // office_address: ,
//                 fsa: req.body.fsa_id,
//                 status: 0,
//                 refer_client: 1,
//                 referring_agent_id: req.body.referralAgent.id
//             }

//             commonModel.insert("request", datta);


//             let getNewReferralUser = await commonModel.selectAllWhere('agent', { id: insertedUser.insertId });
//             // mail for RealtorRegistrationFromLink
//             let emailData = {
//                 client_name: getNewReferralUser[0].first_name + ' ' + (getNewReferralUser[0].last_name != undefined && getNewReferralUser[0].last_name != 'undefined' && getNewReferralUser[0].last_name != 'null' && getNewReferralUser[0].last_name != null ? getNewReferralUser[0].last_name : ''),
//                 client_phone: getNewReferralUser[0].mobile,
//                 client_email: getNewReferralUser[0].email,
//                 referring_agent_name: req.body.referralAgent.first_name + ' ' + (req.body.referralAgent.last_name != undefined && req.body.referralAgent.last_name != 'undefined' && req.body.referralAgent.last_name != 'null' && req.body.referralAgent.last_name != null ? req.body.referralAgent.last_name : ''),
//                 referring_agent_phone: req.body.referralAgent.mobile,
//                 referring_agent_email: req.body.referralAgent.email,
//                 referring_agent_brokerageName: req.body.referralAgent.brokerageName,
//                 receiving_agent_name: req.body.receivingAgent.first_name + ' ' + (req.body.receivingAgent.last_name != undefined && req.body.receivingAgent.last_name != 'undefined' && req.body.receivingAgent.last_name != 'null' && req.body.receivingAgent.last_name != null ? req.body.receivingAgent.last_name : ''),
//                 receiving_agent_email: req.body.receivingAgent.email
//             }
//             if (insertedUser) req.body.id = insertedUser.insertId;
//             let emailDataforRefer = {
//                 id: req.body.id,
//                 first_name: req.body.first_name,
//                 last_name: req.body.last_name != undefined && req.body.last_name != 'undefined' && req.body.last_name != 'null' && req.body.last_name != null ? req.body.last_name : '',
//                 email: req.body.email
//             }

//             mail.RealtorRegistrationFromLink(emailDataforRefer);
//             mail.MailToAgentforReferAClient(emailData);

//             return res.json({ status: true, msg: "Referral Sent Successfully !" });
//         }
//         // await mail.MailToAgentforReferAClient(emailData)

//     } catch (err) {
//         console.log(err)
//         return res.json({ status: false, msg: resMessage.serverError, data: [] });
//     }
// };

//-----------------SOURABH--------------------------------------------------------------------------------------------------




fsaController.checkFsaInAdmin = async (req, res, next) => {
    try {
        let checkFSa = await commonModel.checkFsa(req.body.fsa_code);
        if (checkFSa.length == 0) {
            return res.json({ status: true, data: [] });
        } else {
            return res.json({ status: true, msg: 'FSA code is already exists', data: checkFSa });
        }
    } catch (err) {
        console.log(err)
        return res.json({ status: false, data: [] });
    }
}




fsaController.addNewFsaInAdmin = async (req, res, next) => {

    try {

        let fsaData = {
            fsa_code: req.body.fsa_code,
            fsa_name: req.body.fsa_name,
            nieghborhood: req.body.nieghborhood
        }
        let addFsa = await commonModel.insert("fsa", fsaData);
        return res.json({ status: true, msg: 'FSA Added Successfully' });

    } catch (err) {
        console.log(err)
        return res.json({ status: false, data: [] });
    }
}


fsaController.EditFsaInAdmin = async (req, res, next) => {
    try {

        let fsaData = {
            fsa_code: req.body.fsa_code,
            fsa_name: req.body.fsa_name,
            nieghborhood: req.body.nieghborhood
        }
        let addFsa = await commonModel.update02("fsa", req.params.id, fsaData);
        return res.json({ status: true, msg: 'FSA Updated Successfully' });

    } catch (err) {
        console.log(err)
        return res.json({ status: false, data: [] });
    }
}


fsaController.getFsaNext = async (req, res, next) => {
    try {
        let result = await commonModel.getFsaNextButton(req.body.id);
        return res.json({ status: true, data: result });
    } catch (err) {
        return res.json({ status: false, data: [] });
    }
}
fsaController.getFsaPrevious = async (req, res, next) => {
    try {
        let result = await commonModel.getFsaPreviousButton(req.body.id);
        return res.json({ status: true, data: result });
    } catch (err) {
        return res.json({ status: false, data: [] });
    }
}


module.exports = fsaController;

