const commonModel = require('../models/commonModel');
// const myProgramModel = require('../models/myProgramModel');
const webroutesController = function () { };
const resMessage = require('../helpers/res-message');
const mail = require('../helpers/mail');


webroutesController.getBecomeAgentList = async(req,res,next) =>
 {

    try {
         let result = await commonModel.getRequetBecomeAgent(req.body.filter, req.body.count, req.body.limit);
         let total = await commonModel.getRequetBecomeAgentTotal();
         return res.json({ status: true,msg: resMessage.dataFound , data: result,total: total});
    } catch (err) {
        console.log(err);
        return res.json({ status: false,msg: resMessage.noDataFound , data:[] });
    }
}




module.exports = webroutesController;