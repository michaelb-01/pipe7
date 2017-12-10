import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';
import { MeteorObservable } from 'meteor-rxjs';

import { Entity } from "../../../api/server/models/entity";
import { Entities } from "../../../api/server/collections/entities";

@Component({
  selector: 'app-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.scss']
})
export class EntityComponent implements OnInit {
  paramsSub: Subscription;

  entitySub: Subscription;
  entityId: string;
  entity: Entity;

  taskType: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.paramsSub = this.route.params
      .subscribe(params => {
        this.entityId = params['entityId'];
        this.taskType = params['taskType'];

        if (this.entitySub) {
          this.entitySub.unsubscribe();
        }

        this.entitySub = MeteorObservable.subscribe('entities').subscribe(() => {
          MeteorObservable.autorun().subscribe(() => {
            this.entity = Entities.findOne(new Mongo.ObjectID(this.entityId));
          });
        });
      });

      if (!this.entityId) {
        console.log('entity id not found');
      } 
  }
}
