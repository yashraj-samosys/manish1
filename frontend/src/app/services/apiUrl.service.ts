import { Injectable } from '@angular/core';
import { HttpService } from './http.service'
@Injectable()
export class ApiUrlService {
  first_name(first_name: any, arg1: string, ResData: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private api: HttpService) { }
  editProfile:any;
  nameProfile: any; 

  public url = {
    login: 'login',
    getCustomerList: 'getCustomerList',
    getChefList: 'getChefList',
    getDriverList: 'getDriverList',
    changeUserStatus: 'changeUserStatus/',
    getUserById: 'getUserById/',
    getUsersCount: 'getUsersCount',
    getTopRatedChefList: 'getTopRatedChefList',
    getAdvertisementList: 'getAdvertisementList',
    addEditAdvertisement: 'addEditAdvertisement/',
    getAdvertisementById: 'getAdvertisementById/',
    changeAdvertisementStatus: 'changeAdvertisementStatus/',
    getDateRange: 'getDateRange',
    getfoot: 'getfoot/',
    getContactData: 'getContactData',
    getContactDataById: 'getContactDataById/',
    addContactData: 'addContactData',
    getAgentDataById: 'getAgentDataById/',
    getLastId: 'getLastId',
    getFsaCodeAndNeighborhood: "getFsaCodeAndNeighborhood",

    addEdit: 'addEdit',
    getFooter:'getFooter',
    addNewAgent: 'addNewAgent',
    addEditAgent: 'addEditAgent/',
    editProfile: 'editProfile/',
    getActiveFsaWithAdderess: 'getActiveFsaWithAdderess',
    verifyPassword: 'verifyPassword',
    addToMyNetwork: 'addToMyNetwork',
    UnsubscribeAgent:'UnsubscribeAgent/',
    getAllFSA: 'getAllFSA',
    getAllAgentsName: 'getAllAgentsName',
    getAgentMail: 'getAgentMail',
    sendReferral: 'sendReferral',
    getAgentByName: 'getAgentByName',




    myAgentData:"myAgentData",
    myAddedAgent:"myAddedAgent",

    forgetpassword:"forget-password",
    resetpass:"reset-password/"

  };

}
