import { Job } from './models/job';
import { Jobs } from './collections/jobs';

import { Entity } from './models/entity';
import { Entities } from './collections/entities';

import { User } from './models/user';
import { Users } from './collections/users';
 
Meteor.publish('jobs', function(): Mongo.Cursor<Job> { 
  return Jobs.collection.find({}, {

  });
});

Meteor.publish('entities', function(): Mongo.Cursor<Entity> { 
  return Entities.collection.find({}, {

  });
});

Meteor.publish('users', function(): Mongo.Cursor<User> { 
  return Users.collection.find({}, {

  });
});