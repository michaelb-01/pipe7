import { Component, OnInit, ViewChild } from '@angular/core';

import { SidenavService }     from './sidenav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('sidenavRight') public sidenav: MatSidenav;

  title = 'app';
  // chats: Chat[];

  constructor(private sidenavService: SidenavService) {}

  ngOnInit() {
    // Chats.find({}).subscribe((chats: Chat[]) => {
    //   this.chats = chats;
    // });

    this.sidenavService.setSidenav(this.sidenav);
  }

  sidenavRightToggle() {
    this.sidenavService.toggleSidenavRight();
  }
}
