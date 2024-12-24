const nodemailer = require('nodemailer');

const resMessage = {
	login: "Login successfully!",
	loginFailed: "Login failed!",
	inavalidEmail: "Invalid email!",
	invalidPass: "Invalid password!",
	invalidToken: "Invalid token!",
	serverError: "Somthing went wrong in server/api!",
	dataFound: "Data found!",
	noDataFound: " No data found!",
	addSucc: "Added Successfully!",
	DeleteSucc: "Deleted successfully!",
	advertisementExist: "Advertisement already added. You can edit",
	submitSucc: 'inquiry sent Successfully',
	errMsg: "There was an error!",
	registration: "Registration Successfully!",
	registrationErr: "There was an error in registration!",
	emailExist: "Email already exist, choose another eamil!",
	updateSucc: "Updated Successfully!",
	updateFailed: "There was an error in update!",
	chooseAnotherPas: "Choose another password!",
	statusChange: "Status Changed Successfully!",
	statusChangeErr: "There was an error in status change!",
	programAssignSucc: "Assign Successfully!",
	programAssignErr: "There was an error in assign program!",
	deleteSucc: "Deleted Successfully!",
	emailExist: "Email already exist!",
	numberExist: "phone already exist!",
	emailNumberExist: "Either the email or phone already exist, Please try with other.",
	alreadyActivated: "Deafult Agent already activated!",
	deactivate: "Your account is deactivated, You can contact to admin!",
	alreadyAddedToMap: "Already added to your map!",
	mapAgents: "No agent found in your map!",
	shortBiolength: "Short bio max length is only 20 character",
	accountNoExist: "Account Number already exist, choose another account Number!",
	edit:"Updated Successfully!"
	
}

module.exports = resMessage;