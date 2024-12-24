import { Injectable } from '@angular/core';
import { HttpService } from './http.service'
@Injectable()
export class ApiUrlService {
  editProfile: any;
  nameProfile: any;
  constructor(private api: HttpService) { }

  public url = {

    addFSA:'addFSA/',
    checkFsaInAdmin:'checkFsaInAdmin/',
    EditFsa:'editFsa/',

    login: 'login',

    Sendlink: 'Sendlink/',
    addEditAgent: 'addEditAgent/',
    getCountryCode: 'getCountryCode',
    changeAgentStatus: 'changeAgentStatus/',
    getAgentList: 'getAgentList',
    getAgentById: 'getAgentById/',
    getFSA: 'getFSA',
    getDefaultagentByFSA: 'getDefaultagentByFSARefer',
    updatePassword: 'updatePass/',
    getAdvertisementList: 'getAdvertisementList',
    getAdvertisementById: 'getAdvertisementById/',
    addEditAdvertisement: 'addEditAdvertisement/',
    changeAdvertisementStatus: 'changeAdvertisementStatus/',
    DeleteAd: 'DeleteAd/',
    getDefaultAndPartnerAgent: "getDefaultAndPartnerAgent",
    getnearbyAgent: "getnearbyAgent",
    getnearbyForAgentList: "getnearbyForAgentList",
    updateNearbyAgent: "updateNearbyAgent",
    getClientListAdmin: "getClientListAdmin",
    deleteNearbyAgent: "deleteNearbyAgent",
    addNearbyAgent: "addNearbyAgent",

    getAgentByEmail: "getAgentByEmail",

    addEdit: 'addEdit',
    getFooter: 'getFooter',

    getLastId: 'getLastId',
    getPartnerList: 'getPartnerList/',
    getClientPartnerCount: 'getClientPartnerCount/',
    changeDefaultAgentStatus: 'changeDefaultAgentStatus/',
    getDateRange: 'getDateRange',

    getUserList: 'getUserList/',
    getUserById: 'getUserById/',

    fsaById: 'fsaById/',
    getFSAActiveDefaultAgent: 'getFSAActiveDefaultAgent/',
    editFSAName: 'editFSAName/',
    fsaAddressById: 'fsaAddressById/',
    neighborhood: 'neighborhood/',


    getCounts: 'getCounts',
    getRequestData: 'getRequestData',
    getRequestDataSearch: 'getRequestDataSearch',
    getPieChart_agent: 'getPieChart_agent',
    getRequestDataById: 'getRequestDataById/',
    getYearSubscription: 'getYearSubscription',
    getMonthSubscriptions: 'getMonthSubscriptions',
    getWeekSubscriptions: 'getWeekSubscriptions',


    getContactData: 'getContactData',
    getContactDataById: 'getContactDataById/',
    addContactData: 'addContactData',
    getAgentDataById: 'getAgentDataById/',

    getBecomeAgentList: 'getBecomeAgentList',

    getActiveFSA: 'getActiveFSA',

    changeFSAAgentStatus: 'changeFSAAgentStatus/',
    editProfile: 'editProfile/',
    getActiveFSATotal: 'getActiveFSATotal',
    verifyPassword: 'verifyPassword',
    admineditProfile: 'admineditProfile/',
    getActiveAgentTotal: 'getActiveAgentTotal',
    getNextAgentId: 'getNextAgentId/',
    getPreviousAgentId: 'getPreviousAgentId/',
    getAgentAuthorizedStatus: "getAgentAuthorizedStatus",
    ChangAgentAuthorizedStatus: "ChangAgentAuthorizedStatus/",
    // getActiveFSATotal: 'getActiveFSATotal'

    // BUttons Api -----------------------------------------------------------------------------------------
    NextButton: 'NextButton',
    PreviousButton: 'PreviousButton',

    UserNextButton: 'UserNextButton',
    UserPreviousButton: 'UserPreviousButton',

    ClientNextButton: 'ClientNextButton',
    ClientPreviusButton: 'ClientPreviusButton',

    //------------------------------------------------------------------
    getFsaCodeAndNeighborhood: "getFsaCodeAndNeighborhood",
    getFsaPrevious:"getFsaPrevious",
    getFsaNext:"getFsaNext",
    getsubAdminList: "getsubAdminList",
    addEditsubadmin: "addEditsubadmin/",
    getadminById: "getadminById/",
    getuserroles: "getuserroles",
    changeadminStatus: "changeadminStatus/",
    getsubadminById: "getsubadminById/"
    ,
    addNoteData:"addNoteData",
    getNoteData:"getNoteData",
    editNoteData:"editNoteData/"
  };

}

