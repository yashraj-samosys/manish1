const express = require('express');
const routes = express.Router();
const multer = require('multer');
const date = new Date();
const controllers = require('../controllers');
const sharp = require('sharp');
const path = require('path');
const { Router } = require('express');
var fs = require('fs');
const commonModel = require("../models/commonModel");


multer({ dest: './public/images' });
multer({ dest: './public/upload-files' });

// Upload profile pic
const storageImg = multer.diskStorage({
    destination: function (req, file, cb) { cb(null, './public/images/') },
    filename: function (req, file, cb) { cb(null, `profile_${date.getDate()}-${date.getMonth()}-${date.getFullYear()}_${Math.floor(Math.random() * 10000000)}_${file.originalname}`) },
});
const uploadImg = multer({ storage: storageImg }).single('profile_img');

// Upload files
const storageFiles = multer.diskStorage({
    destination: function (req, file, cb) { cb(null, './public/images/') },
    filename: function (req, file, cb) { cb(null, `files_${date.getDate()}-${date.getMonth()}-${date.getFullYear()}_${Math.floor(Math.random() * 10000000)}_${file.originalname}`) },
});
const uploadFiles = multer({ storage: storageFiles }).any();


// Upload Thumbail Images Middleware START  //
// const thumbnailImg = async function myData(req, res, next) {
//     if (req.file != undefined) {
//         var { filename: thumbnail_img } = req.file
//         await sharp(req.file.path, { failOnError: false }).resize(64, 64).withMetadata()
//             .toFile(path.resolve('./public/thumbnail/', thumbnail_img.replace(/\.(jpeg|png)$/, `.jpg`)))
//     }
//     next();
// }

const thumbnailImg = async function myData(req, res, next) {
    if (req.file != undefined) {
        var { filename: thumbnail_img } = req.file
        // await sharp(req.file.path, { failOnError: false }).resize(64, 64).withMetadata()
        //     .toFile(path.resolve('./public/thumbnail/', thumbnail_img.replace(/\.(jpeg|png)$/, `.jpg`)))
        const width = 400,
            r = width / 2,
            circleShape = Buffer.from(`<svg><circle cx="${r}" cy="${r}" r="${r}" /></svg>`);

        sharp(req.file.path)
            .resize(width, width)
            .composite([{
                input: circleShape,
                blend: 'dest-in'
            }])
            .webp()
            .toFile(path.resolve('./public/thumbnail/', thumbnail_img.replace(/\.(jpeg|png)$/, `.jpg`)), (err, info) => err ?
                console.error(err.message) :
                console.log(info)
            );
    }
    next();
}
// Upload Thumbail Images Middleware END *****//


//*****  AUTHENTICATION ROUTES START *****//
routes.post('/login', controllers.authController.login);
//*****  AUTHENTICATOIN ROUTES END *****//

// //*****  DASHBOARD ROUTES START *****//
// routes.get('/getCounts', controllers.dashboardController.getCounts);
routes.get('/getCounts', controllers.dashboardController.getCounts);
routes.get('/getPieChart_agent', controllers.dashboardController.getPieChart_agent);
routes.get('/getFavoriteAgents', controllers.dashboardController.getFavoriteAgents);
routes.get('/getYearSubscription', controllers.dashboardController.getThisYearSubscription);
routes.get('/getMonthSubscriptions', controllers.dashboardController.getMonthSubscriptions);
routes.get('/getWeekSubscriptions', controllers.dashboardController.getWeekSubscriptions)
// routes.get('/getMonthSubscriptions1', controllers.dashboardController.getMonthSubscriptions1);
// routes.get('/getWeekSubscriptions1',controllers.dashboardController.getWeekSubscriptions1)

// routes.get('/getYearSubscription', controllers.dashboardController.getThisyearSubscriptions);
// //*****  DASHBOARD ROUTES END *****//

routes.post('/updateUserData/:id', [uploadImg, thumbnailImg], controllers.agentController.updateUserData);
//*****  AGENT ROUTES START *****//
routes.post('/addEditAgent/:id', [uploadImg, thumbnailImg], controllers.agentController.addEditAgent);
routes.get('/getCountryCode', controllers.agentController.getCountryCode);
// routes.get('/getAgentList/:id', controllers.agentController.getAgentList);
routes.post('/getAgentList', controllers.agentController.getAgentList)

// routes.get('/getDefaultAndPartnerAgent/:id', controllers.agentController.getDefaultAndPartnerAgent);
routes.post('/getDefaultAndPartnerAgent', controllers.agentController.getDefaultAndPartnerAgent);
routes.post('/getnearbyForAgentList', controllers.agentController.getnearbyForAgentList);
routes.get('/getnearbyAgent', controllers.agentController.getnearbyAgent);
routes.post('/updateNearbyAgent', controllers.agentController.updateNearbyAgent);
routes.post('/deleteNearbyAgent', controllers.agentController.deleteNearbyAgent);
routes.post('/addNearbyAgent', controllers.agentController.addNearbyAgent);
//**************Edit Profile******************//
routes.post('/editProfile/:id', [uploadImg, thumbnailImg], controllers.agentController.editProfile);
routes.post('/verifyPassword', controllers.agentController.verifyPassword);

routes.post('/admineditProfile/:id', [uploadImg, thumbnailImg], controllers.agentController.admineditProfile);
//**************Edit Profile******************//

routes.post('/getAgentByEmail', controllers.agentController.getAgentByEmail);
routes.get('/getAgentById/:id', controllers.agentController.getAgentById);
routes.post('/changeAgentStatus/:id', controllers.agentController.changeAgentStatus);
routes.post('/changeDefaultAgentStatus/:id', controllers.agentController.changeDefaultAgentStatus);
routes.post('/makeDefaultAgentAdmin/:id', controllers.agentController.makeDefaultAgentAdmin);
routes.get('/getFSA', controllers.agentController.getFSA);
routes.post('/updatePass/:token', controllers.agentController.updatePass);
routes.post('/getLastId', controllers.agentController.getLastId);
routes.get('/getLastId', controllers.agentController.getLastId);
routes.get('/getPartnerList/:id', controllers.agentController.getPartnerList);
routes.post('/activateFSA/:id', controllers.agentController.activateFSA);
//*****  AGENT ROUTES END *****//

//*****  USER ROUTES START *****//
routes.get('/getUserList/', controllers.agentController.getUserList);
routes.get('/getDefaultAgent', controllers.agentController.getDefaultAgent);
routes.get('/getUserById/:id', controllers.agentController.getUserById);
routes.get('/getadminById/:id', controllers.agentController.getadminById);
routes.get('/getLoginUserDetail/:id', controllers.agentController.getLoginUserDetail);
routes.get('/FSAByUserIdData/:id', controllers.agentController.FSAByUserIdData);
// routes.get('/getUserDetailsById/:id/:agentid', controllers.agentController.getUserDetailsById);
routes.post('/getUserDetailsById/:id/:agentid/:fsa_id', controllers.agentController.getUserDetailsById);
routes.post('/addNewAgent', controllers.agentController.addAgentClient);
routes.post('/addToMyNetwork', controllers.agentController.addToMyNetwork)
//*****  USER ROUTES END *****//

//HOME PAGE ROTUES START
routes.get('/', controllers.homeController.index);
//HOME PAGE ROTUES END

/******FSA ROTUES START*/
routes.get('/getActiveFSA', controllers.fsaController.getActiveFSA);
routes.post('/getActiveFSAStatus', controllers.fsaController.getActiveFSAStatus);
routes.post('/getActiveFSAIdAndData', controllers.fsaController.getActiveFSAIdAndData);
routes.post('/FSAChangeStatus/:id', controllers.fsaController.FSAChangeStatus);
routes.post('/changeFSAAgentStatus/:id', controllers.fsaController.changeFSAAgentStatus);
routes.get('/fsaById/:id', controllers.fsaController.fsaById);
routes.get('/getActiveFSAForMap', controllers.fsaController.getActiveFSAForMap);
routes.post('/getActiveFSAForMap', controllers.fsaController.getActiveFSAForMap);
routes.get('/getDefaultAgent/:id', controllers.fsaController.getDefaultAgent);
routes.post('/getDefaultAgentPost', controllers.fsaController.getDefaultAgentPost);
routes.post('/GetSubagentForMap', controllers.fsaController.GetSubagentForMap);
routes.post('/getAgentsFSA', controllers.fsaController.getAgentsFSA);
routes.post('/GetNeighbourhoodAgent', controllers.fsaController.GetNeighbourhoodAgent);
routes.post('/getSubAgentByFSA', controllers.fsaController.getSubAgentByFSA);
routes.get('/getActiveFsaWithAdderess', controllers.fsaController.getActiveFsaWithAdderess);
routes.get('/getActiveFSATotal', controllers.fsaController.getActiveFSATotal);
routes.get('/getActiveAgentTotal', controllers.agentController.getActiveAgentTotal);
routes.get('/getNextAgentId/:id', controllers.agentController.getNextAgentId);
routes.get('/getPreviousAgentId/:id', controllers.agentController.getPreviousAgentId);

routes.post('/getSubAgent', controllers.fsaController.getSubAgent);
routes.get('/getDefaultAgentOrSubAgent/:fsa/:userid', controllers.fsaController.getDefaultAgentOrSubAgent);
routes.get('/getFSAActiveDefaultAgent/:id', controllers.fsaController.getFSAActiveDefaultAgent);
routes.get('/getDefaultAgentByFSA/:id', controllers.fsaController.getDefaultAgentByFSA);

routes.post('/editFSAName/:id', controllers.fsaController.fsaName);
routes.get('/fsaAddressById/:id', controllers.fsaController.fsaAddressById);
routes.post('/neighborhood/:id', controllers.fsaController.neighborhood);

/******FSA ROTUES END*/

routes.post('/GetDefaultAgentByLatLong', controllers.fsaController.GetDefaultAgentByLatLong);
routes.post('/getAgentsByCityRealtor', controllers.fsaController.getAgentsByCityRealtor)


// ADVERTISEMENT ROUTES START //
routes.get('/getAdvertisementList', controllers.advertisementContoller.getAdvertisementList);
routes.post('/addEditAdvertisement/:id', [uploadImg, thumbnailImg], controllers.advertisementContoller.addEditAdvertisement);
routes.get('/getAdvertisementById/:id', controllers.advertisementContoller.getAdvertisementById);
routes.post('/changeAdvertisementStatus/:id', controllers.advertisementContoller.changeAdvertisementStatus);
routes.get('/getDateRange', controllers.advertisementContoller.getDateRange);
routes.get('/DeleteAd/:id', controllers.advertisementContoller.DeleteAd);

//ADVERTISEMENT ROUTES END //


routes.post('/createRequestForSubagent', controllers.requestContoller.createRequestForSubagent);
routes.post('/RealtorSignup', [uploadImg, thumbnailImg], controllers.registrationContoller.RealtorSignup);


//REQUEST ROUTES START //
// routes.post('/createRequestForSubagent', controllers.requestContoller.createRequestForSubagent);
routes.post('/getRequestData', controllers.requestContoller.getRequestData);
routes.get('/getRequestDataById/:id', controllers.requestContoller.getRequestDataById)
routes.post('/verifyPhoneNo', controllers.requestContoller.verifyPhoneNo);
routes.post('/verifyEmail', controllers.requestContoller.verifyEmail);
routes.post('/sendRequestFromAdmin', controllers.requestContoller.sendRequestFromAdmin);
routes.post('/requestChange', controllers.requestContoller.requestChange);

//REQUEST ROUTES END //
routes.post('/Sendlink/:id', controllers.requestContoller.Sendlink);
//CONTACT ROUTES START //
routes.post('/addContactData', controllers.contactController.addContactData)
// routes.post('/getContactData', controllers.contactController.getContactData);
routes.get('/getContactData', controllers.contactController.getContactData);

routes.get('/getContactDataById/:id', controllers.contactController.getContactDataById);
routes.get('/getAgentDataById/:id', controllers.contactController.getAgentDataById);
//CONTACT ROUTES END //

routes.post('/makePayment/:id', [uploadImg, thumbnailImg], controllers.paymentContoller.makePayment);
routes.post('/makePaymentClient', [uploadImg, thumbnailImg], controllers.paymentContoller.makePaymentClient);
routes.post('/checkIfFsaIsAlready', controllers.fsaController.checkIfFsaIsAlready);

//Request Become Agent START//
// routes.get('/getBecomeAgentList',controllers.becomeAgentController.getBecomeAgentList);
routes.post('/getBecomeAgentList', controllers.becomeAgentController.getBecomeAgentList)
routes.post('/getDefaultAgentOnMap', controllers.fsaController.getDefaultAgentOnMap)
// routes.get('/getClientListAdmin/:id',controllers.agentController.getClientListAdmin)
routes.post('/getClientListAdmin', controllers.agentController.getClientListAdmin)
routes.post('/getAgentAuthorizedStatus', controllers.agentController.getAgentAuthorizedStatus);
routes.post('/ChangAgentAuthorizedStatus/:id', controllers.agentController.ChangAgentAuthorizedStatus);

routes.get('/getActiveFSAWithDefaultAgent/:id', controllers.fsaController.getActiveFSAWithDefaultAgent)
routes.get('/getDefaultAgentInAdminList', controllers.agentController.getDefaultAgentInAdminList)




//Request Become Agent END// 
routes.post('/JoinUs/:id', [uploadImg, thumbnailImg], controllers.agentController.JoinUs);
routes.post('/deleteUser', controllers.agentController.deleteUser);
routes.post('/recoverUser', controllers.agentController.recoverUser);
routes.post('/MakeFavorite', controllers.agentController.MakeFavorite);
routes.post('/getFsaCodeAndNeighborhood', controllers.agentController.getFsaCodeAndNeighborhood);
routes.post('/deletePofile', controllers.agentController.deletePofile);




//Footer_text
routes.post('/addEdit/:id', controllers.footerTextController.addEdit);
routes.get('/getFooter', controllers.footerTextController.getFooter);

routes.post('/threeDefaultAgent', controllers.fsaController.threeDefaultAgent);
routes.post('/updateFsaLatLong', controllers.fsaController.updateFsaLatLong);


//-----------------------------------------------------------------------------------------------------//



// ------------------------------------------------------------------------------------------


routes.post('/NextButton/:id', controllers.agentController.getNextButton);
routes.post('/PreviousButton/:id', controllers.agentController.getPreviousButton);

routes.post('/UserNextButton/:id', controllers.agentController.UserNextButton);
routes.post('/UserPreviousButton/:id', controllers.agentController.UserPreviusButton);

routes.post('/ClientNextButton/:id', controllers.agentController.ClientNextButton);
routes.post('/ClientPreviusButton/:id', controllers.agentController.ClientPreviusButton);




//---------------------------------------------------------------------------------------------------------

routes.get('/getAllFSA', controllers.fsaController.getAllFSA);
routes.get('/getAllAgentsName', controllers.fsaController.getAllAgentsName);
routes.post('/getAgentMail', controllers.fsaController.getAgentMail);
routes.post('/getAgentByName', controllers.fsaController.getAgentByName);
routes.post('/sendReferral', controllers.fsaController.sendReferral);

routes.get('/getDefaultagentByFSARefer', controllers.fsaController.getDefaultagentByFSARefer);

routes.post('/GetHomepageMapData', controllers.fsaController.GetHomepageMapData);

routes.get('/UnsubscribeAgent/:id/:reqId', controllers.agentController.UnsubscribeAgent);
routes.post('/getsubAdminList', controllers.agentController.getsubAdminList);
routes.post('/addEditsubadmin/:id', uploadImg, controllers.agentController.addEditsubadmin);
routes.post('/getuserroles', controllers.agentController.getuserroles);

routes.post('/changeadminStatus/:id', controllers.agentController.changeadminStatus);
routes.get('/getsubadminById/:id', controllers.agentController.getsubadminById);



routes.post('/addFSA', controllers.fsaController.addNewFsaInAdmin);
routes.post('/checkFsaInAdmin', controllers.fsaController.checkFsaInAdmin);

routes.post('/editFsa/:id', controllers.fsaController.EditFsaInAdmin)





// *************** Thumbnail Images Save In The Thumbanail Folder API Start *******************************************

routes.get('/changeToThumbnail', async (req, res, next) => {
    try {
        let getImages = await commonModel.changeToThumbnail();
        let count = 0;
        if (getImages.length) {
            const width = 400,
                r = width / 2,
                circleShape = Buffer.from(`<svg><circle cx="${r}" cy="${r}" r="${r}" /></svg>`);

            for (let i = 0; i < getImages.length; i++) {
                var { profile_img: thumbnail } = getImages[i]
                if (fs.existsSync('public/images/' + thumbnail)) {
                    await sharp('public/images/' + thumbnail, { failOnError: false })
                        .resize(width, width)
                        .composite([{
                            input: circleShape,
                            blend: 'dest-in'
                        }])
                        .webp()
                        .toFile(path.resolve('./public/thumbnail/', thumbnail.replace(/\.(jpeg|png)$/, `.jpg`)), (err, info) => err ?
                            console.error(err.message) :
                            console.log(info)
                        );
                }
                // await sharp('public/images/' + thumbnail, { failOnError: false }).resize(64, 64,).withMetadata()
                //     .toFile(path.resolve('./public/thumbnail/', thumbnail.replace(/\.(jpeg|png)$/, `.jpg`)))
                // }
                count++;
            }
            console.log(count,'count-----')
        }
        if (getImages.length) {
            return res.json({ status: true, msg: 'Thumbnail Images Saved Successfully!' });
        } else {
            return res.json({ status: false, msg: 'Thumbnail Images Not Save!' });
        }
    } catch (err) {
        console.log(err)
        return res.json({ status: false, msg: 'Something Went Wrong!' });
    }
});

// *************** Thumbnail Images Save In The Thumbanail Folder API End *******************************************

routes.post('/editFsa/:id', controllers.fsaController.EditFsaInAdmin)

routes.post('/getFsaNext', controllers.fsaController.getFsaNext);
routes.post('/getFsaPrevious', controllers.fsaController.getFsaPrevious);



//**************************************************Sourabh****************************************************************

routes.post('/myAgentData', controllers.agentController.myAgentDataById);
routes.post('/myClientData', controllers.agentController.myClientData);

routes.post('/addNoteData', controllers.agentController.addNoteData);
routes.post('/getNoteData', controllers.agentController.getNoteData);
routes.post('/editNoteData/:id', controllers.agentController.editNoteData);


module.exports = routes;