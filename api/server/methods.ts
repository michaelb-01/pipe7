import { Entities } from './collections/entities';
import { Entity } from './models/entity';

function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
    return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
  }).replace(/\s+/g, '');
}

function prepTask(task) {
  let users = []

  task.users.forEach(user=>{
    users.push(user.profile.name);
  })

  task.users = users;
  task.status = camelize(task.status);

  return task;
}

Meteor.methods({
  createTask(entityId,task) {
    console.log('create task');
    console.log(task);

    task = prepTask(task);

    Entities.update({"_id":entityId },{$push : {"tasks":task}});
  },

  updateTask(entityId,task) {
    console.log('update task');
    task = prepTask(task);
    console.log(entityId);
    console.log(task);
    Entities.update({"_id":entityId, "tasks._id" : task._id},{$set : {"tasks.$" : task}})
  }
});