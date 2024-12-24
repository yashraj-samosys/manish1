const commonModel = require('../models/commonModel');
const footerController = function () { };
const resMessage = require('../helpers/res-message');
const mail = require('../helpers/mail');
const fs = require('fs');
const bcryptjs = require('bcryptjs');
var jwt = require('jsonwebtoken');
const express = require('express');
const app = express();



footerController.addEdit = async (req,res,next) => {
    try {
        if(req.params.id == 0 || req.params.id == undefined){
            let result = await commonModel.insert('footer_text', req.body);
            // console.log(result)
            return res.json({ status: true, msg:"Added Successfully" });
        }else {
            let result = await commonModel.update('footer_text', req.body, { id: req.params.id});
            return res.json({ status: true, msg:"Updated Successfully" });
        }
        
    } catch (err) {
        console.log(err)
        return res.json({ status: false, msg: resMessage.errMsg});
    }
}


footerController.getFooter = async (req,res,next) => {
    // console.log('test')
    try {
        // let result = await commonModel.selectAll('footer_text');
        let result = await commonModel.selectAll('footer_text')
        // console.log(result,'result')
        return res.json({status: true, msg: resMessage.dataFound,data: [result[0]] })
    } catch (err) {
        console.log(err);
        return res.json({ status: false, msg: resMessage.noDataFound, data: [] });
    }
}


module.exports = footerController;

