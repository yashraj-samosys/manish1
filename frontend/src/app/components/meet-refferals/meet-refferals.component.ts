import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-meet-refferals',
  templateUrl: './meet-refferals.component.html',
  styleUrls: ['./meet-refferals.component.css']
})
export class MeetRefferalsComponent implements OnInit {

  constructor(private translate: TranslateService) {
   }

  ngOnInit(): void {
  }

}
