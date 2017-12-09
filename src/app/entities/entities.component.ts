import { Component, OnInit, ViewChild } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { Entities } from '../../../api/server/collections/entities';
import { Entity } from '../../../api/server/models/entity';

import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';

import { MeteorObservable } from 'meteor-rxjs';

import { SidenavService }     from '../sidenav.service';

@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.scss']
})
export class EntitiesComponent implements OnInit {
  @ViewChild('sidenavRight') sidenavRight;
  @ViewChild('taskForm') taskForm;

  paramsSub: Subscription;
  entitiesSub: Subscription;

  usersSub: Subscription;

  assets;
  shots;

  constructor(private route: ActivatedRoute,
              private sidenavService: SidenavService) { }

  ngOnInit() {
    this.paramsSub = this.route.params
      .map(params => params['jobId'])
      .subscribe(jobId => {
        if (this.entitiesSub) {
          this.entitiesSub.unsubscribe();
        }

        this.entitiesSub = MeteorObservable.subscribe('entities', jobId).subscribe(() => {
          MeteorObservable.autorun().subscribe(() => {
            this.entities = Entities.find({"job.jobId":jobId});

            this.assets = this.entities.map(entities => entities.filter(entity => entity.type == 'asset'));
            this.shots = this.entities.map(entities => entities.filter(entity => entity.type == 'shot'));


            if (!this.entities) return;
          });
        });
      });
  }

  openSidenav() {
    this.sidenavService.toggleSidenavRight();
  }

  selectTask(entity,task) {
    this.taskForm.selectTask(entity,task);
    this.sidenavRight.open();
  }

  addTask(entity) {
    this.taskForm.addTask(entity);
    this.sidenavRight.open();
  }

}
