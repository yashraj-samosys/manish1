const commonModel = {};
const e = require('express');
const { data } = require('jquery');
const commonFun = require('../helpers/commonFun');
//***** Insert query start *****//
commonModel.insert = (table, data) => {
    var que = "INSERT INTO " + table + " SET ?";
    console.log('queAGENT', data,que)
    return commonFun.runSqlQueryWithData(que, data);
}
//***** Insert query end *****//

//***** Select all query start *****//
commonModel.selectAll = (table) => {
    let que = "SELECT * FROM " + table;
    return commonFun.runSQLquery(que);
}
//***** Select all query end *****//

//***** Select all order by query start *****//
commonModel.selectAllOrderBy = (table, orderBy, action) => {
    let que = "SELECT * FROM " + table + " ORDER BY " + orderBy + " " + action;
    return commonFun.runSQLquery(que);
}

commonModel.getDescOneUser = () => {
    let que = "SELECT s_no FROM near_by WHERE is_deleted = 0 ORDER BY near_by.s_no DESC LIMIT 1";
    return commonFun.runSQLquery(que);
}
//***** Select all order by query end *****//

//***** Select all where query start *****//
commonModel.selectColumnWhere = (table, obj,columns) => {
    let que = "SELECT "+columns+" FROM  " + table + " WHERE ";
    let counter = 1;
    for (let k in obj) {
        if (counter == 1) {
            que += k + "= '" + obj[k] + "'";
        } else {
            que += " AND " + k + "= '" + obj[k] + "' ";
        }
        counter++;
    }
//   console.log(que,'eeee--seAll')
    return commonFun.runSQLquery(que);
}
commonModel.selectAllWhere = (table, obj) => {
    let que = "SELECT * FROM  " + table + " WHERE ";
    let counter = 1;
    for (let k in obj) {
        if (counter == 1) {
            que += k + "= '" + obj[k] + "'";
        } else {
            que += " AND " + k + "= '" + obj[k] + "' ";
        }
        counter++;
    }
//   console.log(que,'eeee--seAll')
    return commonFun.runSQLquery(que);
}

commonModel.selectAllWhereIn = (table, key, in_condition) => {
    let que = `SELECT * FROM ${table} WHERE ${key} IN${in_condition}`;  
    return commonFun.runSQLquery(que);
}
commonModel.selectOneWhere = (table, obj,columns) => {
    let que = `SELECT ${columns.join(', ')} FROM ${table} WHERE `;
    let counter = 1;

    for (let k in obj) {
        if (counter == 1) {
            que += k + "= '" + obj[k] + "'";
        } else {
            que += " AND " + k + "= '" + obj[k] + "' ";
        }
        counter++;
    }
    que += "LIMIT 1";
// console.log(que)
    // let que = `SELECT * FROM ${table} WHERE ${constructConditions(conditions)} LIMIT 1`
    return commonFun.runSQLquery(que);
}


//***** Select all where query end *****//

//***** Select all where order by query start *****//
commonModel.selectAllWhereOrderBy = (table, obj, orderBy, action) => {
    let que = "SELECT * FROM  " + table + " WHERE ";
    let counter = 1;
    for (let k in obj) {
        if (counter == 1) {
            que += k + "= '" + obj[k] + "'";
        } else {
            que += " AND " + k + "= '" + obj[k] + "' ";
        }
        counter++;
    }
    que += " ORDER BY " + orderBy + " " + action;
    return commonFun.runSQLquery(que);
}
//***** Select all where order by query end *****//

commonModel.update = (table, obj, where) => {

    let que = "UPDATE " + table + " SET ";
    let counter = 1;
    for (let k in obj) {
        if (counter == 1) {
            que += k + " = '" + obj[k] + "'"
        } else {
            que += ", " + k + " = '" + obj[k] + "'"
        }
        counter++;
    }
    let key = Object.keys(where);
    que += " WHERE ";
    let counter01 = 1;
    for (let k of key) {
        if (counter01 == 1) {
            que += k + "= '" + where[k] + "'";
        } else {
            que += " AND " + k + " = '" + where[k] + "' ";
        }
        counter01++;
    }

    // console.log('update que-------->',que);
    
    return commonFun.runSQLquery(que);
}

commonModel.update01 = (table, id, data) => {
  
    let que = "UPDATE " + table + " SET ? WHERE id = " + id
console.log(que,'++++++')
    return commonFun.runSqlQueryWithData(que, data);
}
//***** Update query end *****//


commonModel.updateInUserTable = (table, id, data) => {
    let que = "UPDATE " + table + " SET  user_type= " + data.user_type + " , is_default_agent= " + data.is_default_agent + "  WHERE id = " + id
    
    return commonFun.runSqlQueryWithData(que);
}

commonModel.threeDefaultAgent = () => {
    let que = "SELECT agent.*,fsa.nieghborhood as address, user_fsa.user_fsa_no FROM `agent` LEFT JOIN user_fsa ON agent.id = user_fsa.user_id LEFT JOIN fsa ON user_fsa.fsa_id = fsa.id WHERE agent.id IN(275,276,260 ) && ( agent.user_type = 2 || agent.agent_type=1 ) AND user_fsa.status=1 AND user_fsa.user_fsa_no = 1 GROUP BY agent.id"
    // let que = "SELECT agent.*,fsa.nieghborhood as address FROM `agent` LEFT JOIN user_fsa ON agent.id = user_fsa.user_id LEFT JOIN fsa ON user_fsa.fsa_id = fsa.id WHERE agent.id IN(275,276,260 ) && ( agent.user_type = 2 || agent.agent_type=1 ) AND user_fsa.status=1 GROUP BY agent.id"  // last comment 01/10/22
    
    // let que = 'SELECT * FROM agent WHERE id IN (275,276,260 ) && user_type = 2';

    // let que = 'SELECT * FROM `fsa` WHERE id IN (1,2,3)';
    // let que = 'SELECT *  FROM `user_fsa` WHERE `user_id`in (342,343,344) GROUP By user_id';
    // console.log(que, 'que')
    return commonFun.runSQLquery(que);
}
commonModel.getNewDefaultAgent = (ids) => {
    let que = "SELECT agent.*,fsa.nieghborhood as address, user_fsa.user_fsa_no, near_by.s_no FROM `agent` LEFT JOIN user_fsa ON agent.id = user_fsa.user_id LEFT JOIN fsa ON user_fsa.fsa_id = fsa.id LEFT JOIN near_by ON near_by.user_id = agent.id WHERE agent.id IN("+ids+") && ( agent.user_type = 2 || agent.user_type = 3 ) AND user_fsa.status=1 GROUP BY agent.id"
    console.log('que000000000000000000000',que);
    
    return commonFun.runSQLquery(que);
}

//***** LOGIN START *****//
commonModel.checkEmail = (email) => {
    let que = "SELECT agent.*,countries.phonecode FROM agent LEFT JOIN countries ON agent.country_code_id = countries.id  LEFT JOIN fsa ON agent.fsa_id = fsa.id WHERE  agent.email = '" + email + "' AND agent.user_type IN(1,2,5) ORDER BY agent.id DESC";
    // console.log(que,'email-==')
    return commonFun.runSQLquery(que);
}
//***** LOGIN END *****//

//***** GET AGENT LIST START *****//
commonModel.getClientListAdmin = (user_type, search, filterStatus, count, limit) => {
    // console.log(search,filterStatus,count,limit,'search,filterStatus,count,limit')
    // que="SELECT agent.*,CONCAT(agent.first_name, ' ', agent.last_name) AS fullname,countries.phonecode FROM agent LEFT JOIN countries ON agent.country_code_id = countries.id LEFT JOIN fsa ON agent.fsa_id = fsa.id WHERE (agent.is_default_agent=0  AND agent.user_type = 2) AND (agent.first_name LIKE '"+search+"%' OR agent.last_name LIKE '"+search+"%'  OR agent.email LIKE '"+search+"%'  OR CONCAT(agent.first_name, ' ', agent.last_name) LIKE '"+search+"%') ||  agent.status = 1 ORDER BY agent.id DESC "
    que = "SELECT agent.*,CONCAT(agent.first_name, ' ', agent.last_name) AS fullname,countries.phonecode FROM agent LEFT JOIN countries ON agent.country_code_id = countries.id LEFT JOIN fsa ON agent.fsa_id = fsa.id WHERE ((agent.is_default_agent=0  AND agent.user_type = 2 ) || ( agent.agent_type = 1 ))"

    //   que = "SELECT agent.*,user_fsa.id AS userid,user_fsa.user_id,user_fsa.activate_status,CONCAT(agent.first_name, ' ', agent.last_name) AS fullname,countries.phonecode FROM agent LEFT JOIN countries ON agent.country_code_id = countries.id LEFT JOIN fsa ON agent.fsa_id = fsa.id LEFT JOIN user_fsa ON agent.id = user_fsa.user_id WHERE ((agent.is_default_agent=0 || user_fsa.activate_status = 0) AND agent.user_type = 2 ) "


    if (search != undefined && search != 'null' && search != '') {
        que += " AND (agent.first_name LIKE '" + search + "%' OR agent.last_name LIKE '" + search + "%' OR agent.email LIKE '" + search + "%' OR CONCAT(agent.first_name, ' ', agent.last_name) LIKE '" + search + "%' ) "
    }

    if (filterStatus != undefined && filterStatus != "null" && filterStatus != '') {

        if (filterStatus == 1 || filterStatus == 0) {
            que += " AND agent.status LIKE '%" + filterStatus + "%' "
        }
        if (filterStatus == 2) {
            que += " AND agent.status LIKE '%" + filterStatus + "%' "
        }
    }

    // let que = "SELECT agent.*,CONCAT(agent.first_name, ' ', agent.last_name) AS fullname, countries.phonecode FROM agent LEFT JOIN countries ON agent.country_code_id = countries.id  LEFT JOIN fsa ON agent.fsa_id = fsa.id WHERE  agent.is_default_agent=0 AND agent.status != 2 AND agent.user_type = " + user_type + " ORDER BY agent.id DESC";
    // if(search != undefined && search != 'null' && search != '') que = "SELECT agent.*,CONCAT(agent.first_name, ' ', agent.last_name) AS fullname,countries.phonecode FROM agent LEFT JOIN countries ON agent.country_code_id = countries.id  LEFT JOIN fsa ON agent.fsa_id = fsa.id WHERE  agent.is_default_agent=0 AND agent.status != 2 AND agent.user_type = " + user_type + " AND agent.first_name LIKE '"+search+" %' OR agent.last_name LIKE '"+search+" %'  agent.last_name LIKE '"+search+" %' OR agent.email LIKE '"+search+" %' OR CONCAT(agent.first_name, ' ', agent.last_name) LIKE '"+search+"'  ORDER BY agent.id DESC";
    // if(filterStatus != undefined && filterStatus != 'null' && filterStatus != '') que = "SELECT agent.*,CONCAT(agent.first_name, ' ', agent.last_name) AS fullname,countries.phonecode FROM agent LEFT JOIN countries ON agent.country_code_id = countries.id  LEFT JOIN fsa ON agent.fsa_id = fsa.id WHERE  agent.is_default_agent=0 AND agent.status != 2 AND agent.user_type = " + user_type + " AND agent.first_name LIKE '"+search+" %' OR agent.last_name LIKE '"+search+" %'  agent.last_name LIKE '"+search+" %' OR agent.email LIKE '"+search+" %' OR CONCAT(agent.first_name, ' ', agent.last_name) LIKE '"+search+"' And agent.status Like '"+ filterStatus+"'  ORDER BY agent.id DESC";

    // que += " GROUP BY user_fsa.user_id ORDER BY agent.id DESC  LIMIT "+ count +","+ limit;
    que += " ORDER BY agent.id DESC  LIMIT " + count + "," + limit;

    return commonFun.runSQLquery(que);
}

commonModel.getClientListAdmin_total = (user_type) => {
    // let que = "SELECT COUNT(*) as Total FROM agent LEFT JOIN countries ON agent.country_code_id = countries.id  LEFT JOIN fsa ON agent.fsa_id = fsa.id WHERE  agent.status != 2 AND  ( agent.is_default_agent=0 AND agent.user_type =  " + user_type + " ) || (agent.agent_type = 1 ) ORDER BY agent.id DESC";
    let que = "SELECT COUNT(*) as Total FROM agent LEFT JOIN countries ON agent.country_code_id = countries.id  LEFT JOIN fsa ON agent.fsa_id = fsa.id WHERE ((agent.status=1) AND (( agent.is_default_agent=0 AND agent.user_type =2 ) || (agent.agent_type = 1 ))) ORDER BY agent.id DESC";
    return commonFun.runSQLquery(que);
}


commonModel.getAgentList = (user_type, search, filterStatus, count, limit) => {
  
    
    // let que = "SELECT agent.*,CONCAT(agent.first_name, ' ', agent.last_name) AS fullname,countries.phonecode FROM agent LEFT JOIN countries ON agent.country_code_id = countries.id  LEFT JOIN fsa ON agent.fsa_id = fsa.id WHERE agent.user_type = " + user_type + " AND agent.status != 2 ORDER BY agent.id DESC";
    // if(search) que = "SELECT agent.*,CONCAT(agent.first_name, ' ', agent.last_name) AS fullname,countries.phonecode FROM agent LEFT JOIN countries ON agent.country_code_id = countries.id  LEFT JOIN fsa ON agent.fsa_id = fsa.id WHERE   agent.user_type = " + user_type + " AND agent.status != 2 AND agent.first_name LIKE '"+search+" %' OR agent.last_name LIKE '"+search+" %' OR agent.email LIKE '"+search+" %' OR CONCAT(agent.first_name, ' ', agent.last_name) LIKE '"+search+"' ORDER BY agent.id DESC";
    // que += " LIMIT "+ count +","+ limit;
    let que = "SELECT agent.*,CONCAT(agent.first_name, ' ', agent.last_name) AS fullname,countries.phonecode FROM agent LEFT JOIN countries ON agent.country_code_id = countries.id  LEFT JOIN fsa ON agent.fsa_id = fsa.id WHERE agent.user_type = 4 "


    if (search != undefined && search != 'null' && search != '') {

        que += " && (agent.first_name LIKE '" + search + "%' OR agent.last_name LIKE '" + search + "%' OR agent.email LIKE '" + search + "%' OR CONCAT(agent.first_name, ' ', agent.last_name) LIKE '" + search + "%') "
    }


    if (filterStatus != undefined && filterStatus != "null" && filterStatus != '') {
       

        if (filterStatus == 1 || filterStatus == 0) {
            que += " && agent.status LIKE '%" + filterStatus + "%' "
        }
        if (filterStatus == 2) {
            que += " && agent.status LIKE '%" + filterStatus + "%' "
        }
    }

    que += " ORDER BY agent.id DESC  LIMIT " + count + "," + limit;

    // AND (agent.status LIKE '2%')"

    return commonFun.runSQLquery(que);
}

commonModel.getAgentList_total = (user_type) => {
    // let que = "SELECT COUNT(*) as total FROM agent LEFT JOIN countries ON agent.country_code_id = countries.id  LEFT JOIN fsa ON agent.fsa_id = fsa.id WHERE   agent.user_type = "+ user_type +" AND agent.status != 2 ORDER BY agent.id DESC";
    let que = "SELECT COUNT(*) as total FROM agent LEFT JOIN countries ON agent.country_code_id = countries.id  LEFT JOIN fsa ON agent.fsa_id = fsa.id WHERE   agent.user_type = " + user_type + " AND agent.status = 1 ORDER BY agent.id DESC"
    return commonFun.runSQLquery(que)
}

commonModel.getDefaultAndPartnerAgent = (user_type, search, filterStatus, count, limit) => {

    // let que = "SELECT agent.*,CONCAT(agent.first_name, ' ', agent.last_name) AS fullname,user_fsa.activate_status,user_fsa.status as user_fsa_status,user_fsa.fsa_id,user_fsa.user_id,fsa.nieghborhood as address,countries.phonecode FROM agent LEFT JOIN countries ON agent.country_code_id = countries.id LEFT JOIN fsa ON agent.fsa_id = fsa.id LEFT JOIN user_fsa ON agent.id = user_fsa.user_id WHERE user_fsa.status=1  AND agent.status != 2 AND(agent.user_type = 3 OR (agent.user_type = 2 AND agent.is_default_agent = 1)) GROUP BY agent.id ORDER BY agent.id DESC";
    // if(search) que = "SELECT agent.*,CONCAT(agent.first_name, ' ', agent.last_name),user_fsa.activate_status,user_fsa.status as user_fsa_status,user_fsa.fsa_id,user_fsa.user_id,fsa.nieghborhood as address,countries.phonecode FROM agent LEFT JOIN countries ON agent.country_code_id = countries.id LEFT JOIN fsa ON agent.fsa_id = fsa.id LEFT JOIN user_fsa ON agent.id = user_fsa.user_id WHERE user_fsa.status=1  AND agent.status != 2 AND(agent.user_type = 3 OR (agent.user_type = 2 AND agent.is_default_agent = 1)) AND (agent.first_name LIKE '"+ search +"%' OR agent.last_name LIKE '"+ search +"%' OR agent.email LIKE '"+ search +"%' OR  CONCAT(agent.first_name, ' ', agent.last_name) LIKE '"+ search +"%') GROUP BY agent.id ORDER BY agent.id DESC";
    let que = "SELECT agent.*,agent.address as fullAdress,CONCAT(agent.first_name, ' ', agent.last_name) AS fullname,user_fsa.activate_status,user_fsa.status as user_fsa_status,user_fsa.fsa_id,user_fsa.user_id,fsa.nieghborhood as address,countries.phonecode FROM agent LEFT JOIN countries ON agent.country_code_id = countries.id LEFT JOIN fsa ON agent.fsa_id = fsa.id LEFT JOIN user_fsa ON agent.id = user_fsa.user_id WHERE (agent.user_type = 3 OR (agent.user_type = 2 AND agent.is_default_agent = 1))";
    if (search != undefined && search != 'null' && search != '') que += "AND (agent.first_name LIKE '" + search + "%' OR agent.last_name LIKE '" + search + "%' OR agent.email LIKE '" + search + "%' OR  CONCAT(agent.first_name, ' ', agent.last_name) LIKE '" + search + "%')";

    // if(filterStatus != undefined && filterStatus != "null" && filterStatus != ''){

    //     if(filterStatus == 1 || filterStatus == 0){
    //      que += " AND agent.status LIKE '%"+filterStatus+"%' "
    //  }
    //  if(filterStatus == 2){
    //      que += " AND agent.status LIKE '%"+filterStatus+"%' "
    //   }
    //   }
    if (filterStatus != undefined && filterStatus != "null" && filterStatus != '') {
        if (filterStatus == 1 || filterStatus == 0) {
            que += "AND agent.status LIKE '%" + filterStatus + "%'"
        }
        if (filterStatus == 2) {
            que += "AND agent.status LIKE '%" + filterStatus + "%'"
        } if (filterStatus == 5) {
            que += "AND agent.status LIKE '%" + filterStatus + "%'"
        }
    }
    que += " GROUP BY agent.id ORDER BY agent.id DESC  LIMIT " + count + "," + limit;

    // que += "   LIMIT   " + count + ","+ limit;
  
    return commonFun.runSQLquery(que);
}

commonModel.getnearbyForAgentList = (search) => {
    let que = "SELECT agent.*,agent.address as fullAdress,CONCAT(agent.first_name, ' ', agent.last_name) AS fullname,user_fsa.activate_status,user_fsa.status as user_fsa_status,user_fsa.fsa_id,user_fsa.user_id,fsa.nieghborhood as address,countries.phonecode FROM agent LEFT JOIN countries ON agent.country_code_id = countries.id LEFT JOIN fsa ON agent.fsa_id = fsa.id LEFT JOIN user_fsa ON agent.id = user_fsa.user_id WHERE (agent.user_type = 3 OR agent.user_type = 2) AND agent.status = 1 ";
    if (search != undefined && search != 'null' && search != '') que += "AND (agent.first_name LIKE '" + search + "%' OR agent.last_name LIKE '" + search + "%' OR agent.email LIKE '" + search + "%' OR  CONCAT(agent.first_name, ' ', agent.last_name) LIKE '" + search + "%')";
    que += " GROUP BY agent.id ORDER BY agent.id DESC " ;
    // console.log('getnearbyForAgentList que------>',que);
    return commonFun.runSQLquery(que);
}

commonModel.getnearbyAgent = () => {
    let que = "SELECT near_by.* FROM near_by INNER JOIN agent ON agent.id = near_by.user_id WHERE is_deleted = 0 AND agent.status = 1";
    // let que = "SELECT * FROM near_by WHERE is_deleted = 0";
    // console.log('getnearbyAgent que------>',que);
    return commonFun.runSQLquery(que);
}

//total Count for parther agent
commonModel.getFSAwithDefaultAgentTotal = () => {
    let que = "SELECT DISTINCT COUNT(DISTINCT agent.id) as total FROM agent LEFT JOIN countries ON agent.country_code_id = countries.id LEFT JOIN fsa ON agent.fsa_id = fsa.id LEFT JOIN user_fsa ON agent.id = user_fsa.user_id WHERE user_fsa.status=1 AND agent.status != 2";
    // let que = "SELECT DISTINCT COUNT(DISTINCT agent.id) as total FROM agent LEFT JOIN countries ON agent.country_code_id = countries.id LEFT JOIN fsa ON agent.fsa_id = fsa.id LEFT JOIN user_fsa ON agent.id = user_fsa.user_id WHERE user_fsa.status=1  AND agent.status != 2";
    // let que = "SELECT agent.*,user_fsa.activate_status,user_fsa.status as user_fsa_status,user_fsa.fsa_id,user_fsa.user_id,user_fsa.address,countries.phonecode FROM agent LEFT JOIN countries ON agent.country_code_id = countries.id LEFT JOIN fsa ON agent.fsa_id = fsa.id LEFT JOIN user_fsa ON agent.id = user_fsa.user_id WHERE user_fsa.status=1  AND agent.status != 2 GROUP BY agent.id ORDER BY agent.id DESC";
    return commonFun.runSQLquery(que);
}

commonModel.getFSA = (id) => {
    let que = "SELECT fsa.*,fsa.nieghborhood as address,user_fsa.agent_type,user_fsa.activate_status, user_fsa.user_fsa_no FROM fsa LEFT JOIN user_fsa ON fsa.id = user_fsa.fsa_id WHERE user_fsa.user_id=" + id + " AND user_fsa.status=1 ORDER BY user_fsa.user_fsa_no "; // preference order
    
    // let que = "SELECT fsa.*,fsa.nieghborhood as address,user_fsa.agent_type,user_fsa.activate_status FROM fsa LEFT JOIN user_fsa ON fsa.id = user_fsa.fsa_id WHERE user_fsa.user_id=" + id + " AND user_fsa.status=1 GROUP BY fsa_code";
    // let que = "SELECT fsa.*,fsa.nieghborhood as address,user_fsa.agent_type,user_fsa.activate_status FROM fsa LEFT JOIN user_fsa ON fsa.id = user_fsa.fsa_id WHERE user_fsa.user_id=" + id + " AND user_fsa.status=1 ";
    // let que = "SELECT fsa.*,fsa.nieghborhood as address,user_fsa.agent_type,user_fsa.activate_status FROM fsa LEFT JOIN user_fsa ON fsa.id = user_fsa.fsa_id WHERE user_fsa.user_id=" + id + " AND user_fsa.status=1 ";
   
    return commonFun.runSQLquery(que);
}
//***** GET AGENT LIST END *****//

//***** GET AGENT LIST START *****//
commonModel.getPartnerList = (id) => {
    let que = "SELECT agent.*,countries.phonecode FROM agent LEFT JOIN countries ON agent.country_code_id = countries.id  LEFT JOIN fsa ON agent.fsa_id = fsa.id WHERE agent.user_type = 3 AND parent_id = " + id + " ORDER BY agent.id DESC";
    return commonFun.runSQLquery(que);
}
//***** GET AGENT LIST END *****//


//***** GET AGENT BY ID START *****//
commonModel.getAgentById = (id) => {
    let que = "SELECT agent.*,countries.phonecode FROM agent LEFT JOIN countries ON agent.country_code_id = countries.id  LEFT JOIN fsa ON agent.fsa_id = fsa.id WHERE agent.id = " + id + " && agent.status != 2 ORDER BY agent.id DESC";
    return commonFun.runSQLquery(que);
}
//***** GET AGENT BY ID END *****//

//***** GET AGENT BY ID START *****//
commonModel.getAgentFsa = (id) => {
    let que = "SELECT * FROM fsa WHERE id IN(" + id + ") ";
    return commonFun.runSQLquery(que);
}
//***** GET AGENT BY ID END *****//

//***** GET CLIENT PARTNER COUNT START *****//
commonModel.getClientPartnerCount = (id) => {
    let que = "SELECT COUNT(id) AS count FROM agent WHERE parent_id = " + id + " AND user_type = 3";
    return commonFun.runSQLquery(que);
}
//***** GET CLIENT PARTNER COUNT END *****//

//***** GET USER LIST START *****//
commonModel.getUserList = () => {
    let que = "SELECT agent.*,countries.phonecode FROM agent LEFT JOIN countries ON agent.country_code_id = countries.id  LEFT JOIN fsa ON agent.fsa_id = fsa.id WHERE agent.user_type = 4 ORDER BY agent.id DESC";
    return commonFun.runSQLquery(que);
}
//***** GET USER LIST END *****//

//***** GET USER BY ID START *****//
commonModel.getUserById = (id) => {
    let que = "SELECT agent.*,countries.phonecode FROM agent LEFT JOIN countries ON agent.country_code_id = countries.id  LEFT JOIN fsa ON agent.fsa_id = fsa.id WHERE agent.id = " + id + " ORDER BY agent.id DESC";
  
    return commonFun.runSQLquery(que);
}
commonModel.getUserByIdFSA = (id) => {
    // let que = "SELECT * FROM `user_fsa` WHERE user_id = " +  id  +" ";
    let que = "SELECT * FROM `user_fsa` LEFT JOIN fsa on user_fsa.fsa_id = fsa.id  WHERE (user_fsa.status = 1 AND user_fsa.user_id = " + id + ")"
  
    return commonFun.runSQLquery(que);
}
//***** GET USER BY ID END *****//

//***** GET LAST ID START *****//
commonModel.getLastId = () => {
    let que = "SELECT MAX(id) AS lastId FROM agent";
    return commonFun.runSQLquery(que);
}
//***** GET LAST ID END *****//


//******** GET ADVERTISEMENT LIST START *******//
commonModel.getAdvertisementList = (count, limit) => {
    let que = "SELECT * FROM `advertisement` WHERE status != 2 ORDER BY id DESC";
    que += "   LIMIT   " + count + "," + limit;
    return commonFun.runSQLquery(que);
}
commonModel.getAdvertisementList_total = () => {
    let que = "SELECT COUNt(*) as total FROM advertisement WHERE status != 2 ORDER BY id DESC";
    return commonFun.runSQLquery(que);
}
//********** GET ADVERTISEMENT LIST END ********//

commonModel.getDateRange = () => {
    let que = "SELECT id, MIN(StartDate) AS DB_StartDate, MAX(EndDate) AS DB_EndDate FROM advertisement";
    return commonFun.runSQLquery(que);
}

//***** CHANGE STATUS WITH FSA FOR DEFAULT AGENT START *****//
// commonModel.getWhereFsa = (data) => {
//     let que = "SELECT agent.*,countries.phonecode,fsa.fsa_code FROM agent LEFT JOIN countries ON agent.country_code_id = countries.id  LEFT JOIN fsa ON agent.fsa_id = fsa.id WHERE agent.user_type = 2 AND agent.fsa_id = " + data.fsa_id + " AND agent.status = 1 ORDER BY agent.id DESC";
//     return commonFun.runSQLquery(que);
// }
commonModel.getWhereFsa = (data) => {
    let que = "SELECT agent.*,countries.phonecode,fsa.fsa_code FROM agent LEFT JOIN countries ON agent.country_code_id = countries.id  LEFT JOIN fsa ON agent.fsa_id = fsa.id WHERE agent.user_type = 2 AND agent.id = " + data.id + " AND agent.status = " + data.status + " ORDER BY agent.id DESC";
    return commonFun.runSQLquery(que);
}
//***** CHANGE STATUS WITH FSA FOR DEFAULT AGENT END *****//

commonModel.selectAllSubAgent = (fsa, userid) => {
    let que = "SELECT * FROM `agent` WHERE fsa_id = " + fsa + " AND id = " + userid + " && status = 1";
    return commonFun.runSQLquery(que);
}
//***** GET FSA ACTIVE DEFAULT AGENT START *****//
// commonModel.getRequestData = (filter,count,limit) => {
//     let que = `SELECT request.*,agent.first_name, agent.last_name FROM request LEFT JOIN agent on request.agent_id = agent.id`;
//      if (filter) que = "SELECT request.*,agent.first_name, agent.last_name FROM request LEFT JOIN agent on request.agent_id = agent.id WHERE request.name LIKE '" + filter + "%' OR agent.first_name LIKE '" + filter + "%' OR agent.last_name LIKE '" + filter + "%'  OR request.email LIKE  '" + filter + "%'";
//      que += " LIMIT "+ count +","+ limit;
//      return commonFun.runSQLquery(que);
//  }

commonModel.getFSAActiveDefaultAgent = (id, search, count, limit) => {
    let que;
    // if(filter) que = " SELECT agent.*,user_fsa.activate_status  FROM agent LEFT JOIN user_fsa ON agent.id = user_fsa.user_id WHERE ((agent.user_type = 2 AND agent.is_default_agent=1 ) OR (agent.user_type = 3)) AND agent.status=1 AND user_fsa.status = 1 AND user_fsa.fsa_id = 1 AND ( agent.first_name Like 'Catherine%'  ||  agent.last_name Like 'Catherine%' ||  agent.email Like 'Catherine%' ) GROUP BY agent.id ORDER BY agent.user_type"
    // if (search) que = " SELECT agent.*,user_fsa.activate_status  FROM agent LEFT JOIN user_fsa ON agent.id = user_fsa.user_id WHERE ((agent.user_type = 2 AND agent.is_default_agent=1 ) OR (agent.user_type = 3)) AND agent.status=1 AND (user_fsa.status = 1 || user_fsa.status = 3) AND user_fsa.fsa_id = 1 AND ( agent.first_name Like '" + search + "%'  ||  agent.last_name Like '" + search + "%' ||  agent.email Like '" + search + "%' )";

    if (search) que = "SELECT agent.*,user_fsa.activate_status  FROM agent LEFT JOIN user_fsa ON agent.id = user_fsa.user_id WHERE (agent.user_type = 2 OR agent.user_type = 3) AND agent.status=1 AND user_fsa.status = 1 AND user_fsa.fsa_id = " + id + "  AND ( agent.first_name Like '" + search + "%'  ||  agent.last_name Like '" + search + "%' ||  agent.email Like '" + search + "%' )";
    // if (search) que = " SELECT agent.*,user_fsa.activate_status  FROM agent LEFT JOIN user_fsa ON agent.id = user_fsa.user_id WHERE ((agent.user_type = 2 AND agent.is_default_agent=1 ) OR (agent.user_type = 3)) AND agent.status=1 AND (user_fsa.status = 1 || user_fsa.status = 3) AND user_fsa.fsa_id = " + id + " AND ( agent.first_name Like '" + search + "%'  ||  agent.last_name Like '" + search + "%' ||  agent.email Like '" + search + "%' )";

    // if(search) que = "SELECT agent.*,user_fsa.activate_status  FROM agent LEFT JOIN user_fsa ON agent.id = user_fsa.user_id WHERE (agent.user_type = 2 OR agent.user_type = 3) AND agent.status=1 AND user_fsa.status = 1 AND user_fsa.fsa_id = " + id + "  AND ( agent.first_name Like '"+ search +"%'  ||  agent.last_name Like '"+ search +"%' ||  agent.email Like '"+ search +"%' )";
    //Dev sir else que = "SELECT agent.*,user_fsa.activate_status FROM agent LEFT JOIN user_fsa ON agent.id = user_fsa.user_id WHERE ((agent.user_type = 2 AND agent.is_default_agent=1 ) OR (agent.user_type = 3)) AND agent.status=1 AND user_fsa.status = 1 AND user_fsa.fsa_id = " + id + "";
    // que += "   LIMIT "+ count +","+ limit;
    /* comment by Dev 12-11-2021 7 :20 AM 
    else que = "SELECT agent.*,user_fsa.activate_status, user_fsa.status as FsaStatus  FROM agent LEFT JOIN user_fsa ON agent.id = user_fsa.user_id WHERE ((agent.user_type = 2 AND agent.is_default_agent=1) OR (agent.user_type = 3 AND user_fsa.activate_status = 0)) AND agent.status=1 AND user_fsa.status = 1 AND user_fsa.fsa_id = "+ id +"";
    */
    else que = "SELECT agent.*,user_fsa.activate_status, user_fsa.status as FsaStatus  FROM agent LEFT JOIN user_fsa ON agent.id = user_fsa.user_id WHERE ((agent.user_type = 2 AND agent.is_default_agent=1) OR (agent.user_type = 3 AND user_fsa.activate_status = 0) OR (agent.user_type = 2 AND agent.is_default_agent=0) OR (agent.agent_type =1)) AND agent.status=1 AND (user_fsa.status = 1 || user_fsa.status = 3) AND user_fsa.fsa_id = " + id + ""
    // else que="SELECT agent.*,user_fsa.activate_status, user_fsa.status as FsaStatus FROM agent LEFT JOIN user_fsa ON agent.id = user_fsa.user_id WHERE (agent.user_type = 2 OR agent.user_type = 3) AND agent.status=1 AND user_fsa.status = 1 AND user_fsa.fsa_id ="+ id +""
    // que += "   GROUP BY agent.id Order By agent.user_type  LIMIT " + count + "," + limit;
    que += "  GROUP BY agent.id Order By agent.is_default_agent DESC LIMIT " + count + "," + limit;
    // que +=  " GROUP BY agent.id ORDER BY agent.user_type";
    //Div sir
    // else que = "SELECT agent.*,user_fsa.activate_status  FROM agent LEFT JOIN user_fsa ON agent.id = user_fsa.user_id WHERE ((agent.user_type = 2 AND agent.is_default_agent=1 ) OR (agent.user_type = 3)) AND agent.status=1 AND user_fsa.status = 1 AND user_fsa.fsa_id = " + id + "";
    // que += " LIMIT "+ count +","+ limit;
    // "GROUP BY agent.id ORDER BY agent.user_type";
    return commonFun.runSQLquery(que);
}

commonModel.getActiveDefaulAgenttTotal = (id) => {
   let que = "SELECT agent.*,user_fsa.activate_status, user_fsa.status as FsaStatus FROM agent LEFT JOIN user_fsa ON agent.id = user_fsa.user_id WHERE ((agent.user_type = 2 AND agent.is_default_agent=1) OR (agent.user_type = 3 AND user_fsa.activate_status = 0) OR (agent.user_type = 2 AND agent.is_default_agent=0) OR (agent.agent_type =1)) AND agent.status=1 AND (user_fsa.status = 1 || user_fsa.status = 3) AND user_fsa.fsa_id = " + id + " GROUP BY agent.id Order By agent.is_default_agent DESC"
   return commonFun.runSQLquery(que);
}


commonModel.getFSAwithDefaultAgentTotal1 = (id) => {
    let que = "SELECT agent.id,user_fsa.activate_status, COUNT(agent.id) as total  FROM agent LEFT JOIN user_fsa ON agent.id = user_fsa.user_id WHERE (agent.user_type = 2 OR agent.user_type = 3) AND agent.status=1 AND (user_fsa.status = 1 || user_fsa.status = 3) AND user_fsa.fsa_id = " + id + " GROUP BY agent.status";

    // let que = "SELECT agent.id,user_fsa.activate_status, COUNT(agent.id) as total  FROM agent LEFT JOIN user_fsa ON agent.id = user_fsa.user_id WHERE ((agent.user_type = 2 AND agent.is_default_agent=1 ) OR (agent.user_type = 3)) AND agent.status=1 AND user_fsa.status = 1 AND user_fsa.fsa_id = "+ id +" GROUP BY user_fsa.activate_status";
    return commonFun.runSQLquery(que);

}
//***** GET FSA ACTIVE DEFAULT AGENT END *****//


commonModel.GetDefaultAgentByLatLong = (data) => {
    // let que = "SELECT agent.*, ( 3959 * acos( cos( radians('" + data.lat + "') ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians('" + data.lng + "') ) + sin( radians('" + data.lat + "') ) * sin( radians( latitude ) ) ) ) AS distance FROM agent WHERE parent_id =1 AND status=1   ORDER BY distance ASC LIMIT 0 , 10";
    // let que = "SELECT agent.*, ( 3959 * acos( cos( radians('" + data.lat + "') ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians('" + data.lng + "') ) + sin( radians('" + data.lat + "') ) * sin( radians( latitude ) ) ) ) AS distance FROM agent WHERE user_type=2 AND status=1   ORDER BY distance ASC LIMIT 0 , 10";
    let que = "SELECT fsa.*, ( 3959 * acos( cos( radians('" + data.lat + "') ) * cos( radians( lat ) ) * cos( radians( lng ) - radians('" + data.lng + "') ) + sin( radians('" + data.lat + "') ) * sin( radians( lat ) ) ) ) AS distance FROM fsa WHERE status=1 HAVING distance < 100 ORDER BY distance ASC LIMIT 0, 10";
   
    return commonFun.runSQLquery(que);
}
commonModel.getAgentDataByNearAgent = (data) => {
    let que = "SELECT agent.* FROM user_fsa LEFT JOIN agent ON user_fsa.user_id = agent.id WHERE user_fsa.fsa_id IN(" + data + ") AND agent.status=1 AND user_fsa.status=1 AND user_fsa.activate_status=1 AND agent.user_type=2 GROUP BY agent.id";
    return commonFun.runSQLquery(que);
}

commonModel.getAgentDataByNearAgent1 = (data, loginid) => {
    // let que = "SELECT agent.* FROM user_fsa LEFT JOIN agent ON user_fsa.user_id = agent.id WHERE user_fsa.fsa_id IN(" + data + ") AND agent.status=1 AND user_fsa.status=1 AND user_fsa.activate_status=1 AND agent.user_type=2  GROUP BY agent.id";
    // let que = "SELECT agent.*,fsa.nieghborhood as address FROM user_fsa LEFT JOIN agent ON user_fsa.user_id = agent.id LEFT JOIN fsa ON user_fsa.fsa_id = fsa.id WHERE user_fsa.fsa_id IN (" + data + ") AND agent.status=1 AND user_fsa.status=1 AND user_fsa.activate_status=1 AND agent.user_type=2 GROUP BY agent.id"

    let que = "SELECT agent.*, fsa.id as fsaIDD, fsa.lat , fsa.lng , fsa.nieghborhood as address FROM user_fsa LEFT JOIN agent ON user_fsa.user_id = agent.id LEFT JOIN fsa ON user_fsa.fsa_id = fsa.id WHERE user_fsa.fsa_id IN (" + data + ") AND agent.status=1 AND user_fsa.status=1 AND user_fsa.activate_status=1 AND agent.user_type=2 GROUP BY agent.id"
    return commonFun.runSQLquery(que);
}
commonModel.getDataForlogin = (data) => {
    // let que = "SELECT * FROM `agent` WHERE user_type != 0 AND status != 6 AND email = '" + data.email + "'";
    let que = "SELECT * FROM `agent` WHERE user_type != 0 AND status NOT IN (2,4,6) AND email = '" + data.email + "'";
    return commonFun.runSQLquery(que);
}

commonModel.getDataForloginByID = (data) => {
    let que = "SELECT id, user_type, first_name, last_name, email, mobile, status, SubscriptionEndDate, agent_type, profile_status, token FROM `agent` WHERE user_type != 0 AND status NOT IN (2,4,6) AND id = '" + data.id + "'";
    return commonFun.runSQLquery(que);
}

commonModel.clientPaymentCheck = (data) => {
    let que = "SELECT * FROM payment WHERE user_id = " + data.user_id + " AND status = 1";
    return commonFun.runSQLquery(que);
}

commonModel.getAgentsByCityRealtor = (data) => {
    var que;
    if (data.city != '' && data.realtor == '') {
        que = "SELECT * FROM agent WHERE user_type =2 AND status=1 AND address LIKE '" + data.city + "%'";
    }
    if (data.city == '' && data.realtor != '' && data.ak ) {
        que = "SELECT * FROM agent WHERE (user_type =2 || user_type =3) AND status=1  AND first_name LIKE '%" + data.realtor + "' AND last_name LIKE '" + data.ak + "%'";   //[06-12-22]
        // que = "SELECT * FROM agent WHERE (user_type =2 || user_type =3) AND status=1  AND  CONCAT(first_name, ' ', last_name)  LIKE '" + data.realtor + "%'";
    }
    if (data.city == '' && data.realtor != '' && !data.ak ) {
        que = "SELECT * FROM agent WHERE (user_type =2 || user_type =3) AND status=1  AND first_name LIKE '" + data.realtor + "%'";   //[06-12-22]
        // que = "SELECT * FROM agent WHERE (user_type =2 || user_type =3) AND status=1  AND  CONCAT(first_name)  LIKE '" + data.realtor + "%'";
    }
    if (data.city != '' && data.realtor != '') {
        que = "SELECT * FROM agent WHERE user_type =2 AND status=1 AND address LIKE '%" + data.city + "%' AND first_name LIKE '" + data.realtor + "%'";  //[06-12-22]
        // que = "SELECT * FROM agent WHERE user_type =2 AND status=1 AND address LIKE '%" + data.city + "%' AND  CONCAT(first_name, ' ', last_name)  LIKE '%" + data.realtor + "%' ";
    }
    // que = "SELECT * FROM agent WHERE user_type =2 AND status=1 AND address LIKE '%"+data.city+"%' AND ( CONCAT(first_name, ' ', last_name)  LIKE '%"+data.realtor+"%'  OR address LIKE '%"+data.realtor+"%')";
    return commonFun.runSQLquery(que);
}
// commonModel.GetAgentActiveStatus = (fsa) => {
//     let que = "SELECT fsa.lat,fsa.lng,fsa.fsa_code,fsa.lat as fsa_lat,fsa.lng as fsa_lng,user_fsa.*,fsa.nieghborhood as agent_fsa_address FROM fsa LEFT JOIN user_fsa ON fsa.id = user_fsa.fsa_id WHERE user_fsa.fsa_id IN(" + fsa + ") AND user_fsa.status=1 AND user_fsa.activate_status=1";
//     return commonFun.runSQLquery(que);
// }

commonModel.GetAgentActiveStatus = (fsa) => {
    let que = "SELECT fsa.lat,fsa.lng,fsa.fsa_code,fsa.lat as fsa_lat,fsa.lng as fsa_lng,user_fsa.id,user_fsa.user_id,user_fsa.fsa_id,user_fsa.address,user_fsa.status,user_fsa.activate_status,fsa.nieghborhood as agent_fsa_address FROM fsa  LEFT JOIN user_fsa ON fsa.id = user_fsa.fsa_id WHERE user_fsa.fsa_id IN(" + fsa + ") AND user_fsa.status=1 AND user_fsa.activate_status=1  AND fsa.status = 1";
    // console.log(que)
    return commonFun.runSQLquery(que);
}
// commonModel.getDefaultAgentMap = (fsa, ids) => {
//     let que = "SELECT fsa.lat,fsa.lng,fsa.fsa_code,fsa.lat as fsa_lat,fsa.lng as fsa_lng,user_fsa.* FROM fsa LEFT JOIN user_fsa ON fsa.id = user_fsa.fsa_id WHERE user_fsa.fsa_id IN(" + fsa + ") AND user_fsa.status=1 AND user_fsa.activate_status=1";
//     return commonFun.runSQLquery(que);
// }

commonModel.GetFsaForSubAgentByUserId = (fsa_id) => {
    // let que = "SELECT fsa.lat,fsa.lng,fsa.fsa_code,fsa.lat as fsa_lat,fsa.lng as fsa_lng,user_fsa.* FROM fsa LEFT JOIN user_fsa ON fsa.id = user_fsa.fsa_id LEFT JOIN agent ON user_fsa.user_id = agent.parent_id WHERE user_fsa.user_id =" + id + " AND user_fsa.status=1 AND user_fsa.activate_status=1 AND agent.user_type=3";
    // let que = "SELECT fsa.lat,fsa.lng,fsa.fsa_code,fsa.lat as fsa_lat,fsa.lng as fsa_lng,user_fsa.* FROM fsa LEFT JOIN user_fsa ON fsa.id = user_fsa.fsa_id LEFT JOIN agent ON user_fsa.user_id = agent.parent_id WHERE user_fsa.user_id =" + id + " AND user_fsa.status=1 AND agent.user_type=3";
    // let que = "SELECT fsa.lat,fsa.lng,fsa.fsa_code,fsa.lat as fsa_lat,fsa.lng as fsa_lng,user_fsa.* FROM fsa LEFT JOIN user_fsa ON fsa.id = user_fsa.fsa_id LEFT JOIN agent ON user_fsa.user_id = agent.parent_id WHERE user_fsa.user_id =" + id + " AND user_fsa.status=1 AND agent.user_type=3";
    // let que = "SELECT fsa.lat,fsa.lng,fsa.fsa_code,fsa.lat as fsa_lat,fsa.lng as fsa_lng,user_fsa.* FROM fsa LEFT JOIN user_fsa ON fsa.id = user_fsa.fsa_id LEFT JOIN agent ON user_fsa.user_id = agent.id WHERE `user_fsa`.fsa_id =" + fsa_id + " AND user_fsa.status=1 AND agent.user_type=3 AND agent.status =1";
    let que = "SELECT fsa.lat,fsa.lng,fsa.fsa_code,fsa.lat as fsa_lat,fsa.lng as fsa_lng,user_fsa.*,fsa.nieghborhood as agent_fsa_address FROM fsa LEFT JOIN user_fsa ON fsa.id = user_fsa.fsa_id LEFT JOIN agent ON user_fsa.user_id = agent.id WHERE user_fsa.fsa_id IN(" + fsa_id + ") AND user_fsa.status=1 AND agent.user_type=3 AND agent.status =1";

    return commonFun.runSQLquery(que);
}

commonModel.GetFSAByUserId = (id) => {
    let que = "SELECT fsa.fsa_code,user_fsa.* FROM fsa LEFT JOIN user_fsa ON fsa.id = user_fsa.fsa_id WHERE user_fsa.user_id =" + id + " AND user_fsa.status=1";
    return commonFun.runSQLquery(que);
}
commonModel.getUserDetailsById = (obj) => {
    // let que = "SELECT fsa.*,fsa.nieghborhood as address FROM `fsa` LEFT JOIN user_fsa ON fsa.id = user_fsa.fsa_id WHERE user_fsa.user_id=" + id + " AND user_fsa.status=1"; // dev

    let que = "SELECT fsa.*,fsa.nieghborhood as address FROM `fsa` LEFT JOIN user_fsa ON fsa.id = user_fsa.fsa_id WHERE fsa.id=" + obj.fsa_id + " AND user_fsa.user_id=" + obj.agentid + " AND user_fsa.status=1"
    // let que = "SELECT fsa.*,fsa.nieghborhood FROM `fsa` LEFT JOIN user_fsa ON fsa.id = user_fsa.fsa_id WHERE user_fsa.user_id=" + id + " AND user_fsa.status=1";
    return commonFun.runSQLquery(que);
}
commonModel.getRequestByAgent = (agent_id, status) => {
    // let que = "SELECT request.*,agent.profile_img FROM request LEFT JOIN agent ON request.user_id = agent.id WHERE request.agent_id=" + agent_id + " AND request.status=" + status + " "; // [16-11-22]
    let que = "SELECT request.*,agent.profile_img FROM request LEFT JOIN agent ON request.user_id = agent.id WHERE request.agent_id=" + agent_id + " AND request.status=" + status + " AND request.refer_client != 1";
  console.log(que,'que---request')
    return commonFun.runSQLquery(que);
}

commonModel.getReferRequest = (referring_agent_id, status) => {
    // let que = "SELECT request.*,agent.profile_img FROM request LEFT JOIN agent ON request.user_id = agent.id WHERE request.agent_id=" + agent_id + " AND request.refer_client = 1";
    let que = "SELECT request.*,agent.profile_img FROM request LEFT JOIN agent ON request.user_id = agent.id WHERE request.referring_agent_id=" + referring_agent_id + " AND request.refer_client = 1";
    return commonFun.runSQLquery(que);
}

commonModel.getFSALocation = (fsa) => {
    let que = "SELECT * FROM `fsa` WHERE id IN(" + fsa + ")";
    return commonFun.runSQLquery(que);
}
commonModel.GetUserRequest = (user_id, status) => {
   

    let que = "SELECT request.*,agent.first_name as agent_fname,agent.email as agent_email,agent.mobile,agent.last_name as agent_lname,agent.profile_img FROM request LEFT JOIN agent ON request.agent_id = agent.id WHERE request.user_id=" + user_id + " AND request.status=" + status + "";
    //   if(agent_id != undefined){
    //       let que = + " "
    //   }
    // let que = "SELECT request.*,agent.first_name as agent_fname,agent.email as agent_email,agent.last_name as agent_lname,agent.profile_img, fsa.fsa_code, fsa.fsa_name, fsa.nieghborhood FROM request LEFT JOIN agent ON request.agent_id = agent.id LEFT JOIN fsa ON request.fsa = fsa.id WHERE request.user_id=" + user_id + " AND request.agent_id = " + agent_id + " AND request.status= " + status + "";

    return commonFun.runSQLquery(que);
}
commonModel.selectWhereIn = (table, key, value) => {
    let que = "SELECT * FROM " + table + " WHERE " + key + " IN(" + value + ")";
    return commonFun.runSQLquery(que);
}
commonModel.selectFSACodeForEmail = (value) => {
    let que = "SELECT fsa_code, nieghborhood FROM `fsa` WHERE id IN(" + value + ")";
    return commonFun.runSQLquery(que);
}

commonModel.selectFSACodeForEmail1 = (value) => {
    let que = "SELECT fsa_code, nieghborhood FROM `fsa` WHERE id IN(" + value + ") AND status = 1";
    return commonFun.runSQLquery(que);
}

commonModel.GetNeighbourhoodAgentLike = (value) => {
    value = value.substring(0, value.length - 1);
    let que = "SELECT * FROM `fsa` WHERE fsa_code LIKE '" + value + "%'";
    return commonFun.runSQLquery(que);
}
commonModel.GetDefaultAgentByFsaIds = (fsa) => {
    let que = "SELECT user_fsa.*,agent.address,agent.website,agent.shortBio,agent.whatsapp,agent.facebook,agent.messenger,agent.first_name,agent.last_name,agent.id as agent_id,agent.profile_img,agent.email FROM user_fsa LEFT JOIN agent ON user_fsa.user_id = agent.id WHERE agent.user_type=2 AND user_fsa.fsa_id IN (" + fsa + ") AND user_fsa.status=1 AND user_fsa.activate_status=1 GROUP BY agent.id";
    return commonFun.runSQLquery(que);
}

commonModel.GetNeighbourhoodAgentDATAFInal = (id) => {   
    // let que = "SELECT user_fsa.*,agent.address,agent.weChat,agent.website,agent.BrokerageStreetAddress,agent.brokerPhoneNo,agent.brokerageName,agent.shortBio,agent.whatsapp,agent.facebook,agent.messenger,agent.first_name,agent.last_name,agent.id as agent_id,agent.profile_img,agent.email FROM user_fsa LEFT JOIN agent ON user_fsa.user_id = agent.id WHERE agent.user_type=2 AND agent.id =" + id + " AND user_fsa.status=1 AND user_fsa.activate_status=1 GROUP BY agent.id";
    let que = "SELECT user_fsa.*,agent.address,agent.weChat,agent.website,agent.BrokerageStreetAddress,agent.brokerPhoneNo,agent.brokerageName,agent.shortBio,agent.whatsapp,agent.facebook,agent.messenger,agent.first_name,agent.last_name,agent.id as agent_id,agent.profile_img,agent.email ,fsa.nieghborhood as address FROM user_fsa LEFT JOIN agent ON user_fsa.user_id = agent.id LEFT JOIN fsa ON user_fsa.fsa_id = fsa.id WHERE agent.user_type=2 AND agent.id =" + id + " AND user_fsa.status=1 AND user_fsa.activate_status=1 GROUP BY agent.id"
    console.log('-----------------------', que)
    return commonFun.runSQLquery(que);
}
commonModel.GetNeighbourhoodAgentDATAFInal1 = (id, code) => {

    // let que="SELECT user_fsa.*,agent.address,agent.weChat,agent.website,agent.BrokerageStreetAddress,agent.brokerPhoneNo,agent.brokerageName,agent.shortBio,agent.whatsapp,agent.facebook,agent.messenger,agent.first_name,agent.last_name,agent.id as agent_id,agent.profile_img,agent.email ,fsa.nieghborhood as address FROM user_fsa LEFT JOIN agent ON user_fsa.user_id = agent.id LEFT JOIN fsa ON user_fsa.fsa_id = fsa.id WHERE agent.user_type=2 AND agent.id =" + id + " AND user_fsa.status=1 AND user_fsa.activate_status=1 AND fsa.fsa_code='"+code+"' GROUP BY agent.id"
    let que = "SELECT user_fsa.*,agent.address,agent.weChat,agent.website,agent.BrokerageStreetAddress,agent.brokerPhoneNo,agent.brokerageName,agent.shortBio,agent.bio,agent.whatsapp,agent.facebook,agent.messenger,agent.first_name,agent.last_name,agent.id as agent_id,agent.profile_img,agent.email ,fsa.nieghborhood as address FROM user_fsa LEFT JOIN agent ON user_fsa.user_id = agent.id LEFT JOIN fsa ON user_fsa.fsa_id = fsa.id WHERE  agent.id =" + id + "  GROUP BY agent.id"

    return commonFun.runSQLquery(que);
}

commonModel.getFSADefaultAgent = (fsaId) => {
    let que = "SELECT agent.* FROM agent LEFT JOIN user_fsa ON agent.id = user_fsa.user_id WHERE user_fsa.status = 1 && user_fsa.activate_status =1 && user_fsa.fsa_id = " + fsaId + ";";
    return commonFun.runSQLquery(que);
}


commonModel.getUserDataForUpload = (name) => {
    let que = "SELECT * FROM `agent` WHERE CONCAT_WS(' ', first_name, last_name) ='" + name + "'";
    return commonFun.runSQLquery(que);
}
commonModel.getLastAgentEntry = (name) => {
    let que = "SELECT * FROM `agent` ORDER BY `id` DESC LIMIT 1";
    return commonFun.runSQLquery(que);
}

// old 1-12-21
// commonModel.getActiveFSAStatus = () => {
//     let que = "SELECT id,fsa_code as itemName FROM `fsa` WHERE status=1";

//     return commonFun.runSQLquery(que);
// }

commonModel.getActiveFSAStatus = () => {
    let que = "SELECT id,CONCAT(fsa_code,' - ', nieghborhood) as itemName FROM `fsa` WHERE status=1";
  
    return commonFun.runSQLquery(que);
}

commonModel.getActiveFSAIdAndData = () => {
    let que = "SELECT id,fsa_code, nieghborhood FROM `fsa` WHERE status=1";
    
    return commonFun.runSQLquery(que);
}

commonModel.getActiveFSAWithAdderess = () => {
    // let que = "SELECT id,fsa_code as itemName FROM `fsa` WHERE status=1";
    let que = "SELECT fsa.id,fsa.fsa_code as itemName,fsa.nieghborhood FROM `fsa` LEFT JOIN user_fsa ON user_fsa.fsa_id = fsa.id WHERE fsa.status=1 GROUP BY fsa.id";

    return commonFun.runSQLquery(que);
}



commonModel.changeFSAAgentStatus = (id, row) => {
    let que = "SELECT agent.user_type, agent.status AS agent_status, agent.is_default_agent, user_fsa.* FROM user_fsa LEFT JOIN agent ON agent.id = user_fsa.user_id ";
   
    return commonFun.runSQLquery(que);
}




commonModel.getRequestData = (filter, count, limit, status) => {

if(status.length){}

    let que
if(status.length == 0){

    que = `SELECT request.*,agent.first_name, agent.last_name FROM request LEFT JOIN agent on request.agent_id = agent.id WHERE request.agent_id = agent.id || request.id `;
}else{
    que = `SELECT request.*,agent.first_name, agent.last_name FROM request LEFT JOIN agent on request.agent_id = agent.id WHERE request.agent_id = agent.id`;
  
}

    // if (filter) que = "SELECT request.*,agent.first_name, agent.last_name FROM request LEFT JOIN agent on request.agent_id = agent.id WHERE request.name LIKE '" + filter + "%' OR agent.first_name LIKE '" + filter + "%' OR agent.last_name LIKE '" + filter + "%'  OR request.email LIKE  '" + filter + "%'";

    if (filter != undefined && filter != 'null' && filter != '') {
        que += " && (request.name LIKE '" + filter + "%' OR agent.first_name LIKE '" + filter + "%' OR agent.last_name LIKE '" + filter + "%'  OR request.email LIKE  '" + filter + "%' OR  CONCAT(agent.first_name, ' ', agent.last_name) LIKE '%" + filter + "%') "
    }

    if (status != undefined && status != 'null' && status != '') {
        que += " && request.status LIKE '" + status + "%' "
    }

    que += " Order By request.id DESC LIMIT " + count + " , " + limit + " ";

    return commonFun.runSQLquery(que);
}
commonModel.getRequestData_total = () => {
    let que = "SELECT  COUNT(*) as total  FROM request LEFT JOIN agent on request.agent_id = agent.id WHERE request.agent_id = agent.id  Order By request.id "
    // let que = "SELECT COUNT(*) as total FROM request LEFT JOIN agent on request.agent_id = agent.id";
    return commonFun.runSQLquery(que);
}



commonModel.getRequestDataById = (user_id) => {
    let que = `SELECT request.*,agent.first_name, agent.last_name FROM request LEFT JOIN agent on request.agent_id = agent.id WHERE request.id = ${user_id}`;
    return commonFun.runSQLquery(que);
}

commonModel.getRequestUserData = (user_id) => {
    let que = `SELECT first_name,last_name FROM agent WHERE id=${user_id} order by first_name`;
    return commonFun.runSQLquery(que);
}



commonModel.getContactAllData = () => {
    let que = `SELECT * FROM contact ORDER BY id DESC`;
    return commonFun.runSQLquery(que);
}
commonModel.getContactAllFilter = (filter, count, limit) => {
    let que;
    if (filter) que = "SELECT * FROM contact WHERE name LIKE '" + filter + "%' OR email LIKE  '" + filter + "%'";
    else que = `SELECT * FROM contact ORDER BY id DESC`;
    que += "   LIMIT   " + count + "," + limit;

    return commonFun.runSQLquery(que);
}
commonModel.getContactAllFilter_total = () => {
    let que = `SELECT COUNT(*) as total FROM contact ORDER BY id DESC`;;
    return commonFun.runSQLquery(que);
}

commonModel.advertisementExist = (data) => {
    let que = `SELECT * FROM advertisement WHERE Type =${data.Type} AND panelType = ${data.panelType} AND status != 2`;
    return commonFun.runSQLquery(que);
}

// commonModel.getAdvertisment = (type, date) => {
//     if (type == "null") type = 4;
//     let que = `SELECT * FROM advertisement WHERE Type ='${type}' AND status != '2' AND  EndDate >= '${date}' ORDER BY panelType ASC`;
//     return commonFun.runSQLquery(que);
// }
//change Query Accodint D.Sir
commonModel.getAdvertisment = (type) => {
    if (type == "null") type = 4;
    let que = `SELECT * FROM advertisement WHERE Type ='${type}' AND status != '2'  ORDER BY panelType ASC`;
    return commonFun.runSQLquery(que);
}


commonModel.getUserDefaultIdByFSA = (id) => {
    let que = `SELECT user_fsa.*,agent.id as agid , agent.user_type FROM user_fsa LEFT JOIN agent ON user_fsa.user_id = agent.id WHERE user_fsa.fsa_id=${id} AND agent.user_type=2 AND user_fsa.status=1 AND user_fsa.activate_status=1`;
    return commonFun.runSQLquery(que);
}

commonModel.requestStatusData = () => {
    let que = `SELECT * FROM request WHERE status != 4`;
    return commonFun.runSQLquery(que)
}

commonModel.getRequetBecomeAgent = (filter, count, limit) => {
    let que;
    // que = `SELECT agent.id,agent.first_name,agent.last_name,agent.email, payment.amount,payment.created_at FROM payment LEFT JOIN agent on agent.id = payment.user_id `;

    que = "SELECT agent.*, payment.amount,payment.created_at FROM payment LEFT JOIN agent on agent.id = payment.user_id WHERE agent.user_type = 2 AND agent.is_default_agent = 0 AND agent.status != 2 "
    if (filter) que = "SELECT agent.id, agent.first_name,agent.last_name,agent.email, payment.amount,payment.created_at FROM payment LEFT JOIN agent on agent.id = payment.user_id WHERE agent.first_name LIKE '" + filter + "%' OR agent.last_name LIKE '" + filter + "%' OR  email LIKE  '" + filter + "%'";
    que += ' LIMIT ' + count + ',' + limit;
    console.log('Que22222222222', que)
    return commonFun.runSQLquery(que);
}

commonModel.getBecome = (id) => {
    let que;

    que = "SELECT agent.*,payment.id AS payment_id, payment.amount,payment.created_at FROM payment LEFT JOIN agent on agent.id = payment.user_id WHERE agent.user_type = 2 AND agent.is_default_agent = 0 AND agent.status != 2 AND agent.id = '" + id + "' "

    console.log('Que', que)
    return commonFun.runSQLquery(que);
}

commonModel.getRequetBecomeAgentTotal = () => {
    let que;
    que = `SELECT Count(*) as total FROM payment LEFT JOIN agent on agent.id = payment.user_id `;

    // que = `SELECT Count(*) as total FROM payment LEFT JOIN agent on agent.id = payment.user_id WHERE agent.user_type = 2 AND agent.is_default_agent = 0 AND agent.status != 2 `;

    return commonFun.runSQLquery(que);
}

commonModel.checkIfFsaIsAlready = (fsa_id) => {
    let que = "SELECT user_fsa.*,agent.user_type,fsa.fsa_code FROM `user_fsa` LEFT JOIN agent ON user_fsa.user_id =agent.id LEFT JOIN fsa ON user_fsa.fsa_id = fsa.id WHERE user_fsa.fsa_id=" + fsa_id + " AND user_fsa.activate_status=1 AND agent.user_type=2 AND agent.status=1    ";
    return commonFun.runSQLquery(que)
}

commonModel.getDefaultAgentOnMap = () => {
    let que = "SELECT agent.*,user_fsa.fsa_id,user_fsa.activate_status,user_fsa.user_id,fsa.fsa_code,fsa.fsa_name,fsa.lng,fsa.lat FROM `user_fsa` LEFT JOIN agent ON user_fsa.user_id=agent.id LEFT JOIN fsa ON user_fsa.fsa_id=fsa.id WHERE agent.user_type=2 AND user_fsa.activate_status=1 AND fsa.status=1";
    return commonFun.runSQLquery(que)
}

commonModel.checkFSAIsAleadyActive = (fsa_id) => {
    let que = "SELECT * FROM `user_fsa` LEFT JOIN agent ON user_fsa.user_id = agent.id WHERE agent.user_type=2 AND agent.is_default_agent=1 AND user_fsa.fsa_id=" + fsa_id + " AND user_fsa.activate_status=1 AND user_fsa.status=1";
    return commonFun.runSQLquery(que)
}
commonModel.getActiveFSAWithDefaultAgent = (fsa_id) => {
    let que = "SELECT * FROM `agent` LEFT JOIN user_fsa ON agent.id = user_fsa.user_id WHERE agent.user_type=2 AND agent.is_default_agent=1 AND agent.status=1 AND user_fsa.fsa_id=" + fsa_id;
    return commonFun.runSQLquery(que)
}

// commonModel.getFSAwithDefaultAgent = (search, count) => {
//     let que = `SELECT fsa.*,agent.first_name,agent.last_name,user_fsa.address,user_fsa.id AS user_fsa_id,CONCAT(agent.first_name,' ' , agent.last_name)  as fullname  FROM fsa LEFT JOIN user_fsa ON user_fsa.fsa_id = fsa.id LEFT JOIN agent ON agent.id = user_fsa.user_id WHERE agent.user_type=2 AND agent.is_default_agent=1 AND agent.status=1 AND user_fsa.fsa_id GROUP BY fsa.id ASC`;
//     if (search) que = "SELECT fsa.*,agent.first_name,agent.last_name, user_fsa.address,user_fsa.id,CONCAT(agent.first_name,' ' , agent.last_name)  as fullname  FROM fsa LEFT JOIN user_fsa ON user_fsa.fsa_id = fsa.id LEFT JOIN agent ON agent.id = user_fsa.user_id WHERE agent.user_type=2 AND agent.is_default_agent=1 AND agent.status=1 AND user_fsa.fsa_id AND fsa.fsa_code LIKE '" + search + "%' OR fsa.fsa_name LIKE '" + search + " %' OR agent.first_name LIKE '" + search + "%' OR agent.last_name LIKE '" + search + "%' OR user_fsa.address LIKE '" + search + "'  GROUP BY fsa.id";
//     que += "   LIMIT   " + count + ",20"
//     console.log(que,'que')
//     return commonFun.runSQLquery(que)
// }

commonModel.getFSAwithDefaultAgent = (search, count, limit) => {
    // console.log(count,'count',limit,'limit')
    // let que = `SELECT fsa.*,agent.first_name,agent.last_name,user_fsa.address,user_fsa.id AS user_fsa_id,CONCAT(agent.first_name,' ' , agent.last_name)  as fullname  FROM fsa LEFT JOIN user_fsa ON user_fsa.fsa_id = fsa.id LEFT JOIN agent ON agent.id = user_fsa.user_id WHERE agent.user_type=2 AND agent.is_default_agent=1 AND agent.status=1 AND user_fsa.activate_status=1 AND user_fsa.status=1 GROUP BY fsa.id ASC `;
    // if (search) que = "SELECT fsa.*,agent.first_name,agent.last_name, user_fsa.address,user_fsa.id,CONCAT(agent.first_name,' ' , agent.last_name)  as fullname  FROM fsa LEFT JOIN user_fsa ON user_fsa.fsa_id = fsa.id LEFT JOIN agent ON agent.id = user_fsa.user_id WHERE agent.user_type=2 AND agent.is_default_agent=1 AND agent.status=1 AND user_fsa.activate_status=1 AND user_fsa.status=1 AND fsa.fsa_code LIKE '" + search + "%' OR fsa.fsa_name LIKE '" + search + " %' OR agent.first_name LIKE '" + search + "%' OR agent.last_name LIKE '" + search + "%' OR user_fsa.address LIKE '" + search + "'  GROUP BY fsa.id";
    let que = `SELECT fsa.*  FROM fsa WHERE fsa.status != 2 ORDER BY fsa.id ASC `;
    if (search) que = "SELECT fsa.*  FROM fsa WHERE fsa.status != 2 AND (fsa.fsa_code LIKE '" + search + "%' OR fsa.fsa_name LIKE '" + search + " %'  ) GROUP BY fsa.id";

    que += "   LIMIT   " + count + "," + limit;
    // que += "   LIMIT "+ limit +" offset  " +  count * limit;

    console.log('que123', que)
    return commonFun.runSQLquery(que)
}

commonModel.getFSADefaultAgentAddress = (fsa_id) => {
    // let que = "SELECT agent.first_name,agent.last_name,user_fsa.address,user_fsa.id AS user_fsa_id,CONCAT(agent.first_name,' ' , agent.last_name) as fullname FROM agent LEFT JOIN user_fsa ON agent.id = user_fsa.user_id WHERE agent.user_type=2 AND agent.is_default_agent=1 AND agent.status=1 AND user_fsa.activate_status=1 AND user_fsa.status=1 AND user_fsa.fsa_id="+fsa_id;
    let que = "SELECT agent.first_name,agent.last_name,fsa.nieghborhood as address,user_fsa.id AS user_fsa_id,CONCAT(agent.first_name,' ' , agent.last_name) as fullname FROM agent LEFT JOIN user_fsa ON agent.id = user_fsa.user_id LEFT JOIN fsa ON fsa.id = user_fsa.fsa_id WHERE agent.user_type=2 AND agent.is_default_agent=1 AND agent.status=1 AND user_fsa.activate_status=1 AND user_fsa.status=1 AND user_fsa.fsa_id=" + fsa_id
    // console.log('qu--------------------e',que)
    return commonFun.runSQLquery(que)
}
commonModel.getFSAwithDefaultAgent_total = () => {
    let que = 'SELECT COUNT(DISTINCT fsa.id) as Total FROM fsa LEFT JOIN user_fsa ON user_fsa.fsa_id = fsa.id LEFT JOIN agent ON agent.id = user_fsa.user_id WHERE agent.user_type=2 AND agent.is_default_agent=1 AND agent.status=1 AND user_fsa.fsa_id';
    // console.log(que,'totl')
    return commonFun.runSQLquery(que);
}

commonModel.getFSAtotal = () => {
    let que = "SELECT COUNT(*) as total FROM `fsa`";
    // let que = 'SELECT COUNT(DISTINCT fsa.id) as Total FROM fsa LEFT JOIN user_fsa ON user_fsa.fsa_id = fsa.id LEFT JOIN agent ON agent.id = user_fsa.user_id WHERE agent.user_type=2 AND agent.is_default_agent=1 AND agent.status=1 AND user_fsa.fsa_id';
    return commonFun.runSQLquery(que);
}

commonModel.getAgentsTotal = () => {
    let que = "SELECT COUNT(*) as total FROM agent WHERE status != 2";
    // console.log(que,'getAgentsTotal')
    return commonFun.runSQLquery(que);
}

commonModel.getClientAgent = () => {
    let que = "SELECT * FROM agent WHERE user_type = 2 AND agent_type = 1 AND status = 1 ORDER BY id DESC;";
    console.log(que, 'getClientAgent')
    return commonFun.runSQLquery(que);
}

commonModel.getNextClientAgent = (id) => {
    let que = "SELECT * FROM agent WHERE id > " + id + " AND agent_type = 1 AND status != 2 ORDER BY id LIMIT 1;";
    console.log(que, 'getClientAgent')
    return commonFun.runSQLquery(que);
}

commonModel.getPreviousClientAgent = (id) => {
    let que = "SELECT * FROM agent WHERE id < " + id + " AND agent_type = 1 AND status != 2 ORDER BY id DESC LIMIT 1;";
    console.log(que, 'getPreviousClientAgent')
    return commonFun.runSQLquery(que);
}

commonModel.getDefaultAgentInAdminList = () => {
    let que = "SELECT * FROM `agent` WHERE user_type=2 AND is_default_agent=1 AND status != 2 ORDER BY id DESC ";
    return commonFun.runSQLquery(que)
}

commonModel.DeleteAgentFromMap = (data) => {
    let que = "DELETE FROM `client_map` WHERE user_id = " + data.user_id + " AND agent_id= " + data.agent_id + " AND fsa_id= " + data.fsa_id + "";
    console.log(que, '===========DeleteAgentFromMap')
    return commonFun.runSQLquery(que)
}

commonModel.fsacount = (id) => {
    let que = "SELECT COUNT(user_fsa.id) AS total , agent.agent_type from user_fsa LEFT JOIN agent ON user_fsa.user_id = agent.id WHERE agent.is_default_agent = 1 && agent.user_type = 2 && user_fsa.activate_status = 1 && agent.id = " + id;
    return commonFun.runSQLquery(que)
}

commonModel.GetHomepageMapData = () => {
    let que = "SELECT user_fsa.user_id,user_fsa.fsa_id,user_fsa.activate_status, agent.*,fsa.id as fsa_id , fsa.fsa_code,fsa.fsa_name,fsa.lat,fsa.lng,fsa.nieghborhood as agent_fsa_address FROM `user_fsa` LEFT JOIN agent ON user_fsa.user_id = agent.id LEFT JOIN fsa ON user_fsa.fsa_id=fsa.id WHERE user_fsa.status=1 AND user_fsa.activate_status=1 AND agent.status=1 AND agent.user_type=2"
    return commonFun.runSQLquery(que)
}
commonModel.sendlink = (table, obj) => {
    // console.log(obj)
    let que = "SELECT * FROM  " + table + " WHERE id=" + obj.id;
    // let counter = 1;
    // for (let k in obj) {
    //     if (counter == 1) {
    //         que += k + "= '" + obj[k] + "'";
    //     } else {
    //         que += " AND " + k + "= '" + obj[k] + "' ";
    //     }
    //     counter++;
    // }
    console.log(que, "que---sendLink")
    return commonFun.runSQLquery(que);
    // let que = "SELECT * FROM "+table+" WHERE id ="+id 

    // return commonFun.runSQLquery(que);
}


// commonModel.fsaactivecount = (id) => {
//     let que = "SELECT COUNT(user_fsa.id) AS total , agent.agent_type from user_fsa LEFT JOIN agent ON user_fsa.user_id = agent.id WHERE agent.is_default_agent = 1 && agent.user_type = 2 && user_fsa.activate_status = 1 && agent.id = " + id;
//     return commonFun.runSQLquery(que)
// }


commonModel.DeleteRemainigFSA = (fsa, id) => {
    let que = "DELETE FROM `user_fsa` WHERE user_id=" + id + ""
    if (fsa) que += " AND fsa_id NOT IN (" + fsa + ")"
    console.log('DeleteRemainigFSA=====??', que)
    return commonFun.runSQLquery(que)
}

commonModel.DeleteRemainigFSAOneByOne = (fsa, id) => {
    let que = "DELETE FROM `user_fsa` WHERE user_id=" + id + ""
    if (fsa) que += " AND fsa_id NOT IN (" + fsa + ")"
    console.log('DeleteRemainigFSAOneByOne', que)
    return commonFun.runSQLquery(que)
}

commonModel.DeleteExistFSA = (fsa, id) => {
    let que = "DELETE FROM `user_fsa` WHERE user_id=" + id + ""
    if (fsa) que += " AND fsa_id IN (" + fsa + ")"
    console.log(que,'delete----exist')
    return commonFun.runSQLquery(que)
}



// commonModel.fsaselect = (id) => {
//     let que = "SELECT id,fsa_code as itemName FROM `fsa` WHERE status=1 AND id = "+id;

//     return commonFun.runSQLquery(que);
// }
commonModel.fsaselect = (id) => {
    let que = "SELECT * FROM `user_fsa` WHERE status=1 AND fsa_id = " + id.fsa_id + " AND user_id = " + id.user_id + " ";
    return commonFun.runSQLquery(que);
}



commonModel.update02 = (table, id, data) => {
    console.log(table, "table", id, "id", data, "data1111111111111")
    let que = "UPDATE " + table + " SET ? WHERE id = " + id
    console.log(que, 'update02')
    return commonFun.runSqlQueryWithData(que, data);
}

commonModel.GetUserRequestAll = (user_id, status) => {
    console.log('user--------', user_id)

    let que = "SELECT request.*,agent.first_name as agent_fname,agent.email as agent_email,agent.mobile,agent.last_name as agent_lname,agent.profile_img FROM request LEFT JOIN agent ON request.agent_id = agent.id WHERE request.user_id=" + user_id + " AND request.status IN (0, 2)";
    //   if(agent_id != undefined){
    //       let que = + " "
    //   }
    // let que = "SELECT request.*,agent.first_name as agent_fname,agent.email as agent_email,agent.last_name as agent_lname,agent.profile_img, fsa.fsa_code, fsa.fsa_name, fsa.nieghborhood FROM request LEFT JOIN agent ON request.agent_id = agent.id LEFT JOIN fsa ON request.fsa = fsa.id WHERE request.user_id=" + user_id + " AND request.agent_id = " + agent_id + " AND request.status= " + status + "";
    return commonFun.runSQLquery(que);
}


commonModel.getRequestByAgentAll = (agent_id, status) => {
    // let que = "SELECT request.*,agent.profile_img FROM request LEFT JOIN agent ON request.user_id = agent.id WHERE request.agent_id=" + agent_id + " AND request.status IN (0, 2) AND request.refer_client = 0" // old
    // let que = "SELECT request.*,agent.profile_img FROM request LEFT JOIN agent ON request.user_id = agent.id WHERE request.agent_id=" + agent_id + " AND request.status IN (0, 2)"; // [16-11-22]
    let que = "SELECT request.*,agent.profile_img FROM request LEFT JOIN agent ON request.user_id = agent.id WHERE request.agent_id=" + agent_id + " AND request.status IN (0, 2) AND request.refer_client != 1";
    return commonFun.runSQLquery(que);
}

commonModel.receivedrequestTab = (agent_id, status) => {
    // let que = "SELECT request.*,agent.profile_img FROM request LEFT JOIN agent ON request.user_id = agent.id WHERE request.agent_id=" + agent_id + " AND request.status IN (0, 2) AND request.refer_client = 0"
    // let que = "SELECT request.*,agent.profile_img FROM request LEFT JOIN agent ON request.user_id = agent.id WHERE request.user_id=" + agent_id + " AND request.status IN (0, 2) AND request.refer_client = 1"
    // let que = "SELECT request.*,agent.profile_img FROM request LEFT JOIN agent ON request.user_id = agent.id WHERE request.user_id=" + agent_id + " AND request.status IN (0, 1, 2) AND request.refer_client = 1 GROUP BY agent_id;" // [16-11-22]
    let que = "SELECT request.*,agent.profile_img FROM request LEFT JOIN agent ON request.user_id = agent.id WHERE request.agent_id=" + agent_id + " AND request.status IN (0, 1, 2) AND request.refer_client = 1 ;"
    return commonFun.runSQLquery(que);
}


commonModel.getRequestByAgentForRefer = (agent_id, status) => {
    // let que = "SELECT request.*,agent.profile_img FROM request LEFT JOIN agent ON request.user_id = agent.id WHERE request.agent_id=" + agent_id + " AND request.status IN (0, 2) AND request.refer_client = 0"
    let que = "SELECT request.*,agent.profile_img FROM request LEFT JOIN agent ON request.user_id = agent.id WHERE request.user_id=" + agent_id + " AND request.status IN (0, 2) AND request.refer_client = 1"
    return commonFun.runSQLquery(que);
}
commonModel.getRequestByAgentRefer = (agent_id, status) => {
    // let que = "SELECT request.*,agent.profile_img FROM request LEFT JOIN agent ON request.user_id = agent.id WHERE request.agent_id=" + agent_id + " AND request.status IN (0, 2) AND request.refer_client = 0"
    let que = "SELECT request.*,agent.profile_img FROM request LEFT JOIN agent ON request.user_id = agent.id WHERE request.user_id=" + agent_id + " AND request.status=" + status + " AND request.refer_client = 1"
    console.log(que, 'que*******refer')
    return commonFun.runSQLquery(que);
}

commonModel.update03 = (table, id, data) => {
    // console.log(table, "table", id, "id", data, "data222222222222")
    let que = "UPDATE " + table + " SET ? WHERE user_id = " + id + " AND status = 1"
    // console.log(que, 'update03')
    return commonFun.runSqlQueryWithData(que, data);
}

commonModel.checkmailavailable = (data) => {
    let que = "SELECT * FROM agent Where email = '" + data.email + "' AND status IN(0,1,5)";
    // console.log(que, '----------------checkmailavailable')
    return commonFun.runSQLquery(que);
}

commonModel.checkemailNoAgentExist = (data) => {
    let que = "SELECT email, mobile FROM agent Where (email = '" + data.email + "' OR mobile = '" + data.mobile + "') AND status IN(0,1,5)";
    // console.log(que, '----------------checkemailNoAgentExist')
    return commonFun.runSQLquery(que);
}

commonModel.checkAccountavailable = (data) => {
    let que = "SELECT * FROM agent Where account_number = '" + data.account_number + "' AND status IN(0,1)"
    return commonFun.runSQLquery(que);
}

commonModel.fsadatabyid = (data) => {
    // let que = "SELECT * FROM user_fsa Where fsa_id = " + data + " AND status = 1";
    let que = "SELECT user_fsa.* FROM user_fsa LEFT JOIN agent ON user_fsa.user_id = agent.id Where user_fsa.fsa_id = " + data + " AND user_fsa.status = 1 AND agent.status = 1 AND agent.unsubscribe = 0 ";
    return commonFun.runSQLquery(que);
}

commonModel.checkDefault = (data) => {
    // let que = "SELECT * FROM user_fsa Where user_id IN (" + data + ") AND status = 1 AND activate_status = 1 ";
    let que = "SELECT * FROM user_fsa Where user_id IN (" + data + ") AND status = 1 ";
    return commonFun.runSQLquery(que);
}
commonModel.countFsarequest = (data) => {
    let que = "SELECT agent_id,COUNT(agent_id) AS counts FROM request GROUP BY agent_id HAVING MAX(agent_id) IN(" + data + ") ORDER BY counts DESC LIMIT 1"
    // console.log(que, 'que===countFsarequest')
    return commonFun.runSQLquery(que);
}

commonModel.checkdefaultAgent = (data) => {
    let que = "SELECT *, COUNT(user_id) AS counts FROM user_fsa Where user_id IN(" + data + ")  AND status = 1 AND activate_status = 1 GROUP BY user_id ORDER BY counts DESC LIMIT 1"
    // console.log(que, 'checkdefaultAgent---quee')
    return commonFun.runSQLquery(que);
}


commonModel.allrequestDataPublic = (id) => {
    let que = "SELECT request.*, agent.first_name,agent.last_name,agent.email agent_email, agent.mobile agent_mobile FROM  request LEFT JOIN agent ON agent.id =request.agent_id  WHERE user_id= " + id + " ORDER BY request.created_at DESC";
    return commonFun.runSQLquery(que);
}

commonModel.allrequestDataPartner = (id) => {
    let que = " SELECT request.*, agent.first_name,agent.last_name FROM  request LEFT JOIN agent ON agent.id =request.agent_id  WHERE agent_id = " + id;
    return commonFun.runSQLquery(que);
}

commonModel.getFsaCodeAndNeighborhood = (data) => {

 // let que = "SELECT * FROM fsa WHERE fsa_code = '" + data.fsa_code + "' "   
//-------------------------------Sourabh-------------------------------------------
let que = "SELECT * FROM fsa WHERE status = 1 AND fsa_code = '" + data.fsa_code + "'  "

    if (data.fsaString) que += " && fsa_code NOT IN (" + data.fsaString + ") "
    return commonFun.runSQLquery(que);
}

commonModel.checkAgentStatus = (ids, decline_id) => {
    let que = "SELECT * FROM agent WHERE status = 1 "
    if (ids) que += " && id IN (" + ids + ") && id NOT IN (" + decline_id + ")"
    return commonFun.runSQLquery(que);
}

// commonModel.checkRealtorStatus = (ids) => {
//     let que = "SELECT * FROM agent WHERE status = 1 "
//     if (ids) que += " && id IN (" + ids + ") "
//     return commonFun.runSQLquery(que);
// }                                                             // 25-11-22

commonModel.checkRealtorStatus = (ids) => {
    let que = "SELECT * FROM agent WHERE status = 1 AND is_want_referrals != 2"
    if (ids) que += " && id IN (" + ids + ") "
    return commonFun.runSQLquery(que);
}

commonModel.selectreqWhere = (user_id, agent_id, fsa_id) => {
    let que = "SELECT * FROM request WHERE user_id = " + user_id + " AND agent_id = " + agent_id + " AND fsa =" + fsa_id + ";"
    return commonFun.runSQLquery(que);
}

commonModel.getallactiveFSA = (id) => {
    let que = "SELECT * FROM fsa WHERE status = 1"
    return commonFun.runSQLquery(que);
}

commonModel.getClientAgentMail = (data) => {
    let que = "SELECT * FROM agent Where email = '" + data.email + "' AND status IN(0,1,5)";
    return commonFun.runSQLquery(que);
}

commonModel.getAgentByName = (data) => {
    let que = "SELECT * FROM agent Where first_name = '" + data.first_name + "' AND status IN(0,1,5)";
    if (data.last_name != undefined && data.last_name != 'null' && data.last_name != '') {
        que += " AND last_name = '"+ data.last_name +"'"
    }
    return commonFun.runSQLquery(que);
}

// Patner Button -----------

commonModel.getPatnerNextButton = (data, status) => {

    let que = "SELECT * FROM agent WHERE id > '" + data + "' && ((user_type = 3) || (user_type = 2 && is_default_agent = 1)) && status IN ('" + status + "') ORDER BY id ASC LIMIT 1"

    return commonFun.runSQLquery(que);
}

commonModel.getPatnerPreviusButton = (data, status) => {
    let que = "SELECT * FROM agent WHERE id < '" + data + "' && ((user_type = 3) || (user_type = 2 && is_default_agent = 1)) && status IN ('" + status + "') ORDER BY id DESC LIMIT 1";

    return commonFun.runSQLquery(que);
}

//-------------------------------------

// User Button -------------------------


commonModel.getUserNextButton = (data, status) => {

    let que = "SELECT * FROM agent WHERE id > '" + data + "' && (user_type = 4) && status IN ('" + status + "') ORDER BY id ASC LIMIT 1"

    return commonFun.runSQLquery(que);
}


commonModel.getUserPreviusButton = (data, status) => {

    let que = "SELECT * FROM agent WHERE id < '" + data + "' && (user_type = 4) && status IN ('" + status + "') ORDER BY id DESC LIMIT 1"

    return commonFun.runSQLquery(que);
}


//--------------------------------------------


//----------Client BUtton ------------------------------------

commonModel.getClentNextButton = (data, status) => {

    let que = "SELECT * FROM agent WHERE id > '" + data + "' && user_type = 2 && agent_type = 1 && status IN ('" + status + "') ORDER BY id ASC LIMIT 1"

    return commonFun.runSQLquery(que);
}


commonModel.getClientPreviusButton = (data, status) => {

    let que = "SELECT * FROM agent WHERE id < '" + data + "' && user_type = 2 && agent_type = 1 && status IN ('" + status + "') ORDER BY id DESC LIMIT 1"

    return commonFun.runSQLquery(que);
}
//------------------------------------------------------



commonModel.getAgentAuthorized = (id) => {
    let que = "SELECT * FROM `agent_authorized` WHERE id = 1";
    return commonFun.runSQLquery(que);
}

commonModel.getAllAgentsForAuthorized = () => {
    let que = "SELECT * FROM agent WHERE (status = 1 || status = 0) AND user_type != 4 AND agent.id != 1 AND is_email_sent_authorization = 0 ORDER BY id DESC;"
    // console.log(que, 'queeeueuueueue')
    return commonFun.runSQLquery(que)
}

commonModel.selectFSACodeOfAgents = (value) => {
    let que = "SELECT * FROM `user_fsa` WHERE user_id = " + value + " AND status = 1";
    return commonFun.runSQLquery(que);
}



commonModel.getAllAgentsName = (id) => {
    let que = "SELECT * FROM agent WHERE (user_type = 2 OR user_type = 3) AND status IN(0,1,5) ORDER BY first_name ASC"
    return commonFun.runSQLquery(que);
}

commonModel.acceptedRequestWithDate = (id) => {
    // let que = "SELECT * FROM request WHERE status = 1 AND accepted_date IS NOT NULL;"
    let que = "SELECT * FROM request WHERE status = 1 AND is_email_sent = 0 AND accepted_date IS NOT NULL;"
    return commonFun.runSQLquery(que);
}

commonModel.getClientAgentMail = (data) => {
    let que = "SELECT * FROM agent Where email = '" + data.email + "' AND status IN(0,1,5)";
    return commonFun.runSQLquery(que);
}
commonModel.getlatestrequestofuser = (data) => {
    let que = "SELECT * FROM request WHERE user_id = '" + data.user_id + "' && fsa = '" + data.fsa + "' && status IN(2,4) ORDER BY updated_at DESC;";
    return commonFun.runSQLquery(que);
}

commonModel.getDefaultagentByFSA = (data) => {
    let que = "SELECT * FROM user_fsa WHERE fsa_id = " + data.fsa_id + " AND status = 1 AND activate_status = 1";
    return commonFun.runSQLquery(que);
}

commonModel.defaultAgentByFSA = (fsaId) => {
    let que = "SELECT * FROM user_fsa WHERE fsa_id = " + fsaId + " AND status = 1 AND activate_status = 1";
    console.log(que, 'queeeeeeeeeeeee===----------------')
    return commonFun.runSQLquery(que);
}

commonModel.selectsubadmin = (table, obj, search, filterStatus, count, limit) => {
    let que = "SELECT * FROM  " + table + " WHERE status IN (1,0) AND user_type = " + obj.user_type + " ";

    if (search != undefined && search != 'null' && search != '') {
        que += " AND (agent.first_name LIKE '" + search + "%' OR agent.last_name LIKE '" + search + "%' OR agent.email LIKE '" + search + "%' OR CONCAT(agent.first_name, ' ', agent.last_name) LIKE '" + search + "%' ) "
    }

    if (filterStatus != undefined && filterStatus != "null" && filterStatus != '') {

        if (filterStatus == 1 || filterStatus == 0) {
            que += " AND agent.status LIKE '%" + filterStatus + "%' "
        }
        if (filterStatus == 2) {
            que += " AND agent.status LIKE '%" + filterStatus + "%' "
        }
    }
    que += " ORDER BY agent.id DESC  LIMIT " + count + "," + limit;

    return commonFun.runSQLquery(que);
}
commonModel.subadmin_total = () => {
    let que = "SELECT COUNT(*) as total FROM agent WHERE status IN (1,0) AND user_type = 5 ORDER BY agent.id DESC;"
    return commonFun.runSQLquery(que);
}

commonModel.loginadmin = (table, obj) => {
    let que = "SELECT * FROM  " + table + " WHERE user_type IN (1,5) AND status IN (0,1) AND email = '" + obj.email + "' ";
    // console.log(que, "loginadmin")
    return commonFun.runSQLquery(que);
}

commonModel.getAgentByMultipleId = (fsaId) => {
    let que = "SELECT * FROM agent WHERE id IN (" + fsaId + ")";
    return commonFun.runSQLquery(que);
}


//---------------------------------------------Sourabh----------------------------------------------------------------


commonModel.checkFsa = (fsa) => {
    let que = "SELECT * FROM fsa WHERE fsa_code = '" + fsa + "'  ";

    return commonFun.runSQLquery(que);
}

commonModel.getFsaNextButton = (id) => {
    // let que = "SELECT * FROM fsa WHERE id > '" + id + "'  ORDER BY id ASC LIMIT 1"
    let que = "SELECT * FROM fsa WHERE id > '" + id + "' AND status = 1 ORDER BY id ASC LIMIT 1"
    return commonFun.runSQLquery(que);
}

commonModel.getFsaPreviousButton = (id) => {
    // let que = "SELECT * FROM fsa WHERE id < '" + id + "'  ORDER BY id DESC LIMIT 1"
    let que = "SELECT * FROM fsa WHERE id < '" + id + "' AND status = 1 ORDER BY id DESC LIMIT 1"
    return commonFun.runSQLquery(que);
}
//---------------------------------------------------------Sourabbh------------------------------------------
commonModel.getsubadminById = (id) => {
    let que = "SELECT agent.first_name,agent.last_name,agent.email,agent.id,agent.profile_img,agent.country_code_id,agent.mobile ,subAdmin_pages.page_id,subAdmin_pages.user_id FROM agent LEFT JOIN subAdmin_pages ON agent.id = subAdmin_pages.user_id WHERE subAdmin_pages.user_id = " + id + "";

    return commonFun.runSQLquery(que);
}




///--------------------------------------------------Sourabh-------------------------------------27/09/22---------------


commonModel.selectFSAIdFromAgentFsaTable = (id) => {
    let que = "SELECT GROUP_CONCAT(DISTINCT fsa_id) as fsa_ids FROM `user_fsa` WHERE user_id = '" + id + "' ";

    return commonFun.runSQLquery(que);
}

commonModel.getsubadminById = (id) => {
    let que = "SELECT agent.first_name,agent.last_name,agent.email,agent.id,agent.profile_img,agent.country_code_id,agent.mobile ,subAdmin_pages.page_id,subAdmin_pages.user_id FROM agent LEFT JOIN subAdmin_pages ON agent.id = subAdmin_pages.user_id WHERE subAdmin_pages.user_id = " + id + "";

    return commonFun.runSQLquery(que);
}


//----------------------------------------------Sourabh------------------------------------------------------------


commonModel.myAgentData = (id) => {

    let que = "SELECT * FROM client_map WHERE user_id ='" + id + "' ";
    return commonFun.runSQLquery(que);
}

commonModel.LoggedInUser_FSA = (id) => {
    let que = "SELECT GROUP_CONCAT(DISTINCT fsa_id) as fsa_ids FROM `user_fsa` WHERE user_id = '" + id + "' ";

    return commonFun.runSQLquery(que);
}

commonModel.LoggedDefault_FSA = (id) => {
    let que = "SELECT GROUP_CONCAT(DISTINCT user_id) as user_ids FROM `user_fsa` WHERE fsa_id IN (" + id + ") AND status = 1 AND activate_status = 1";

    return commonFun.runSQLquery(que);
}

commonModel.defaultUserFSAData = (ids) => {
    let que = "SELECT * FROM agent WHERE id IN (" + ids + ") AND status = 1";

    return commonFun.runSQLquery(que);
}

commonModel.myAddedAgentData = (id) => {
    let que = "SELECT * FROM agent WHERE id = '" + id + "'";
    return commonFun.runSQLquery(que);
}

commonModel.myAddedAgentFSAData = (id) => {
    let que = "SELECT * FROM fsa WHERE id = '" + id + "' ";
    return commonFun.runSQLquery(que);
}

commonModel.myClientData = (id) => {
    let que = "SELECT * FROM client_map WHERE agent_id ='" + id + "' GROUP BY user_id";
    return commonFun.runSQLquery(que);
}

commonModel.myAddedClientData = (id) => {
    let que = "SELECT * FROM agent WHERE id = '" + id + "'";
    return commonFun.runSQLquery(que);
}

commonModel.FsaUserCounts = (id) => {
    let que = "SELECT agent.id FROM agent LEFT JOIN user_fsa ON agent.id = user_fsa.user_id WHERE ((agent.user_type = 2 AND agent.is_default_agent=1) OR (agent.user_type = 3 AND user_fsa.activate_status = 0) OR (agent.user_type = 2 AND agent.is_default_agent=0) OR (agent.agent_type =1)) AND agent.status=1 AND (user_fsa.status = 1 || user_fsa.status = 3) AND user_fsa.fsa_id = "+id+" GROUP BY agent.id Order By agent.is_default_agent DESC"
    return commonFun.runSQLquery(que);
}

commonModel.fsacountUser = (id) => {
    let que = "SELECT user_id, COUNT(id) AS totalUserFSA FROM user_fsa WHERE user_id = "+id+" AND status = 1"
    return commonFun.runSQLquery(que)
}

commonModel.sendLinkCheck = (id) => {
    let que = "SELECT * FROM agent WHERE (status = 0 AND sendLinkEdit_respond = 0 AND sendLink_date != 'NULL')"
    console.log(que,'quequequequequequequequequequeque')
    return commonFun.runSQLquery(que);
}


commonModel.getNodeData = (id) => {
    let que = "SELECT * FROM notepad WHERE user_id = "+id+" "
    // console.log(que,'-------------------------------------------------e')
    return commonFun.runSQLquery(que);
}
commonModel.editNode = (data) => {
    let que = "SELECT * FROM notepad WHERE user_id = "+data.user_id+" AND id = "+data.id+""
    // console.log(que,'-------------------------------------------------e')
    return commonFun.runSQLquery(que);
}




commonModel.myMapSearchBar = (data) => {
 let que="SELECT * FROM `agent` LEFT JOIN `client_map` ON `client_map`.`agent_id` = `agent`.`id` WHERE ((`client_map`.`user_id`= '" + data.id + "') AND ( CONCAT(first_name, ' ', last_name)  LIKE '" + data.realtor + "%') ) ";

    return commonFun.runSQLquery(que);
}

commonModel.checkEmailForForgetPass = (data) => {
    let que="SELECT * FROM agent WHERE email = "+data.email+" "
   
       return commonFun.runSQLquery(que);
   }
   

// commonModel.changeToThumbnail = (id) => {
//     // let que = "SELECT id, first_name, last_name, email, profile_img FROM agent WHERE profile_img != 'avtar.png'"
//     let que = "SELECT id, first_name, last_name, email, profile_img FROM agent";
//     console.log(que,'que---changeToThumbnail')
//     return commonFun.runSQLquery(que);
// }

///----------------------------------------------------------------------------------------------------------------

module.exports = commonModel;
