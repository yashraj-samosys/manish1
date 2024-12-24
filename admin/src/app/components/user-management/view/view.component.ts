import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { HttpService } from "../../../shared/services/http.service";
import { ApiUrlService } from "../../../shared/services/apiUrl.service";
import { CommonService } from "../../../shared/services/common.service";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";
import { DomSanitizer, SafeResourceUrl, } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ValidationsService } from "src/app/shared/services/validations.service";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable } from 'rxjs';
import { LoaderService } from "src/app/shared/services/loader.service";
import { validationscnfg } from "src/app/validations/validation";




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
  is_default;
  Fsaurl;
  FSACODE;
  FSANAME;
  requestData;
  agentForm: FormGroup;
  addnote: FormGroup;
  editnote: FormGroup;
  closeResult: string;
  totalAgent;
  nextAgentID;
  clientList;
  requestDataPartner;
  show: boolean;
  submitted = false;
  checkiD;
  defaultData;
  page = this.route.snapshot.queryParams.page;
  validations_cnfg = validationscnfg;
  hidden = false;

  constructor(
    private formBuilder: FormBuilder,
    public validations: ValidationsService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private http: HttpService,
    private apiUrl: ApiUrlService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    public common: CommonService,
    private router: Router,
    private loaderService: LoaderService,


    // private _route: Router,
    // public validations: ValidationsService,
    // public formBuilder: FormBuilder,/
    // private modalService: NgbModal,
    public changedetectorref: ChangeDetectorRef
  ) {
    this.id = route.snapshot.params["id"];
    this.type = route.snapshot.params["type"];
    this.is_default = route.snapshot.params["is_default"];
    this.getfsa();
    this.showHideButtons();
  }
  index = 0;


  ngOnInit() {
    this.getNoteData();
    this.agentForm = this.formBuilder.group({
      fsa_id: ["", this.validations.fsaarea],
      email: ["", this.validations.email],
      phone: ["", this.validations.mobile],
    })
    // this.getAgentById();
    this.getAgentById(this.id);
    this.getActiveAgentTotal();

    this.addnote = this.formBuilder.group({
      note: ["", this.validations.note]
    })

    this.agentForm = this.formBuilder.group({
      fsa_id: ["", this.validations.fsaarea],
      client_email: ["", this.validations.email],
      message: ["", this.validations.maxlength350],
      name: ["", this.validations.fullname],
      // user_id : this.id,
      // user_email:this.data.email,
    })
  }

  textTruncate(str, str1, limit) {
    if (str && str.length >= limit && !this.isMore) return str1.substring(0, limit) + "...";
    else return str;
  }

  readMore() {
    // console.log(this.isMore)
    this.isMore = !this.isMore
  }
  get f() { return this.agentForm.controls; }


  async getAgentById(id) {
    console.log(this.id, "id123")
    let result = await this.http.get(this.apiUrl.url.getAgentById + id);

    // let result = await this.http.get(this.apiUrl.url.getAgentById + this.id);
    // console.log(result, "result123")
    // console.log(result['data'][0].requestData, 'getAgent BYid')
    this.FSACODE = result['data'][0].FSAData[0]?.fsa_code
    this.FSANAME = result['data'][0].FSAData[0]?.fsa_name
    if (result["status"]) {
      this.data = result["data"][0];
      this.data.last_name = this.data.last_name != '' && this.data.last_name != 'undefined' && this.data.last_name != undefined && this.data.last_name != null && this.data.last_name != 'null' ? this.data.last_name : '',
        this.data.account_number = this.data.account_number != '' && this.data.account_number != 'undefined' && this.data.account_number != undefined && this.data.account_number != null && this.data.account_number != 'null' ? this.data.account_number : '',
        this.requestData = this.data?.requestData
      this.requestDataPartner = this.data?.requestDataPartner;
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


  async getActiveAgentTotal() {
    // console.log('werwrewrewrwer')
    let result = await this.http.get(this.apiUrl.url.getActiveAgentTotal);
    // console.log(result, 'getActiveAgentTotal')
    this.totalAgent = result.data[0].total;
    this.nextAgentID = result.data[0].getClientAgent;
    // console.log(this.totalAgent, 'total--agent')
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
    // console.log('data', checked)
    // console.log(data, checked);
    // console.log(this.id, data.id, 'id')
    let result = await this.http.post('activateFSA/' + this.id, { fsa_id: data.id, status: checked });
    // console.log(result, 'result')
    if (result['status'] == true) {
      this.toastr.success(result['msg']);
      this.router.navigateByUrl('/login', { skipLocationChange: true }).then(() => {
        this.router.navigate(['users/view/' + this.id + '/' + this.type]);
      });
    } else {
      this.toastr.warning(result['msg']);
      this.router.navigateByUrl('/login', { skipLocationChange: true }).then(() => {
        this.router.navigate(['users/view/' + this.id + '/' + this.type]);
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

  async pervious() {
    let result = await this.http.get(this.apiUrl.url.getPreviousAgentId + this.id);
    if (result['data'][0]) { this.id = result['data'][0].id; this.show = false; }
    else this.show = true;
    this.router.navigate(['users/view/' + this.id + '/' + this.type]);
    this.getAgentById(this.id);
  }

  async next() {
    // this.id = parseInt(this.id);

    let result = await this.http.get(this.apiUrl.url.getNextAgentId + this.id);
    if (result['data'][0]) { this.id = result['data'][0].id; this.show = false; }
    else this.show = true;
    this.router.navigate(['users/view/' + this.id + '/' + this.type]);
    this.getAgentById(this.id);


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
    this.agentForm.patchValue({
      fsa_id: parseInt(data.fsa),
      client_email: data.agent_email,
      message: data.message,
      name: data.first_name + (data.last_name == undefined || data.last_name == null || data.last_name == 'undefined' || data.last_name == 'null' || data.last_name == '' ? '' : ' ' + data.last_name)
    })
  }

  async getDefaultagentByFSA(fsaId: any) {
    console.log(fsaId, 'fsaId----get')
    let defaultAgentData = await this.http.get(this.apiUrl.url.getDefaultagentByFSA, { fsa_id: fsaId });
    this.defaultData = defaultAgentData['data'];
    console.log(defaultAgentData['data'], '46546546464')

  }


  async agentSubmit() {
    console.log(this.agentForm.value.fsa_id, 'fsa_id')
    if (this.requestData) {
      console.log(this.requestData, 'this.requestData')
      var checkRequestExist = this.requestData.filter((obj) => (obj.fsa == this.agentForm.value.fsa_id));
      if (checkRequestExist.length) {
        var alreadyNewRequest = checkRequestExist.filter((val) => (val.status == 0));
        let reqCh = await this.http.post('requestChange', alreadyNewRequest);
      }
    }


    let FSA = await this.getfsabyid2(this.agentForm.value.fsa_id)

    this.submitted = true;
    if (!this.agentForm.invalid) {

      let data = {
        public_user_id: this.data.id,
        public_user_email: this.data.email,
        message: this.agentForm.value.message,
        public_user_name: (this.data.first_name + (this.data.last_name != null && this.data.last_name != 'null' && this.data.last_name != undefined && this.data.last_name != 'undefined' && this.data.last_name != '' && this.data.last_name != ' ' ? ' ' + this.data.last_name : '')),
        fsa_id: this.agentForm.value.fsa_id,
        new_agent_first_name: this.agentForm.value.name.split(' ')[0],
        new_agent_last_name: this.agentForm.value.name.split(' ')[1] ? this.agentForm.value.name.split(' ')[1] : '',
        new_agent_email: this.agentForm.value.client_email,
        fsa_code: FSA.fsa_code,
        fsa_nieghborhood: FSA.nieghborhood,
        // request_id: '',
        // new_agent_id: '',
        // old_agent_F_name: this.defaultData[0].first_name,
        // old_agent_L_name: this.defaultData[0].last_name != undefined && this.defaultData[0].last_name != 'undefined' && this.defaultData[0].last_name != null && this.defaultData[0].last_name != 'null' && this.defaultData[0].last_name != '' ? this.defaultData[0].last_name : '',
        // old_agent_email: this.defaultData[0].email,
        // old_agent_F_name: this.oldagentdata.first_name,
        // old_agent_L_name: this.oldagentdata.last_name != undefined && this.oldagentdata.last_name != 'undefined' && this.oldagentdata.last_name != null && this.oldagentdata.last_name != 'null' && this.oldagentdata.last_name != '' ? this.oldagentdata.last_name : '',
        old_agent_email: this.oldagentdata.agent_email,
        old_agent_mobile: this.oldagentdata.agent_mobile || '',
        old_agent_F_name: this.oldagentdata.first_name,
        old_agent_L_name: this.oldagentdata.last_name || '',      
      }


      let result: any = await this.http.post('sendRequestFromAdmin', data);
      this.getAgentById(this.id);

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
    let result = await this.http.post(this.apiUrl.url.getAgentByEmail, { email: this.agentForm.value.client_email, isLoaderShow: false })
    // this.loaderService.hide()
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

    let result0 = await this.http.post(this.apiUrl.url.ClientNextButton + '/' + this.id, { status: this.route.snapshot.queryParams.status });
    if (result0['data'].length == 0) { this.shownextclientagent = false } else { this.shownextclientagent = true }

    let result1 = await this.http.post(this.apiUrl.url.ClientPreviusButton + '/' + this.id, { status: this.route.snapshot.queryParams.status });
    if (result1['data'].length == 0) { this.showpreclientagent = false } else { this.showpreclientagent = true }


    let result2 = await this.http.post(this.apiUrl.url.UserPreviousButton + '/' + this.id, { status: this.route.snapshot.queryParams.status });
    if (result2['data'].length == 0) { this.showpreuser = false } else { this.showpreuser = true }

    let result3 = await this.http.post(this.apiUrl.url.UserNextButton + '/' + this.id, { status: this.route.snapshot.queryParams.status });
    if (result3['data'].length == 0) { this.shownextuser = false } else { this.shownextuser = true }


    let result4 = await this.http.post(this.apiUrl.url.NextButton + '/' + this.id, { status: this.route.snapshot.queryParams.status });
    if (result4['data'].length == 0) { this.shownextPartneragent = false } else { this.shownextPartneragent = true }

    let result5 = await this.http.post(this.apiUrl.url.PreviousButton + '/' + this.id, { status: this.route.snapshot.queryParams.status });
    if (result5['data'].length == 0) { this.showprePartneragent = false } else { this.showprePartneragent = true }


  }

  showprePartneragent = true
  shownextPartneragent = true

  async PatnerNext(id: any) {
    this.showprePartneragent = true
    let result = await this.http.post(this.apiUrl.url.NextButton + '/' + id, { status: this.route.snapshot.queryParams.status });
    if (result['data'].length > 0) {
      let newid = result['data'][0].id
      this.router.navigate(['/users/view/' + newid + '/' + this.type], { queryParams: { status: this.route.snapshot.queryParams.status, page: 'partner' } });
      this.getAgentById(newid);
      let result2 = await this.http.post(this.apiUrl.url.NextButton + '/' + result['data'][0].id, { status: this.route.snapshot.queryParams.status });
      if (result2['data'].length == 0) { this.shownextPartneragent = false }
    }
  }
  async PatnerPervious(id) {
    this.shownextPartneragent = true
    let result = await this.http.post(this.apiUrl.url.PreviousButton + '/' + id, { status: this.route.snapshot.queryParams.status });
    if (result['data'].length > 0) {
      let newid = result['data'][0].id
      this.router.navigate(['/users/view/' + newid + '/' + this.type], { queryParams: { status: this.route.snapshot.queryParams.status, page: 'partner' } });
      this.getAgentById(newid);
      let result2 = await this.http.post(this.apiUrl.url.PreviousButton + '/' + result['data'][0].id, { status: this.route.snapshot.queryParams.status });
      if (result2['data'].length == 0) { this.showprePartneragent = false }
    }
  }
  shownextclientagent = true
  async ClientNext(id: any) {
    this.showpreclientagent = true
    let result = await this.http.post(this.apiUrl.url.ClientNextButton + '/' + id, { status: this.route.snapshot.queryParams.status });
    if (result['data'].length > 0) {
      let newid = result['data'][0].id
      this.router.navigate(['/users/view/' + newid + '/' + this.type], { queryParams: { status: this.route.snapshot.queryParams.status, page: 'client' } });
      this.getAgentById(newid);
      let result2 = await this.http.post(this.apiUrl.url.ClientNextButton + '/' + result['data'][0].id, { status: this.route.snapshot.queryParams.status });
      if (result2['data'].length == 0) { this.shownextclientagent = false }
      else { this.shownextclientagent = true }
    }
  }
  showpreclientagent = true
  async ClientPrevious(id) {

    this.shownextclientagent = true
    let result = await this.http.post(this.apiUrl.url.ClientPreviusButton + '/' + id, { status: this.route.snapshot.queryParams.status });
    if (result['data'].length > 0) {
      let newid = result['data'][0].id
      this.router.navigate(['/users/view/' + newid + '/' + this.type], { queryParams: { status: this.route.snapshot.queryParams.status, page: 'client' } });
      this.getAgentById(newid);
      let result2 = await this.http.post(this.apiUrl.url.ClientPreviusButton + '/' + result['data'][0].id, { status: this.route.snapshot.queryParams.status });
      if (result2['data'].length == 0) { this.showpreclientagent = false }
    }
  }


  showpreuser = true
  async UserPrevious(id) {
    this.shownextuser = true
    let result = await this.http.post(this.apiUrl.url.UserPreviousButton + '/' + id, { status: this.route.snapshot.queryParams.status });
    if (result['data'].length > 0) {
      let newid = result['data'][0].id
      this.router.navigate(['/users/view/' + newid + '/' + this.type], { queryParams: { status: this.route.snapshot.queryParams.status } });
      this.getAgentById(newid);
      let result2 = await this.http.post(this.apiUrl.url.UserPreviousButton + '/' + result['data'][0].id, { status: this.route.snapshot.queryParams.status });
      if (result2['data'].length == 0) { this.showpreuser = false }
    }
  }

  shownextuser = true
  async UserNext(id) {
    console.log(this.route.snapshot.queryParams.status, "paramsxzsfsfsd")
    this.showpreuser = true
    let result = await this.http.post(this.apiUrl.url.UserNextButton + '/' + id, { status: this.route.snapshot.queryParams.status });
    if (result['data'].length > 0) {
      let newid = result['data'][0].id
      this.router.navigate(['/users/view/' + newid + '/' + this.type], { queryParams: { status: this.route.snapshot.queryParams.status } });
      this.getAgentById(newid);
      let result2 = await this.http.post(this.apiUrl.url.UserNextButton + '/' + result['data'][0].id, { status: this.route.snapshot.queryParams.status });
      if (result2['data'].length == 0) { this.shownextuser = false }
    }
  }

  getfsabyid2(id: any) {
    if (this.fsa) {
      for (let i = 0; i < this.fsa.length; i++) {
        if (id == this.fsa[i].id) {
          return this.fsa[i]
        }
      }
    }
  }

  modal_dismiss() {
    this.modalService.dismissAll()
    this.agentForm.reset();
    this.submitted = false;

  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }




  async AddNote(id: any) {


    this.submitted = true;



    if (this.addnote.value.note.length > 1 && this.addnote.valid) {


      let result = await this.http.post("addNoteData", { id: id, note: this.addnote.value.note });

      if (result['status'] == true) {
        this.toastr.success(result['msg']);
        this.addnote.reset();
        this.getNoteData();

        this.submitted = false;
      } else {
        this.toastr.warning(result['msg']);
      }
    }



  }


  shownote;

  async getNoteData() {
    // let result = await this.http.post(this.apiUrl.url.UserNextButton + '/' + id, { status: this.route.snapshot.queryParams.status });

    let result = await this.http.post(this.apiUrl.url.getNoteData, { id: this.id });
    this.shownote = result['data'];

  }

  async Editnote(data) {
    this.submitted = true;


    let note = this.editnote.value.note;
    let newstr = note.replace(/ /g, "")
    let len = newstr.length

    if (len > 1 && this.editnote.valid) {


      let result = await this.http.post(this.apiUrl.url.editNoteData + data.id, { note });
      if (result['status'] == true) {
        this.toastr.success(result['msg']);

        this.getNoteData();
        this.hidden2 = false;
        this.hidden = false;
      } else {
        this.toastr.warning(result['msg']);
      }
    }


  }


  fieldId;
  hidden2;
  edit(a, i) {
    this.hidden = true;
    this.hidden2 = true;
    this.fieldId = i
    this.editnote = this.formBuilder.group({
      note: ["", this.validations.note]
    })

    this.editnote.patchValue({
      note: a.note
    })
    this.hidden = false;
  }
}

