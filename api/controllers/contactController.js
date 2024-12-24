const commonModel = require('../models/commonModel');
// const myProgramModel = require('../models/myProgramModel');
const webroutesController = function () { };
const resMessage = require('../helpers/res-message');
const mail = require('../helpers/mail');



webroutesController.addContactData = async (req,res,next) => {
    console.log(req.body,'re.......addContactData..')
    try {
        let result = await commonModel.insert('contact',req.body);
        console.log(result)
        mail.sendMailToAdmin(req.body)
        
        return res.json({ status: true,msg: "Submit Successfully"  });
    } catch (err) {
        console.log(err)
        return res.json({ status: false,msg: resMessage.noDataFound , data:[] });
    }
}


webroutesController.getContactData = async(req,res,next) => {
 
    try {
        // let result = await commonModel.selectAll('contact');
        // let result = await commonModel.getContactAllData()
        // if (req.query.count) req.query.count = parseInt(req.query.count + "0");
        if (req.query.count) req.query.count = parseInt(req.query.count * req.query.limit)
        let result = await commonModel.getContactAllFilter(req.query.filter,req.query.count,req.query.limit);
        let total = await commonModel.getContactAllFilter_total();
        return res.json({ status: true,msg: resMessage.dataFound , data: result, total: total});
    } catch (err) {
        console.log(err)
        return res.json({ status: false,msg: resMessage.noDataFound , data:[] });
    }
}

webroutesController.getContactDataById = async (req,res,next) => {
    try {
        let result = await commonModel.selectAllWhere('contact',{id: req.params.id});
        return res.json({ status: true,msg: resMessage.dataFound , data: result });
    } catch (err) {
        console.log(err)
        return res.json({ status: false,msg: resMessage.noDataFound , data:[] });
    }
}

webroutesController.getAgentDataById = async(req,res,next) => {
    try {
        let result = await commonModel.selectAllWhere('agent',{id: req.params.id});
        return res.json({ status: true,msg: resMessage.dataFound , data: result });
    } catch (err) {
        console.log(err)
        return res.json({ status: false,msg: resMessage.noDataFound , data:[] });
    }
}

module.exports = webroutesController;