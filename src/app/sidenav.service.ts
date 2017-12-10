import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Injectable()
export class SidenavService {
  public sidenavRight: MatSidenav;

  constructor() { }

  public setSidenav(sidenav) {
    this.sidenavRight = sidenav;
  }

  toggleSidenavRight() {
    return this.sidenavRight.toggle();
  }

}
