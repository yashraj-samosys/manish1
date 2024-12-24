import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss']
})
export class AdminListComponent implements OnInit {
  searchControl: FormControl = new FormControl();
  filtered = [];
  data;
  user_type;


  constructor(
    private http: HttpService,
    private router: Router,) {

    this.user_type = localStorage.getItem('user_type');
  }

  ngOnInit(): void {
    this.getsubAdminList();
    console.log("adminnnnnnnnnnnnnnnnnnnnnnn")

  }
  async applyFilter(filterValue: string) {
    // console.log(filterValue, "value");
    // this.search = filterValue.trim();
    // this.getAgentList();
  }

  view(id) { this.router.navigate(['/admin/adminview', id]) }
  edit() { this.router.navigate(['/users/edit'], { queryParams: { s: 'list' } }) }

  async getsubAdminList() {
    let result = await this.http.get('getAdminList');
    this.data = [...result['data']];
    this.filtered = result['data'];
    console.log(result)
  }

}
