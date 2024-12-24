const express = require('express');
const routes = express.Router();
const multer = require('multer');
const date = new Date();
const controllers = require('../controllers');

routes.post('/weblogin', controllers.loginController.weblogin);
routes.post('/getUserData', controllers.loginController.getUserData);
routes.post('/reactivate-referral', controllers.loginController.reactivateReferral);
routes.post('/getProfileData/:id', controllers.loginController.getProfileData);
routes.post('/consumerRegistration', controllers.registrationContoller.consumerRegistration);
routes.post('/verifyUserAccount/:id', controllers.registrationContoller.verifyUserAccount);
routes.post('/getRequestByAgent', controllers.requestContoller.getRequestByAgent);
routes.post('/getReferRequest', controllers.requestContoller.getReferRequest);
routes.post('/receivedrequest', controllers.requestContoller.receivedrequest);
routes.post('/changeRequestStatus', controllers.requestContoller.changeRequestStatus);
routes.post('/getRequestDetails', controllers.requestContoller.getRequestDetails);
routes.post('/getRequestDetailss', controllers.requestContoller.getRequestDetailss);
routes.post('/setUserPinMap', controllers.agentController.setUserPinMap);
routes.post('/setUserPinMap', controllers.agentController.setUserPinMap);
routes.get('/getAdvertismentByType/:type', controllers.advertisementContoller.getAdvertismentByType);
routes.post('/updateAdvertismentCount', controllers.advertisementContoller.updateAdvertismentCount);
routes.post('/getUserDataForPayment/:id', controllers.fsaController.getUserDataForPayment);
routes.post('/addToMap', controllers.fsaController.addToMap);
routes.post('/DeleteAgentFromMap', controllers.fsaController.DeleteAgentFromMap);

routes.post('/getRequestByAgentAll', controllers.requestContoller.getRequestByAgentAll);

routes.post('/checkMapAgentExist', controllers.fsaController.checkMapAgentExist);


routes.post('/GetUserRequest', controllers.requestContoller.GetUserRequest);

routes.post('/GetUserRequestAll', controllers.requestContoller.GetUserRequestAll);
routes.get('/verifyRealtor/:id', controllers.registrationContoller.verifyRealtor)

routes.get('/getAdminList', controllers.loginController.getAdminList)

// forgotPassword //
routes.post('/forget-password', controllers.loginController.forgotPassword);
routes.post('/reset-password/:token', controllers.loginController.ResetPassword);


module.exports = routes;