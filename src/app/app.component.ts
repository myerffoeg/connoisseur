import { Component, HostListener, OnInit } from '@angular/core';
import { ConnoisseurService } from './@core/services';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(public connoisseurService: ConnoisseurService) {

  }

  ngOnInit(): void {
    this.connoisseurService.initialization();
  }
}
