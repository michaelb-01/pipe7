import { Component, OnInit, ViewChild } from '@angular/core';

import { SidenavService }     from './sidenav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('sidenavRight') sidenavRight;

  title = 'app';
  // chats: Chat[];

  constructor(private sidenavService: SidenavService) {}

  ngOnInit() {
    // Chats.find({}).subscribe((chats: Chat[]) => {
    //   this.chats = chats;
    // });

    this.sidenavService.setSidenav(this.sidenavRight);
  }

  sidenavRightToggle() {
    this.sidenavService.toggleSidenavRight();
  }
}
