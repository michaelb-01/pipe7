import { Component, OnInit } from '@angular/core';

import { MeteorObservable } from 'meteor-rxjs';

@Component({
  selector: 'app-sidebar-right',
  templateUrl: './sidebar-right.component.html',
  styleUrls: ['./sidebar-right.component.scss']
})
export class SidebarRightComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSubmit(name) {
    console.log('create job');
    console.log(name);

    return;

    MeteorObservable.call('createJob', name).subscribe({
      error: (e: Error) => {
        if (e) {
          console.log(e);
        }
      }
    });
  }
}
