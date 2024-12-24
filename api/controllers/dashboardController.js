const commonModel = require("../models/commonModel");
const dashboardController = function () {};
const resMessage = require("../helpers/res-message");
const dashboardModel = require("../models/dashboardModel");

//***** GET USERS LIST START *****//
// dashboardController.getCounts = async (req, res, next) => {
//     try {
//         let getUserCounts = await commonModel.getUserCounts();
//         let getProgramCounts = await commonModel.getProgramCounts();
//         let getRecipeCounts = await commonModel.getRecipeCounts();
//         let result = [{
//             "user": getUserCounts[0].user,
//             "program": getProgramCounts[0].program,
//             "recipe": getRecipeCounts[0].recipe,
//         }];
//         return res.json({ status: true, msg: resMessage.dataFound, data: result });
//     } catch (err) {
//         return res.json({ status: false, msg: resMessage.noDataFound, data: [] });
//     }
// }
//***** GET USERS LIST END *****//

//***** GET USERS LIST START *****//
dashboardController.getCounts = async (req, res, next) => {
  try {
    // console.log("stea");
    let getAgentDataCount = await dashboardModel.getAgentDataCount();
    let getRequestCount = await dashboardModel.getRequestCount();
    let getbecomeAgentRequest = await dashboardModel.gettotalRequest();
    let getFSACount = await commonModel.getFSAwithDefaultAgent_total();
    let default_total = await commonModel.getFSAwithDefaultAgentTotal();
    // console.log(getbecomeAgentRequest, "getBecone");
    // let getUserCounts = await commonModel.getUserCounts();
    // let getProgramCounts = await commonModel.getProgramCounts();
    // let getRecipeCounts = await commonModel.getRecipeCounts();
    let result = [
      {
        default_agent: getAgentDataCount[0].default_agent,
        sub_agent: getAgentDataCount[0].sub_agent,
        public_user: getAgentDataCount[0].public_user,
        request: getRequestCount[0].request,
        total_agent: getAgentDataCount[0].Total,
        Client_agent: getAgentDataCount[0].Client_Agent,
        total_become_request: getbecomeAgentRequest[0].total_become_request,
        total_fsa: getFSACount[0].Total,
        default_total: default_total[0].total
      },
    ];
    // console.log(result, "result");
    return res.json({ status: true, msg: resMessage.dataFound, data: result });
  } catch (err) {
    console.log(err);
    return res.json({ status: false, msg: resMessage.noDataFound, data: [] });
  }
};

dashboardController.getPieChart_agent = async (req, res, next) => {
  try {
    let result = await dashboardModel.getPieChart_agent();
    let result_data = [];
    for (let i = 0; i < result.length; i++) {
      result_data.push({
        name: result[i].first_name + " " + result[i].last_name,
        value: result[i].value,
      });
    }
    return res.json({
      status: true,
      msg: resMessage.dataFound,
      data: result_data,
    });
  } catch (err) {
    console.log(err);
    return res.json({ status: false, msg: resMessage.noDataFound, data: [] });
  }
};

dashboardController.getFavoriteAgents = async (req, res, next) => {
  try {
    let result = await dashboardModel.getFavoriteAgents();
    for (let x of result) {
      x.profile_img = process.env.image_path + x.profile_img;
      x.name = x.first_name + "   " + x.last_name;
    }
    return res.json({ status: true, msg: resMessage.dataFound, data: result });
  } catch (err) {
    console.log(err);
    return res.json({ status: false, msg: resMessage.noDataFound, data: [] });
  }
};

dashboardController.getThisYearSubscription = async (req, res, next) => {
  try {
    let currentData = new Date();
    let currentYear = currentData.getFullYear();
    let monthName = [];
    let amountData = [];
    let result = await dashboardModel.getThisyearSubscriptions(currentYear);
    let month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let check;
    let resMonth;
    for (let x of month) {
      resMonth = result.map((e) => e.month);
      check = resMonth.includes(x);
      if (!check) result.push({ amount: 0, month: x });
    }
    function sortByMonth(arr) {
      arr.sort(function (a, b) {
        return month.indexOf(a.month) - month.indexOf(b.month);
      });
    }
    sortByMonth(result);
    for(x of result){
        amountData.push(x.amount);
        monthName.push(x.month)
    }

    return res.json({
      status: true,
      msg: resMessage.dataFound,
      data: result,
      month: monthName,
      amount: amountData,
    });
  } catch (err) {
    return res.json({ status: false, msg: resMessage.noDataFound, data: [] });
  }
};

// dashboardController.getMonthSubscriptions = async (req, res, next) => {
//   try {
//     let currentData = new Date();
//     let currentYear = currentData.getFullYear();
//     let currentMonth = currentData.getMonth() + 1; 
//     let week = [];
//     let weeKAmount = [];     
//       let total = await dashboardModel.getMonthSubscriptionsTotal(
//         currentMonth,
//         currentYear
//       );
//       console.log(total)
//       let result = await dashboardModel.getMonthSubscriptions(
//         currentMonth,
//         currentYear
//       );

//         for (let x of result) {
//             week.push(x.week);
//             weeKAmount.push(x.amount)   
//         }

//     return res.json({ status: true, msg: resMessage.dataFound, data: result, week: week, weekAmount: weeKAmount,total: total });
//   } catch (err) {
//     console.log(err);
//     return res.json({ status: false, msg: resMessage.noDataFound, data: [] });
//   }
// };


dashboardController.getMonthSubscriptions = async (req, res, next) => {
  try {
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth() + 1; 
    var oneJan = new Date(currentDate.getFullYear(), 0, 1);
    var numberOfDays = Math.floor((currentDate - oneJan) / (24 * 60 * 60 * 1000));
    let week = [];
    let weekAmount = [];     
    let total = await dashboardModel.getMonthSubscriptionsTotal(currentMonth,currentYear);
    let result = await dashboardModel.getfirstData(currentMonth);
    Date.prototype.getWeekOfMonth = function () {
    var firstDay = new Date(this.setDate(1)).getDay();
    var totalDays = new Date(this.getFullYear(), this.getMonth() + 1, 0).getDate();
    return Math.ceil((firstDay + totalDays) / 7);}
    let totalWeeks = new Date().getWeekOfMonth();
    for (let k = 1; k <= totalWeeks; k++) {
      let weks = result.map((e) => e.w);
      check = weks.includes(k);
      if(!check) result.push({month: currentMonth,w: k,week_total: 0})}
       for(let x of result){
      week.push(x.w);
      weekAmount.push(x.week_total)
    }
        // console.log(result,'result')

    return res.json({ status: true, msg: resMessage.dataFound, data: result, week: week, weekAmount: weekAmount,total: total });
  } catch (err) {
    console.log(err);
    return res.json({ status: false, msg: resMessage.noDataFound, data: [] });
  }
};

// dashboardController.getWeekSubscriptions1 = async (req, res, next) => {
//   try {
//     let currentDate = new Date();
//     let currentYear = currentDate.getFullYear();
//     var oneJan = new Date(currentDate.getFullYear(), 0, 1);
//     var numberOfDays = Math.floor(
//       (currentDate - oneJan) / (24 * 60 * 60 * 1000)
//     );
//     var currentWeek = Math.ceil((currentDate.getDay() + numberOfDays) / 7);
//     let currentMonth = currentDate.getMonth() + 1;
//     console.log(currentYear, currentMonth, currentWeek, "week");

//     let result = await dashboardModel.getWeekSubscriptions(
//       currentYear,
//       currentMonth,
//       currentWeek
//     );
//     console.log(result);
//     return res.json({ status: true, msg: resMessage.dataFound, data: result });
//   } catch (err) {
//     console.log(err);
//     return res.json({ status: false, msg: resMessage.noDataFound, data: [] });
//   }
// };


dashboardController.getWeekSubscriptions = async (req, res, next) => {
  try {
    let currentDate = new Date();
    let days = [];
    let amount = [];
    let currentYear = currentDate.getFullYear();
    var oneJan = new Date(currentDate.getFullYear(), 0, 1);
    var numberOfDays = Math.floor((currentDate - oneJan) / (24 * 60 * 60 * 1000) );
    var currentWeek = Math.ceil((currentDate.getDay() + (numberOfDays-7)) / 7);
    let currentMonth = currentDate.getMonth() + 1;
    let totalWeekAmount = await dashboardModel.getWeekSubscriptions(currentYear,currentMonth,currentWeek);
    let result = await dashboardModel.getWeekSubscriptions1( currentYear,currentMonth, currentWeek);
    daysName = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      let resDay;
      for(x of daysName){
        resDay = result.map((e) => e.day);
        check = resDay.includes(x);
        if(!check) result.push({ day: x,amount: 0})
      }
      const map = {
        'Monday': 1,'Tuesday': 2,'Wednesday': 3,'Thursday': 4,'Friday': 5,'Saturday': 6,'Sunday': 7
     };
     result.sort((a, b) => {
        return map[a.day] - map[b.day];
     });
    for (let x of result) {
      days.push(x.day);
      amount.push(x.amount)
    }
    // console.log(result);
    return res.json({ status: true, msg: resMessage.dataFound, data: result, day: days, amountDay: amount,total: totalWeekAmount});
  } catch (err) {
    console.log(err);
    return res.json({ status: false, msg: resMessage.noDataFound, data: [] });
  }
};

module.exports = dashboardController;
