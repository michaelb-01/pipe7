import { Component, OnInit } from '@angular/core';
import { MeteorObservable } from 'meteor-rxjs';
import { FormControl } from '@angular/forms';

import { Job } from '../../../api/server/models/job';

import { cameras } from '../../../api/cameras';
import { site, jobStructure, shotStructure } from "../../../api/settings";

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.scss']
})
export class JobFormComponent implements OnInit {
  job = new Job();

  //fps: any = '25';
  fps = new FormControl(25);

  numShots: number = 20;

  formats = [
    {width: '1280', height: '720', name: 'HD_720'},
    {width: '1920', height: '1080', name: 'HD_1080'}
  ];

  // initialise cameras
  cameras = cameras;
  cameraBrand:string;

  cameras2 = [
    {brand: 'steak-0', names: ['Steak','asdf']},
    {brand: 'pizza-1', names: ['Pizza','wrgerqb']},
    {brand: 'tacos-2', names: ['Tacos','asdgwe']}
  ];


  frameRates = [
    24,
    25,
    30
  ];

  constructor() { }

  ngOnInit() {
  }

  onSubmit(name) {
    // create path on disk
    this.job.path = site.root +
                   site.projects + 
                   this.job.client + '/' +
                   this.job.client + '_' + this.job.name + '/';

    MeteorObservable.call('createJob', this.job, this.numShots).subscribe({
      error: (e: Error) => {
        if (e) {
          console.log(e);
        }
      }
    });
  }
  

  onChange(e) {
    console.log(e);
  }
}
