import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { HttpService } from "../../../shared/services/http.service";
import { ApiUrlService } from "../../../shared/services/apiUrl.service";
import { ToastrService } from "ngx-toastr";
import { Router, ActivatedRoute } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-make-nearby',
  templateUrl: './make-nearby.component.html',
  styleUrls: ['./make-nearby.component.scss']
})
export class MakeNearbyComponent implements OnInit {
  searchControl: FormControl = new FormControl();
  filtered = [];
  id;
  data;
  total;
  isLoaderShow = true;
  search = "";
  filterStatus: any = '';
  MoviesList:any = []

  constructor(
    private http: HttpService,
    private apiUrl: ApiUrlService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.searchControl = new FormControl();   
    this.getNearByAgent() 
  }

  async getNearByAgent(){
    let result = await this.http.get(this.apiUrl.url.getnearbyAgent);
    console.log('getnearbyAgent (result)------->',result.data);
    if (result.data.length) {
      let nearByData = result.data.sort((a, b) => a.s_no - b.s_no);
      this.MoviesList = nearByData
    }else{
      this.MoviesList = []
    }
  }

  async getAgentList() {
    this.isLoaderShow = true;
    let result = await this.http.post(
      this.apiUrl.url.getnearbyForAgentList,
      {
        search: this.search
      }
    );
    // console.log('getnearbyForAgentList=====>>>>',result)
    this.isLoaderShow = false;
    this.data = [...result["data"]];
    this.total = result?.total;
    if (this.search != '') {
      // console.log('result["data"]->', result["data"]);
      const userIds = this.MoviesList.map(item => item.user_id);
      result["data"] = result["data"].map(item => ({
        ...item,
        activeStatus: userIds.includes(item.user_id) ? 1 : 0
      }));
      // console.log('result["data"]==============>',result["data"]);
      this.filtered = result["data"];
    } else {
      this.filtered = [];
    }
  }

  async applyFilter(filterValue: string) {
    // console.log(filterValue, "value");
    this.search = filterValue.trim();
    this.getAgentList();
  }

  // MoviesList = [
  //   'The Far Side of the World',
  //   'Morituri',
  //   'Napoleon Dynamite',
  //   'Pulp Fiction',
  // ];


  async add(data:any){
    // console.log('add------->',data);
    let addDataObjInNearBy = {
      id:data.id,
      fullname:data.fullname,
      email:data.email,
    }
    // console.log('addDataObjInNearBy------->',addDataObjInNearBy);
    if (this.MoviesList.length < 4) {
      let result = await this.http.post(this.apiUrl.url.addNearbyAgent,{agentData: addDataObjInNearBy});
      this.searchControl.reset();
      this.filtered = [];
      this.getNearByAgent() 
      this.toastr.success('Agent Added Successfully!', '', { timeOut: 2000 });
    }else{
      this.toastr.info('You can add only up to 4 agents.', '', { timeOut: 2000 });
    }
  }

  async onDrop(event: CdkDragDrop<string[]>) {
    // console.log('event-------------->', event);
    this.drop(event);
  }

  public drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    this.updateNearBy(event.container.data);
    // console.log(event.container.data);
    // console.log(event.previousContainer.data);
  }

  async updateNearBy(data: any) {
    try {
      if (data.length) {
        let updatedata = JSON.parse(JSON.stringify(data));
        updatedata.forEach((item: any, index) => {
          item.s_no = index + 1;
        });
        // console.log('new', updatedata);
        let result = await this.http.post(this.apiUrl.url.updateNearbyAgent, { agentsData: updatedata });
        if (result.status) {
          this.toastr.success('Update successfully!', '', { timeOut: 2000 });
        }
        // console.log('result-------------_>', result);
      }
    } catch (error) {
      console.log('updateNearBy error------------->', error);
    }
  }

  async deleteNearBy(id:any){
    console.log('deleteNearBy----->',id);
    let result = await this.http.post(this.apiUrl.url.deleteNearbyAgent,{id: id});
    if (result.status) {
      this.toastr.info('Deleted successfully!', '', { timeOut: 2000 });
      this.getNearByAgent()
      this.searchControl.reset();
      this.filtered = [];
    }    
  }

  // reset(){
  //   this.searchControl.reset();
  //   this.filtered = [];
  // }

}