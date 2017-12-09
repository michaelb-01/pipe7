import { Jobs } from './collections/jobs';
import { Job } from "./models/job";

import { Entities } from './collections/entities';
import { Entity } from "./models/entity";

import { Users } from './collections/users';

import { Accounts } from 'meteor/accounts-base';

import { MeteorObservable } from 'meteor-rxjs';

declare var Fake: any;

const users = ['Mike Battcock', 'Mike Skrgatic', 'James Allen', 'Ben Cantor', 'Sam Osbourne'];
const types = ['asset','shot'];
const thumbs = ['audi','audi_breakdown','bmw','dust_01','flip','frames','kittiwakes','liquid','nike','test','vw'];

export function createUsers() {
  if (Users.collection.find().count() === 0) {
    console.log('load default users');
    for (var i = 0; i < users.length; i++) {

      Accounts.createUser({
        email: users[i].replace(" ", "_").toLowerCase() + '@time-based-arts.com',
        password: 'password',
        profile: {
          name: users[i],
        }
      });

      console.log('Added ' + users[i] + ' as a User');
    }
  }
}

function createEntity(jobId, jobName, jobClient, type) {
  console.log('running createEntity');

  var assets = '/Users/michaelbattcock/Documents/dev/apps/pipe4/src/assets/';

  var taskTypes = ['fx','model','light','comp','texture','track'];
  var tasks = [];

  var statusTypes = ['active', 'notStarted', 'pendingFeedback', 'complete'];

  for (var i=0;i<Math.floor(Math.random() * taskTypes.length);i++) {
    var taskUsers = [];
    for (var j=0;j<Math.floor(users.length);j++) {
      if (Math.random() > 0.5) {
        taskUsers.push(users[j]); 
      }
    }
    tasks.push({
      "_id": new Mongo.ObjectID(),
      "type": taskTypes[i],
      "users": taskUsers,
      "dueDate": new Date(),
      'status': statusTypes[Math.floor((Math.random() * statusTypes.length))]
    });
  }

  var entityId = new Mongo.ObjectID();

  var name = Fake.sentence(1);

  console.log('Adding ' + name + ' to ' + jobName);

  let thumb = thumbs[Math.floor((Math.random() * thumbs.length))];

  var entity = {
    '_id': entityId,
    'job': {
      'jobId': jobId,
      'jobName': jobName
    },
    'name': name,
    'type': type,
    'tasks': tasks,
    'status': statusTypes[Math.floor((Math.random() * statusTypes.length))],
    'todos':[],
    'thumbUrl': '../assets/img/' + thumb + '_sprites.jpg',
    'media': '../assets/video/' + thumb + '.mov',
    'description': Fake.sentence(7),
    'public': true
  }

  console.log('create ' + entity.type + ' entity in ' + jobName);

  Entities.insert(entity);

  var action = {
    'author':{
      'id':'',
      'name':'Mike Battcock'
    },
    'meta':{
      'name':name,
      'type':'entity',
      'jobId':jobId
    },
    'date': new Date,
    'public': true
  };

  // create asset on disk
  MeteorObservable.call('createAsset', jobName, jobClient, name).subscribe({
    error: (e: Error) => {
      if (e) {
        console.log(e);
      }
    }
  });


  //Activity.insert(action);

  // random integer between 1 and 10
  var numVersions = Math.floor((Math.random() * 10) + 1);

  // create entities in job
  for (var i = 0; i < numVersions; i++) {
    //createVersion(jobId, jobName, entityId.valueOf(), entity.name);
  }
} 

export function createJobs() {
  // check if jobs are already in the database
  if (Jobs.find({}).cursor.count() > 0) {
    console.log('found jobs already in database');
    return;
  }

  console.log('running createJobs');

  const jobs: Job[] = [];

  // create fake jobs
  let job = new Job();

  job.name = 'Sneakerboots';
  job.client = 'Nike';
  job.agency = 'More and More';
  job.thumbUrl = '../assets/img/frames_sprites.jpg';
  job.public = true;

  jobs.push(job);

  let job2 = new Job();

  job2.name = 'Service';
  job2.client = 'Audi';
  job2.agency = 'Radical';
  job2.thumbUrl = '../assets/img/audi_sprites.jpg';
  job2.public = true;

  jobs.push(job2);

  let jobId = '';

  let numShots = 10;
  let numAssets = 5;


  // iterate over jobs array and insert the jobs
  for (var i = 0; i < jobs.length; i++) {
    let objectId = new Mongo.ObjectID();

    jobs[i]._id = objectId; // remove valueOf() for mongo style id generation

    this.jobId = Jobs.insert(jobs[i]);

    console.log('Adding ' + jobs[i].name);

    // random integer between 10 and 20
    //numEntities = Math.floor((Math.random() * 10) + 10);


    // create job on disk
    MeteorObservable.call('createJob', jobs[i], numShots, false).subscribe({
      error: (e: Error) => {
        if (e) {
          console.log(e);
        }
      }
    });

    // create assets in job
    for (var j = 0; j < numAssets; j++) {
      createEntity(objectId.valueOf(), jobs[i].name, jobs[i].client, 'asset');
    }
    for (var j = 0; j < numShots; j++) {
      createEntity(objectId.valueOf(), jobs[i].name, jobs[i].client, 'shot');
    }
  }
}