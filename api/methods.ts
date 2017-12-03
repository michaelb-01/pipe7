import { site, jobStructure, shotStructure } from "./settings";
import mkdirp = require('mkdirp');
import * as path from 'path';

import { Jobs } from "./server/collections/jobs";

function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
    return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
  }).replace(/\s+/g, '');
}

function buildDir(obj,parent) {
  for (var key in obj) {
    console.log('created directory: ' + parent + key);
    mkdirp(parent + key, function (err) {
        if (err) {
          console.error(err)
        }
        //else { console.log('success'); }
    });
  
    if (typeof obj[key] == "object") {
      buildDir(obj[key],parent+key+'/');
    }
  }
}

function buildShots(root,numShots) {
  console.log('root:');
  console.log(root);

  const shotPath = root + '3d/shots/';

  console.log(shotPath);

  for (var i = 1; i <= numShots; i++) {
    let name = 'sh' + pad(i,3) + '0';
    let path = shotPath + name;

    // make shot directory
    mkdirp(shotPath + name);

    // build shot structure 
    buildDir(shotStructure,path+'/');
  }
}


Meteor.methods({
  createJob(job,numShots) {
    let name = job.client + '_' + job.name;
    let root = path.join(site.root, site.projects, job.client, name) + '/';

    job._id = new Mongo.ObjectID();

    Jobs.insert(job);
    
    buildDir(jobStructure, root);
    
    buildShots(root,numShots);
  }
});

function pad(num, size) {
    var s = "000000000" + num;
    return s.substr(s.length-size);
}