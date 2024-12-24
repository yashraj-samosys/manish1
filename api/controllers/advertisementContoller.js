const commonModel = require('../models/commonModel');
const advertisementController = function () { };
const resMessage = require('../helpers/res-message');
const mail = require('../helpers/mail');
const fs = require('fs');
const moment = require('moment');
//****** GET ADVERTISEMENT LIST START *****//
advertisementController.getAdvertisementList = async (req, res, next) => {
    console.log('.................')
    try {
        let getAdvertisementList = await commonModel.getAdvertisementList(req.query.count, req.query.limit);
        let total = await commonModel.getAdvertisementList_total();
        let result = [{
            "advertising": getAdvertisementList
        }];
        // let dataNode = result['data'].StartDate;
        // let start=dataNode[0].StartDate;
        // nodeDate = getAdvertisementList[0].StartDate
        // console.log('Database Date',nodeDate)

        if (getAdvertisementList.length) {
            for (let x of getAdvertisementList) {
                x.profile_img = process.env.image_path + x.profile_img
            }
            return res.json({ status: true, msg: resMessage.dataFound, data: result, total: total });
        } else {
            return res.json({ status: false, msg: resMessage.noDataFound, data: [] });
        }
    } catch (err) {
        return res.json({ status: false, msg: resMessage.noDataFound, data: [] });
    }
}
//****** GET ADVERTISEMENT LIST END ******//

//******** ADD-EDIT ADVERTISEMENT START *********//
advertisementController.addEditAdvertisement = async (req, res, next) => {
    try {
        delete req.body.profile_img;
        if (req.file != undefined) req.body.profile_img = req.file.filename;
        req.body.StartDate = moment(new Date(req.body.StartDate)).format('YYYY-MM-DD');
        req.body.EndDate = moment(new Date(req.body.EndDate)).format('YYYY-MM-DD');

        if (req.params.id == 0) {
            // ADD ADVERTISEMENT
            let exist = await commonModel.advertisementExist(req.body);
            if (exist.length) return res.json({ status: false, msg: resMessage.advertisementExist });
            await commonModel.insert("advertisement", req.body);
            return res.json({ status: true, msg: resMessage.addSucc });
        } else {
            let result = await commonModel.selectAllWhere("advertisement", { id: req.params.id });
            if (req.file != undefined) {
                if (req.body.fieldname == "profile_img") fs.unlink(process.env.delete_path + result[0].profile_img, (err => { }));
            }
            // }
            // EDIT ADVERTISEMENT
            await commonModel.update01("advertisement", req.params.id, req.body);
            return res.json({ status: true, msg: resMessage.updateSucc });
        }
    } catch (err) {
        return res.json({ status: false, msg: resMessage.errMsg });
    }
}
//********** ADD-EDIT ADVERTISEMENT END ***************//


//********** Deelete ADVERTISEMENT  ***************//
advertisementController.DeleteAd = async (req, res, next) => {
    try {
        await commonModel.update("advertisement", { status: 2 }, { id: req.params.id });
        return res.json({ status: true, msg: 'Advertisement Delete Sucessfully' });
    } catch (err) {
        return res.json({ status: false, msg: resMessage.statusChangeErr });
    }
}

//********** GET ADVERTISEMENT BY ID START ************//
advertisementController.getAdvertisementById = async (req, res, next) => {
    try {
        let result = await commonModel.selectAllWhere("advertisement", { id: req.params.id });
        if (result.length) {
            // if (result[0].pdf_file) result[0].pdf_file = process.env.image_path + result[0].pdf_file;
            // else result[0].pdf_file = process.env.image_path + 'no-file.png';
            result[0].profile_img = process.env.image_path + result[0].profile_img;
            return res.json({ status: true, msg: resMessage.dataFound, data: result });
        } else {
            return res.json({ status: false, msg: resMessage.noDataFound, data: [] });
        }
    } catch (err) {
        return res.json({ status: false, msg: resMessage.noDataFound, data: [] });
    }
}
//********** GET ADVERTISEMENT BY ID END *************//

//********** CHANGE ADVERTISEMENT STATUS START ************//
advertisementController.changeAdvertisementStatus = async (req, res, next) => {
    // console.log(req.body);
    // console.log('params', req.params)
    // //    console.log(req.files)
    // console.log(req.file)
    // //  return
    try {
        if (req.body.status == 1) req.body.status = 0;
        else req.body.status = 1;
        await commonModel.update("advertisement", { status: req.body.status }, { id: req.params.id });
        return res.json({ status: true, msg: resMessage.statusChange });
    } catch (err) {
        return res.json({ status: false, msg: resMessage.statusChangeErr });
    }
}
//********** CHANGE ADVERTISEMENT STATUS END **********//


advertisementController.getDateRange = async (req, res, next) => {
    try {
        let getDateRange = await commonModel.getDateRange();
        let result = [{
            "DBdateRange": getDateRange
        }];
        console.log(getDateRange)
        if (getDateRange.length) {
            //     for (let x of getAdvertisementList) {
            //         x.profile_img = process.env.image_path + x.profile_img
            //     }
            return res.json({ status: true, msg: resMessage.dataFound, data: result });
        } else {
            return res.json({ status: false, msg: resMessage.noDataFound, data: [] });
        }
    } catch (err) {
        return res.json({ status: false, msg: resMessage.noDataFound, data: [] });
    }
}


advertisementController.getAdvertismentByType = async (req, res, next) => {
    try {
        // let date = new Date();
        // date = moment(date).format('YYYY-MM-DD');
        // console.log(date,'date')
        // let result = await commonModel.getAdvertisment(req.params.type, date);
        let result = await commonModel.getAdvertisment(req.params.type);

        if (result.length) {
            for (let x of result) x.profile_img = process.env.image_path + x.profile_img;
            return res.json({ status: true, msg: resMessage.dataFound, data: result });
        }
        else return res.json({ status: false, msg: resMessage.noDataFound, data: [] });
    } catch (err) {
        console.log(err)
        return res.json({ status: false, msg: resMessage.noDataFound, data: [] });
    }
}

advertisementController.updateAdvertismentCount = async (req, res, next) => {
    try {
        let result = await commonModel.selectAllWhere("advertisement", { id: req.body.id });
        req.body.click_count = result[0].click_count + 1;
        await commonModel.update("advertisement", { click_count: req.body.click_count }, { id: req.body.id });
        return res.json({ status: true, msg: resMessage.dataFound, data: result });
    } catch (err) {
        return res.json({ status: false, msg: resMessage.noDataFound, data: [] });
    }
}

module.exports = advertisementController;