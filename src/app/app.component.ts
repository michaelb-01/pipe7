import { Component, OnInit, ViewChild } from '@angular/core';
import { MeteorObservable } from 'meteor-rxjs';

import { Router, NavigationEnd, Event } from '@angular/router';

import { SidenavService }     from './sidenav.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('sidenavRight') sidenavRight;

  public location = '';

  showEntityForm = false;
  tooltip = 'Create Job';

  constructor(private sidenavService: SidenavService,
              private router: Router) {
    this.router.events.filter((event) => event instanceof NavigationEnd)
                      .subscribe((val: NavigationEnd)=>{
                        if (val.url.indexOf('/job/') > -1 || val.url.indexOf('/entity/') > -1) {
                          this.tooltip = 'Create Entity';
                        }
                        else {
                          this.tooltip = 'Create Job';
                        }
                      })
  }

  ngOnInit() {
    this.sidenavService.setSidenav(this.sidenavRight);
  }

  sidenavRightToggle() {
    this.sidenavService.toggleSidenavRight();
  }

  clickCreate() {
    console.log(this.router.url);
  }

  openMaya() {
    console.log('calling open maya');

    MeteorObservable.call('openMaya').subscribe({
      error: (e: Error) => {
        if (e) {
          console.log(e);
        }
      }
    });
  }
}
