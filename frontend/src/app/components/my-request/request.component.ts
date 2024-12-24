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
export class MyRequestComponent implements OnInit {
  NewRequestData: any;
  CancledRequestData: any;
  AcceptedRequestData: any;
  CompletedRequestData: any;
  RequestData:any;
  agent_id: any;
  arr = [];
 fsa;


  constructor(
    private activatedRoute: ActivatedRoute,
    private _router: Router,
    private modalService: NgbModal,
    private translate: TranslateService,
    private http: HttpService,
    private toastr: ToastrService
  ) { }
  async ngOnInit() {
    if (localStorage.getItem('type') != '4') {
      this._router
        .navigateByUrl('/login', { skipLocationChange: true })
        .then(() => {
          this._router.navigate(['home']);
        });
    }

   
    this.getRequest();
    this.getCancledRequest();
    this.getAcceptedRequest();
    this.getCompletedRequest();
    this.getRequestByAgentAll();
    console.log(this.agent_id,'agentI-----------')
  }

  async getRequestByAgentAll(){
    let Data: any = await this.http.post('GetUserRequestAll', {
      agent_id: localStorage.getItem('userid'),
      status: 0,
   })
   this.RequestData = Data['data'];
  
  }

  async getRequest() {
    let Data: any = await this.http.post('GetUserRequest', {
      user_id: localStorage.getItem('userid'),
      status: 0,
      agent_id: this.agent_id
    });
    this.NewRequestData = Data['data'];
  }
  async getCancledRequest() {
    let Data: any = await this.http.post('GetUserRequest', {
      user_id: localStorage.getItem('userid'),
      status: 2,
    });
    this.CancledRequestData = Data['data'];
  }
  async getAcceptedRequest() {
    let Data: any = await this.http.post('GetUserRequest', {
      user_id: localStorage.getItem('userid'),
      status: 1,
    });
    this.AcceptedRequestData = Data['data'];
  }
  async getCompletedRequest() {
    let Data: any = await this.http.post('GetUserRequest', {
      user_id: localStorage.getItem('userid'),
      status: 3,
    });
    this.CompletedRequestData = Data['data'];
  }
  async cancleRequest(data: any) {
    Swal.fire({
      text: 'Are you sure want to delete ?',
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
fsaString='';

  userDetails: any;
  open(content: any, s: any) {
    this.fsaString='';

    this.userDetails = s;
    this.agent_id= s.agent_id
    console.log(this.userDetails,'userdattat');
    for (let i = 0; i < this.userDetails.AgentFSA.length; i++) {
      this.fsaString+=this.userDetails.AgentFSA[i].fsa_code +" - "+ this.userDetails.AgentFSA[i].nieghborhood +',';
    }
    this.fsaString=this.fsaString.slice(0, this.fsaString.length -1)
    console.log('fsaString',this.fsaString)

    // this.arr = this.userDetails.AgentFSA.map((e)=>{
    //  return {code : e.fsa_code +" - "+ e.nieghborhood}
    // })
    // this.fsa = this.arr.toString();
    // console.log(this.fsa, "vishal")

    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then((result) => { });
  }
}
