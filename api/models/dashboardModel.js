
const dashboardModel = {};
const commonFun = require('../helpers/commonFun');
const commonModel = require('./commonModel');


// dashboardModel.getAgentDataCount = () => {
//     let que = `SELECT SUM(CASE WHEN user_type = 1 THEN 1 ELSE 0 END) AS 'admin',
//     SUM(CASE WHEN user_type = 2 THEN 1 ELSE 0 END) AS 'default_agent',
//     SUM(CASE WHEN user_type = 3 THEN 1 ELSE 0 END) AS 'sub_agent',
//     SUM(CASE WHEN user_type = 4 THEN 1 ELSE 0 END) AS 'public_user',
//     COUNT(id) AS Total
//     FROM agent`;
//     console.log('que counbt',que)
//     return commonFun.runSQLquery(que);
// }

dashboardModel.getAgentDataCount = () => {
    // let que = `SELECT SUM(CASE WHEN user_type = 1 THEN 1 ELSE 0 END) AS 'admin',
    // SUM(CASE WHEN user_type = 2 THEN 1 ELSE 0 END) AS 'default_agent',
    // SUM(CASE WHEN user_type = 3 THEN 1 ELSE 0 END) AS 'sub_agent',
    // SUM(CASE WHEN user_type = 4 && status In(1,0) THEN 1 ELSE 0 END) AS 'public_user',
    // COUNT(id) AS Total
    // FROM agent`;
    // let que = `SELECT SUM(CASE WHEN user_type = 1 THEN 1 ELSE 0 END) AS 'admin',
    // SUM(CASE WHEN user_type = 2 THEN 1 ELSE 0 END) AS 'default_agent',
    // SUM(CASE WHEN user_type = 3 THEN 1 ELSE 0 END) AS 'sub_agent',
    // SUM(CASE WHEN user_type = 4 && status In(1,0) THEN 1 ELSE 0 END) AS 'public_user',
    // SUM(CASE WHEN user_type = 2 && is_default_agent = 0 && status In(1,0) THEN 1 ELSE 0 END) AS 'Client_Agent',
    // COUNT(id) AS Total
    // FROM agent`;
    let que = `SELECT SUM(CASE WHEN user_type = 1 THEN 1 ELSE 0 END) AS 'admin',
    SUM(CASE WHEN user_type = 2 THEN 1 ELSE 0 END) AS 'default_agent',
    SUM(CASE WHEN user_type = 3 THEN 1 ELSE 0 END) AS 'sub_agent',
    SUM(CASE WHEN user_type = 4 && status In(1) THEN 1 ELSE 0 END) AS 'public_user',
    SUM(( ( user_type = 2 && is_default_agent = 0 ) || (agent_type = 1) ) && status = 1 ) AS 'Client_Agent',
    COUNT(id) AS Total
    FROM agent`;
    
    console.log('que counbt1111122222222222',que)
    return commonFun.runSQLquery(que);
}



dashboardModel.getRequestCount = () => {
    let que = `SELECT COUNT(*) as request FROM request WHERE status = 0`;
    return commonFun.runSQLquery(que);
}

dashboardModel.getPieChart_agent = () => {
    let que = `SELECT user_fsa.user_id, COUNT(user_fsa.user_id) as value ,agent.* FROM user_fsa LEFT JOIN agent ON user_fsa.user_id = agent.id WHERE agent.user_type=2 AND agent.status=1 AND user_fsa.status=1 AND user_fsa.activate_status=1 GROUP BY user_fsa.user_id ORDER BY COUNT(user_fsa.user_id) DESC LIMIT 5`;
    return commonFun.runSQLquery(que);
}
dashboardModel.getFavoriteAgents = () => {
    let que = `SELECT user_fsa.user_id, COUNT(user_fsa.user_id) as value ,agent.* FROM user_fsa LEFT JOIN agent ON user_fsa.user_id = agent.id WHERE agent.user_type=2 AND agent.status=1 AND user_fsa.status=1 AND user_fsa.activate_status=1 GROUP BY user_fsa.user_id ORDER BY COUNT(user_fsa.user_id) DESC LIMIT 5`;
    return commonFun.runSQLquery(que);
}

dashboardModel.gettotalRequest = () => {
    // let que = `SELECT COUNT(*) as total_become_request FROM payment`;
    que = `SELECT Count(*) as total_become_request FROM payment LEFT JOIN agent on agent.id = payment.user_id WHERE agent.user_type = 2 AND agent.is_default_agent = 0 AND agent.status != 2 `;
    return commonFun.runSQLquery(que)
}
dashboardModel.getThisyearSubscriptions = (currentYear) => {
    let que = `SELECT MONTHNAME(MAX(created_at)) AS month, Month(created_at) AS Months,YEAR(created_at) AS year, SUM(amount) AS amount FROM payment WHERE YEAR(created_at) = ${currentYear} GROUP BY  months`;
    // console.log(que)
    return commonFun.runSQLquery(que);
}

dashboardModel.getMonthSubscriptionsTotal = (currentMonth,currentYear) => {
    let que = `SELECT Month(created_at) AS Month,YEAR(created_at) AS year, SUM(amount) as amount FROM payment WHERE Month(created_at) = ${currentMonth} And YEAR(created_at) = ${currentYear} GROUP By Month`;
    // console.log(que)
    return commonFun.runSQLquery(que);
}


dashboardModel.getMonthSubscriptions = (currentMonth,currentYear) => {
    // let que = `SELECT Month(created_at) AS Month,YEAR(created_at) AS year, SUM(amount) as amount FROM payment WHERE Month(created_at) = ${currentMonth} And YEAR(created_at) = ${currentYear} GROUP By week`;
    let que = `SELECT Month(created_at) AS Month,YEAR(created_at) AS year, (WEEK(created_at)) as week, SUM(amount) as amount FROM payment WHERE Month(created_at) = ${currentMonth} And YEAR(created_at) =  ${currentYear} GROUP By week`
    // console.log(que)
    return commonFun.runSQLquery(que);
}

dashboardModel.getfirstData = (currentMonth) => {
    // let que = `SELECT CONCAT(MONTHNAME(created_at), week, FLOOR(((DAY(created_at) - 1) / 7) + 1)) month & week, SUM(amount) AS value FROM payment WHERE MONTH(created_at) = 8 GROUP BY month & week ORDER BY month(created_at)  month & week`;
    let que = `SELECT  MONTH(created_at) as month ,CEILING(DATE_FORMAT(created_at,'%d')/7) w,SUM(amount) week_total FROM payment WHERE  Month(created_at) = ${currentMonth} GROUP  BY w`;
    // console.log(que)
    return commonFun.runSQLquery(que);
}

dashboardModel.getMonthSubscriptionsFirstWeek = (currentMonth,currentYear, currentWeek) => {
    let que = `SELECT Month(created_at) AS Month,YEAR(created_at) AS year,(WEEK(created_at)) as week,SUM(amount) as amount FROM payment WHERE YEAR(created_at) = ${currentYear} and Month(created_at) = ${currentMonth} And (WEEK(created_at)) =  ${currentWeek}`
    // let que = `SELECT Month(created_at) AS Month,YEAR(created_at) AS year, SUM(amount) as amount FROM payment WHERE Month(created_at) = ${currentMonth} And YEAR(created_at) = ${currentYear} GROUP By week`;
    // let que = `SELECT Month(created_at) AS Month,YEAR(created_at) AS year, (WEEK(created_at)) as week, SUM(amount) as amount FROM payment WHERE Month(created_at) = ${currentMonth} And YEAR(created_at) =  ${currentYear} GROUP By week`
    return commonFun.runSQLquery(que);
}
dashboardModel.getMonthSubscriptionsSecondWeek = (currentMonth,currentYear, currentWeek) => {
    let que = `SELECT Month(created_at) AS Month,YEAR(created_at) AS year,(WEEK(created_at)) as week,SUM(amount) as amount FROM payment WHERE YEAR(created_at) = ${currentYear} and Month(created_at) = ${currentMonth} And (WEEK(created_at)) =  ${currentWeek}`;
    return commonFun.runSQLquery(que);
}


dashboardModel.getWeekSubscriptions = (currentYear, currentMonth,currentWeek) => {
    let que = `SELECT Month(created_at) AS Month,YEAR(created_at) AS year,(WEEK(created_at)) as week,SUM(amount) as amount FROM payment WHERE YEAR(created_at) = ${currentYear} and Month(created_at) = ${currentMonth} And (WEEK(created_at)) = ${currentWeek}  GROUP By week`;
    // console.log(que)
    return commonFun.runSQLquery(que)
}


dashboardModel.getWeekSubscriptions1 = (currentYear, currentMonth,currentWeek) => {
    let que = `SELECT DAYNAME(created_at) as day,Month(created_at) AS Month,YEAR(created_at) AS year,(WEEK(created_at)) as week,SUM(amount) as amount FROM payment WHERE YEAR(created_at) = ${currentYear} and Month(created_at) = ${currentMonth} AND (WEEK(created_at)) = ${currentWeek}  GROUP By  DAYNAME(created_at)`;
    return commonFun.runSQLquery(que)
}



module.exports = dashboardModel