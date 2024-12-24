import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css'],
})
export class RequestComponent implements OnInit {
  NewRequestData: any;
  CancledRequestData: any;
  AcceptedRequestData: any;
  CompletedRequestData: any;
  RequestData: any;
  AddAgentData: any;
  addClientData: any;
  NewRequestRefer: any;
  referCount: any
  receivedrequestData: any;
  
  Usertype = localStorage.getItem('type');
  agent = localStorage.getItem('agent_type');
  closeResult: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private _router: Router,
    private modalService: NgbModal,
    private translate: TranslateService,
    private http: HttpService,
    private toastr: ToastrService
  ) { }

  async ngOnInit() {

   

    if (localStorage.getItem('type') != '2' && localStorage.getItem('type') != '3') {
      this._router
        .navigateByUrl('/login', { skipLocationChange: true })
        .then(() => {
          this._router.navigate(['home']);
        });
    }

    var getParamm = window.location.href.split('request/')[1].split('/');
    if (getParamm[0] != '0') {
      let RequestDeData: any = await this.http.post('getRequestDetailss', {
        id: getParamm[0],
      });
      
      if(RequestDeData['data'][0].status == 1  && getParamm[1] == '1'){
        Swal.fire(
          '',
          'Request Already Accepted!',
          'warning'
        )
      }
      else if( RequestDeData['data'][0].status == 1  && getParamm[1] == '2'){
        Swal.fire(
          '',
          'Request Already Accepted!',
          'warning'
        )

      }
      else if( RequestDeData['data'][0].status == 2  && getParamm[1] == '1'){
        Swal.fire(
          '',
          'Request Already Declined!',
          'warning'
        )

      }

    else if(RequestDeData['data'][0].status == 2  && getParamm[1] == '2'){

      Swal.fire(
        '',
        'Request Already Declined!',
        'warning'
      )
    }
    else{
    
      let Response: any = await this.http.post('changeRequestStatus', {
        agent_id: RequestDeData['data'][0].agent_id,
        type: getParamm[1],
        id: getParamm[0],
      });
    
      if (Response['status'] == true) {
        this.toastr.success(Response['msg']);
        if (Response['request_type'] == 1) {
          Swal.fire(
            '',
            'Request Accepted Successfully!',
            'success'
          )
        } else if (Response['request_type'] == 0) {
          Swal.fire(
            '',
            'Request Declined Successfully!',
            'success'
          )
        } else {
          Swal.fire(
            '',
            'Please activate account!',

          )
        }

        this._router
          .navigateByUrl('/login', { skipLocationChange: true })
          .then(() => {
            this._router.navigate(['request/0/0']);
          });
      } else {
        this.toastr.error(Response['msg']);
      }
    }
    }
    // this._router.navigateByUrl('home')

    this.getRequest();
    this.getCancledRequest();
    this.getAcceptedRequest();
    this.getReferRequest();
    this.getCompletedRequest();
    this.getRequestByAgentAll();
    this.receivedrequest();
    // this.myClients();
  }
  async getRequestByAgentAll() {
    let Data: any = await this.http.post('getRequestByAgentAll', {
      agent_id: localStorage.getItem('userid'),
      status: 0,
    })
    this.RequestData = Data['data'];
  }


  async getRequest() {
    let Data: any = await this.http.post('getRequestByAgent', {
      agent_id: localStorage.getItem('userid'),
      status: 0,
    });
    this.NewRequestData = Data['data'];
  }
  async getCancledRequest() {
    let Data: any = await this.http.post('getRequestByAgent', {
      agent_id: localStorage.getItem('userid'),
      status: 2,
    });
    this.CancledRequestData = Data['data'];

  }
  async getAcceptedRequest() {
    let Data: any = await this.http.post('getRequestByAgent', {
      agent_id: localStorage.getItem('userid'),
      status: 1,
    });
    this.AcceptedRequestData = Data['data'];
  }
  async getCompletedRequest() {
    let Data: any = await this.http.post('getRequestByAgent', {
      agent_id: localStorage.getItem('userid'),
      status: 3,
    });
    this.CompletedRequestData = Data['data'];

  }
  async cancleRequest(data: any) {
    Swal.fire({
      text: 'Are you sure want to Cancel Request ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then(async (result: any) => {
      if (result.isConfirmed) {
        data.login_agent_id = localStorage.getItem('userid');
        data.type = 2;
        let Response: any = await this.http.post('changeRequestStatus', data);
        if (Response['status'] == true) {
          this.toastr.success(Response['msg']);
          this.ngOnInit();
        } else {
          this.toastr.error(Response['msg']);
        }
      }
    });
  }
  async acceptRequest(data: any) {
    data.login_agent_id = localStorage.getItem('userid');
    data.type = 1;
    let Response: any = await this.http.post('changeRequestStatus', data);

    if (Response['status'] == true) {
      this.toastr.success(Response['msg']);
      Swal.fire(
        '',
        'Thank you for Accepting!',
        'success'
      )
      this.ngOnInit();

    } else {
      this.toastr.error(Response['msg']);
    }
  }
  userDetails: any;
  open(content: any, s: any) {
    this.userDetails = s;
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then((result) => { 
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }

  getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
    } else {
        return `with: ${reason}`;
    }
}



  async getReferRequest() {
    let Data: any = await this.http.post('getReferRequest', {
      agent_id: localStorage.getItem('userid'),
      status: 0,
      refer_client: 1
    });
    this.NewRequestRefer = Data['data'];
    // console.log(this.NewRequestRefer,'this.NewRequestRefer')
  }

  async receivedrequest() {
    let Data: any = await this.http.post('receivedrequest', {
      agent_id: localStorage.getItem('userid'),
      status: 0,
      refer_client: 1
    });
    this.receivedrequestData = Data['data'];
  }

  async myAgentsrequest() {
    let id = localStorage.getItem('userid')
    let Data: any = await this.http.post('myAgentData', { id });
    this.AddAgentData = Data['data'];
  }

  // async myClients() {
  //   let id = localStorage.getItem('userid')
  //   let Data: any = await this.http.post('myClientData', { id });
  //   this.addClientData = Data['data'];
  // }

}