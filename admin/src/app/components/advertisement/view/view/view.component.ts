import { Component, OnInit } from '@angular/core';

  import {HttpService} from "../../../../shared/services/http.service"
  import {ApiUrlService} from "../../../../shared/services/apiUrl.service"
import { ToastrService } from "ngx-toastr";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  id;
  data;
  agentFsa;
  
  constructor(
    private toastr: ToastrService,
    private http: HttpService,
    private apiUrl: ApiUrlService,
    private route: ActivatedRoute
  )

  {
    this.id = this.route.snapshot.params["id"];
  }


  ngOnInit(): void {
    this.getAgentById();
  }
  async getAgentById() {
   // http://192.168.0.146:3086/getAdvertisementById/
    let result = await this.http.get(this.apiUrl.url.getAdvertisementById + this.id);
    console.log(result)
    if (result["status"]) {
      this.data = result["data"][0];
      console.log(this.data)
      this.agentFsa = result["data"][0].agentFsa;;
    } else
      this.toastr.error("Something went wrong from server/api", "", {
        timeOut: 2000,
      });
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

}
