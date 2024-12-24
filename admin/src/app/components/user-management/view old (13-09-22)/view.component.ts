import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { HttpService } from "../../../shared/services/http.service";
import { ApiUrlService } from "../../../shared/services/apiUrl.service";
import { CommonService } from "../../../shared/services/common.service";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ValidationsService } from "src/app/shared/services/validations.service";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: "app-my-program-view",
  templateUrl: "./view.component.html",
  styleUrls: ["./view.component.scss"],
})

export class ViewComponent implements OnInit {

  id;
  data;
  fsa: any;
  agentFsa;
  isMore = false;
  type;
  Fsaurl;
  FSACODE;
  FSANAME;
  requestData;
  agentForm: FormGroup;
  closeResult: string;
  requestDataPartner;
  submitted = false;
  checkiD;

  constructor(

    private formBuilder: FormBuilder,
    public validations: ValidationsService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private http: HttpService,
    private apiUrl: ApiUrlService,
    private _route: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    public common: CommonService,
    public changedetectorref: ChangeDetectorRef

  )
  
  {
    this.id = route.snapshot.params["id"];
    this.type = route.snapshot.params["type"];
    this.getfsa();
    this.showHideButtons();
  }

  ngOnInit() {

    this.agentForm = this.formBuilder.group({
      fsa_id: ["", this.validations.required],
      email: ["", this.validations.email, Validators.email],
      phone: ["", this.validations.required],
    })

    this.getAgentById();
    this.agentForm = this.formBuilder.group({
      fsa_id: ["", this.validations.required],
      client_email: ["", this.validations.email],
      message: ["", this.validations.required],
      name: ["", this.validations.required],
    
      
    })
  }

  textTruncate(str, str1, limit) {
    if (str && str.length >= limit && !this.isMore) return str1.substring(0, limit) + "...";
    else return str;
  }

  readMore() {
    this.isMore = !this.isMore
  }


  async getAgentById(newid?: any) {
    let result = '';
    console.log(newid, this.id, "iddddd")
    if (newid) {
      result = await this.http.get(this.apiUrl.url.getAgentById + newid);
      console.log(result, "ifffffffffffffffffffff")
    }
    else {
      result = await this.http.get(this.apiUrl.url.getAgentById + this.id);
      console.log(result, "elseeeeeeeeeeeeeeeeeeeeeee")

    }
    console.log(result['data'][0], "yyyyyyyyyyyyyyyyyyyyyyyy")
    if (result['data'][0]) {

      this.FSACODE = result['data'][0].FSAData[0]?.fsa_code
      this.FSANAME = result['data'][0].FSAData[0]?.fsa_name
    }
    if (result["status"]) {
      this.data = result["data"][0];
      this.data.last_name = this.data.last_name != '' && this.data.last_name != 'undefined' && this.data.last_name != undefined && this.data.last_name != null && this.data.last_name != 'null' ? this.data.last_name : '',
        this.data.account_number = this.data.account_number != '' && this.data.account_number != 'undefined' && this.data.account_number != undefined && this.data.account_number != null && this.data.account_number != 'null' ? this.data.account_number : '',
        this.requestData = this.data?.requestData
      this.requestDataPartner = this.data?.requestDataPartner;
      // console.log(this.requestData, 'requestData--------------', this.requestDataPartner)
      if (this.data.shortBio == null) this.data.shortBio = this.data.bio;
      this.agentFsa = result["data"][0].agentFsa[0];
      if (this.data.user_type == 2) {
        this.Fsaurl = this.sanitizer.bypassSecurityTrustResourceUrl(environment.MapUrl + this.agentFsa?.fsa_code + '&userid=')
      } else {
        this.Fsaurl = this.sanitizer.bypassSecurityTrustResourceUrl(environment.MapUrl + this.agentFsa?.fsa_code + '&userid=' + this.data.id)
      }

    } else
      this.toastr.error("Something went wrong from server/api", "", { timeOut: 2000 });
  }



  openImage() {
    const win = window.open("", "_blank");
    let html = "";
    html += "<html>";
    html += "<head>";
    html += "<title>Diet</title>";
    html += "</head>";
    html += '<body style="margin:0!important">';
    html +=
      '<embed width="100%" height="100%" src="' +
      this.data.pdf_file +
      '" type="application/pdf" />';
    html += "</body>";
    html += "</html>";
    setTimeout(() => {
      win.document.write(html);
    }, 1);
  }
  async activateFSA(data, checked) {
    console.log('data', checked)
    console.log(data, checked);
    console.log(this.id, data.id, 'id')
    let result = await this.http.post('activateFSA/' + this.id, { fsa_id: data.id, status: checked });
    console.log(result, 'result')
    if (result['status'] == true) {
      this.toastr.success(result['msg']);
      this._route.navigateByUrl('/login', { skipLocationChange: true }).then(() => {
        this._route.navigate(['users/view/' + this.id + '/' + this.type]);
      });
    } else {
      this.toastr.warning(result['msg']);
      this._route.navigateByUrl('/login', { skipLocationChange: true }).then(() => {
        this._route.navigate(['users/view/' + this.id + '/' + this.type]);
      });
    }
  }

  async Sendlink() {
    let result = await this.http.Post(
      this.apiUrl.url.Sendlink + this.id, { id: this.id, profile: 'view' } // 2nd parameter
    );
    if (result["status"]) {
      this.toastr.success(result["msg"], "", { timeOut: 2000 });
    }
  }



  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  async getfsa() {
    let result = await this.http.get(this.apiUrl.url.getFSA);
    this.fsa = result["data"];

  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  oldagentdata;
  getolddata(data: any) {
    this.oldagentdata = data

  }

  async agentSubmit() {
    
    this.submitted = true;
    if (!this.agentForm.invalid) {

      let data = {
        public_user_id: this.data.id,
        public_user_name: (this.data.first_name + (this.data.last_name != null && this.data.last_name != 'null' && this.data.last_name != undefined && this.data.last_name != 'undefined' && this.data.last_name != '' && this.data.last_name != ' ' ? ' ' + this.data.last_name : '')),
        old_agent_F_name: this.oldagentdata.first_name,
        old_agent_L_name: this.oldagentdata.last_name != undefined && this.oldagentdata.last_name != 'undefined' && this.oldagentdata.last_name != null && this.oldagentdata.last_name != 'null' && this.oldagentdata.last_name != '' ? this.oldagentdata.last_name : '',
        old_agent_email: this.oldagentdata.email,
        new_agent_first_name: this.agentForm.value.name.split(' ')[0],
        new_agent_last_name: this.agentForm.value.name.split(' ')[1] ? this.agentForm.value.name.split(' ')[1] : '',
        new_agent_email: this.agentForm.value.client_email,
        fsa_code: this.agentForm.value.fsa_id.fsa_code,
        fsa_id: this.agentForm.value.fsa_id.id,
        fsa_nieghborhood: this.agentForm.value.fsa_id.nieghborhood,
        request_id: '',
        new_agent_id: '',
        public_user_email: this.data.email,
        message: this.agentForm.value.message,
      }
     
      let result: any = await this.http.post('sendRequestFromAdmin', data);
      this.getAgentById();

      this.modalService.dismissAll()
      this.agentForm.reset()
      this.submitted = false;
      if (result['status'] == true) {
        this.toastr.success(result['msg']);
      } else {
        this.toastr.warning(result['msg']);
      }
    }
  }
  onemailchange(e: any) {
   
    this.getagentbyemail();
  }
  async getagentbyemail() {
    
    let result = await this.http.post(this.apiUrl.url.getAgentByEmail, { email: this.agentForm.value.client_email })
    if (result.status == true) {

      let name = result.data[0].first_name + (result.data[0].last_name != null && result.data[0].last_name != 'null' && result.data[0].last_name != undefined && result.data[0].last_name != 'undefined' && result.data[0].last_name != '' ? ' ' + result.data[0].last_name : '')
      this.agentForm.patchValue({
        name: name
      })
      
    }
    else {
      this.agentForm.patchValue({
        name: ''
      })
    }
  }
  getfsabyid(id: any) {
    if (id) {
      let id_arr = id.split(',')
      let Id = id_arr[0]
      if (this.fsa) {
        for (let i = 0; i < this.fsa.length; i++) {
          if (Id == this.fsa[i].id) {
            return this.fsa[i]
          }
        }
      }
    }
  }

  async showHideButtons() {

    console.log("user type 2 clint")
    let result0 = await this.http.get(this.apiUrl.url.ClientNextButton + '/' + this.id);
    if (result0['data'].length == 0) { this.shownextclientagent = false } else { this.shownextclientagent = true }

    let result1 = await this.http.get(this.apiUrl.url.ClientPreviusButton + '/' + this.id);
    if (result1['data'].length == 0) { this.showpreclientagent = false } else { this.showpreclientagent = true }


    let result2 = await this.http.get(this.apiUrl.url.UserPreviousButton + '/' + this.id);
    if (result2['data'].length == 0) { this.showpreuser = false } else { this.showpreuser = true }

    let result3 = await this.http.get(this.apiUrl.url.UserNextButton + '/' + this.id);
    if (result3['data'].length == 0) { this.shownextuser = false } else { this.shownextuser = true }


    console.log('user type 333')
    let result4 = await this.http.get(this.apiUrl.url.NextButton + '/' + this.id);
    if (result4['data'].length == 0) { this.shownextPartneragent = false } else { this.shownextPartneragent = true }

    let result5 = await this.http.get(this.apiUrl.url.PreviousButton + '/' + this.id);
    if (result5['data'].length == 0) { this.showprePartneragent = false } else { this.showprePartneragent = true }


  }

  showprePartneragent = true
  shownextPartneragent = true

  async PatnerNext(id: any) {
    this.showprePartneragent = true
    let result = await this.http.get(this.apiUrl.url.NextButton + '/' + id);
    if (result['data'].length > 0) {
      let newid = result['data'][0].id
      this._route.navigate(['/users/view/' + newid + '/' + this.type]);
      this.getAgentById(newid);
      let result2 = await this.http.get(this.apiUrl.url.NextButton + '/' + result['data'][0].id);
      if (result2['data'].length == 0) { this.shownextPartneragent = false }
    }
  }
  async PatnerPervious(id) {
    this.shownextPartneragent = true
    let result = await this.http.get(this.apiUrl.url.PreviousButton + '/' + id);
    if (result['data'].length > 0) {
      let newid = result['data'][0].id
      this._route.navigate(['/users/view/' + newid + '/' + this.type]);
      this.getAgentById(newid);
      let result2 = await this.http.get(this.apiUrl.url.PreviousButton + '/' + result['data'][0].id);
      if (result2['data'].length == 0) { this.showprePartneragent = false }
    }
  }
  shownextclientagent = true
  async ClientNext(id: any) {
    this.showpreclientagent = true
    let result = await this.http.get(this.apiUrl.url.ClientNextButton + '/' + id);
    if (result['data'].length > 0) {
      let newid = result['data'][0].id
      this._route.navigate(['/users/view/' + newid + '/' + this.type]);
      this.getAgentById(newid);
      let result2 = await this.http.get(this.apiUrl.url.ClientNextButton + '/' + result['data'][0].id);
      if (result2['data'].length == 0) { this.shownextclientagent = false }
      else { this.shownextclientagent = true }
    }
  }
  showpreclientagent = true
  async ClientPrevious(id) {
    this.shownextclientagent = true
    let result = await this.http.get(this.apiUrl.url.ClientPreviusButton + '/' + id);
    if (result['data'].length > 0) {
      let newid = result['data'][0].id
      this._route.navigate(['/users/view/' + newid + '/' + this.type]);
      this.getAgentById(newid);
      let result2 = await this.http.get(this.apiUrl.url.ClientPreviusButton + '/' + result['data'][0].id);
      if (result2['data'].length == 0) { this.showpreclientagent = false }
    }
  }
  showpreuser = true
  async UserPrevious(id) {
    this.shownextuser = true
    let result = await this.http.get(this.apiUrl.url.UserPreviousButton + '/' + id);
    if (result['data'].length > 0) {
      let newid = result['data'][0].id
      this._route.navigate(['/users/view/' + newid + '/' + this.type]);
      this.getAgentById(newid);
      let result2 = await this.http.get(this.apiUrl.url.UserPreviousButton + '/' + result['data'][0].id);
      if (result2['data'].length == 0) { this.showpreuser = false }
    }
  }

  shownextuser = true
  async UserNext(id) {
    this.showpreuser = true
    let result = await this.http.get(this.apiUrl.url.UserNextButton + '/' + id);
    if (result['data'].length > 0) {
      let newid = result['data'][0].id
      this._route.navigate(['/users/view/' + newid + '/' + this.type]);
      this.getAgentById(newid);
      let result2 = await this.http.get(this.apiUrl.url.UserNextButton + '/' + result['data'][0].id);
      if (result2['data'].length == 0) { this.shownextuser = false }
    }
  }



}

