import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiUrlService } from 'src/app/shared/services/apiUrl.service';
import { HttpService } from 'src/app/shared/services/http.service';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { Navbar } from 'src/app/shared/services/navbar';


@Component({
  selector: 'app-sub-admin-view',
  templateUrl: './sub-admin-view.component.html',
  styleUrls: ['./sub-admin-view.component.scss']
})
export class SubAdminViewComponent implements OnInit {

  id;
  userData;
  data2 = []
  constructor(
    private http: HttpService,
    private apiUrl: ApiUrlService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private navigationService: NavigationService
  ) {
    this.id = this.route.snapshot.params['id']
  }

  ngOnInit(): void {
    this.getUserById();
  }

  async getUserById() {
    this.data2 = []
    let result = await this.http.get(this.apiUrl.url.getsubadminById + this.id);
    // 
    console.log(result)
    if (result['status']) {
      this.userData = result['data'][0];
    } else this.toastr.error('Something went wrong from server/api', '', { timeOut: 2000 });

    let page = result['data'][0].page_id.split(',')
    let newara = []
    for (let x of page) {
      newara.push(parseInt(x))
    }
    let navbar = Navbar.filter((e) => {
      return newara.includes(e.id)
    })
    for (const x of navbar) {
      this.data2.push(x.name)
    }
  }












}