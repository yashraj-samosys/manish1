import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiUrlService } from 'src/app/shared/services/apiUrl.service';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss']
})
export class AdminViewComponent implements OnInit {
  id;
  userData;
  constructor(
    private http: HttpService,
    private apiUrl: ApiUrlService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.id = this.route.snapshot.params['id']
  }

  ngOnInit(): void {
    this.getUserById();

  }


  async getUserById() {
    console.log(this.id, 'iddddddddddddddd');
    let result = await this.http.get(this.apiUrl.url.getUserById + this.id);
// 
    console.log(result, "resukttttttttt")
    if (result['status']) {
      this.userData = result['data'][0];
      // this.identify_data = this.userData.identify_data[0];
      // this.selected_page = this.userData.subAdmin_data;
    } else this.toastr.error('Something went wrong from server/api', '', { timeOut: 2000 });

  }

}
