import { Component, OnInit, ViewChild } from '@angular/core';

import { Observable, Subscriber } from 'rxjs';
import { MeteorObservable } from 'meteor-rxjs';

import { Jobs } from '../../../api/server/collections/jobs';

import { SidenavService } from '../sidenav.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  @ViewChild('thumbnail') thumbnail:any;
  @ViewChild('sidenavRight') public sidenavRight;

  jobs;
  seekPos = -1;

  constructor(private sidenavService: SidenavService) {
    sidenavService.sidenavTriggered.subscribe(
      val => {
        this.openSidenav();
      });
  }

  ngOnInit() {
    //this.jobs = Jobs.find();

    MeteorObservable.subscribe('jobs').subscribe(() => {
      MeteorObservable.autorun().subscribe(() => {
        this.jobs = Jobs.find();

        this.jobs.forEach(job=>{
          console.log(job._id);
        })
      });
    });
  }

  mousemove(e) {
    let xPerc = e.offsetX / e.target.offsetWidth;
    this.seekPos = xPerc;

    this.thumbnail.mousemoveFromOutside(e);
  }

  test(id) {
    console.log(id);
  }

  openSidenav() {
    this.sidenavRight.open();
  }
}
