import { Component, OnInit } from '@angular/core';

import { MdlLayoutComponent } from '@angular-mdl/core';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [MdlLayoutComponent]
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  changeTab(event) {
    console.log('Fire some event when tab is selected...');
    console.log(event);
  }
}
