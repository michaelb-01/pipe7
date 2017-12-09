import { Component, OnInit } from '@angular/core';
import { Entity } from '../../../api/server/models/entity';

@Component({
  selector: 'app-entity-form',
  templateUrl: './entity-form.component.html',
  styleUrls: ['./entity-form.component.scss']
})
export class EntityFormComponent implements OnInit {
  entity = new Entity();

  constructor() { }

  ngOnInit() {
    console.log(this.entity);
  }

  updateEntity(entity) {
    console.log(entity);
    this.entity = entity;
  }

}
