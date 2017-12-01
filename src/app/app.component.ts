import { Component, OnInit } from '@angular/core';
// import { Chats } from '../../api/server/collections';
// import { Chat } from '../../api/server/models';

import {FormControl, Validators} from '@angular/forms';

import { MeteorObservable } from 'meteor-rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  // chats: Chat[];

  constructor() {}

  ngOnInit() {
    // Chats.find({}).subscribe((chats: Chat[]) => {
    //   this.chats = chats;
    // });
  }

  createJob(name) {
    console.log('create job');
    console.log(name);

    MeteorObservable.call('createJob', name).subscribe({
      error: (e: Error) => {
        if (e) {
          console.log(e);
        }
      }
    });
  }
}
