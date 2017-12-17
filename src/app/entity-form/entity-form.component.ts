import { Component, OnInit } from '@angular/core';
import { Entity } from '../../../api/server/models/entity';

@Component({
  selector: 'app-entity-form',
  templateUrl: './entity-form.component.html',
  styleUrls: ['./entity-form.component.scss']
})
export class EntityFormComponent implements OnInit {
  entity = new Entity();

  statuses = [
    {value: 'notStarted', viewValue: 'Not Started'},
    {value: 'active', viewValue: 'Active'},
    {value: 'pendingFeedback', viewValue: 'Pending Feedback'},
    {value: 'complete', viewValue: 'Complete'},
  ]

  // _id?: Mongo.ObjectID;
  // job: {
  //   jobId: string,
  //   jobName: string
  // };
  // name: string;
  // type: string;
  // tasks: any[];
  // status: string;
  // thumbUrl?: string;
  // description?: string;
  // todos?: any[];  
  // path?: string;
  // public: boolean;

  constructor() { }

  ngOnInit() {
    console.log(this.entity);
  }

  updateEntity(entity) {
    console.log(entity);
    this.entity = entity;
  }

  updateJob(job) {
    console.log(job);
    this.entity.job.jobId = job._id._str; 
    this.entity.job.jobName = job.name;
  }

}
