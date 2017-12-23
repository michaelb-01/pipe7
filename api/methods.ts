import { site, jobStructure, shotStructure } from "./settings";
//import mkdirp = require('mkdirp');
import * as mkdirp from 'mkdirp';
import fs = require('fs');

//import * as path from 'path';
const path = require('path');
var cp = require("child_process");

import { Jobs } from "./server/collections/jobs";
import { Entities } from './server/collections/entities';

function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
    return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
  }).replace(/\s+/g, '');
}

function createFolder(path) {
  mkdirp(path, function (err) {
      if (err) {
        console.error(err)
      }
      //else { console.log('success'); }
  });
}

function deleteFolderRecursive(path) {
  if( fs.existsSync(path) ) {
    fs.readdirSync(path).forEach(function(file,index){
      var curPath = path + "/" + file;
      if(fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
}

function buildDir(folder,parentFolder) {
  for (var key in folder) {
    //console.log('created directory: ' + parentFolder + key);
    mkdirp(parentFolder + key, function (err) {
        if (err) {
          console.error(err)
        }
        //else { console.log('success'); }
    });
  
    if (typeof folder[key] == "object") {
      buildDir(folder[key],parentFolder+key+'/');
    }
  }
}

function createShots(job,numShots) {
  let shotPath = job.path + '3d/shots/';

  for (var i = 1; i <= numShots; i++) {
    let name = 'sh' + pad(i,3) + '0';
    let path = shotPath + name;

    let entity = {
      '_id': new Mongo.ObjectID(),
      'job': {
        'jobId': job._id._str,
        'jobName': job.name
      },
      'name': name,
      'type': 'shot',
      'status': 'Not Started',
      'todos':[],
      //'thumbUrl': '../assets/img/' + thumb + '_sprites.jpg',
      //'media': '../assets/video/' + thumb + '.mov',
      'path': path,
      'public': true
    }

    // insert in database
    createEntity(entity);

    // make shot directory
    mkdirp(shotPath + name);

    // build shot structure 
    buildDir(shotStructure,path+'/');
  }
}


Meteor.methods({
  // createJob(job,numShots,db) {
  //   let name = job.client + '_' + job.name;
  //   let root = path.join(site.root, site.projects, job.client, name) + '/';

  //   if (db) {
  //     job._id = new Mongo.ObjectID();
  //     Jobs.insert(job);
  //   }

  //   buildDir(jobStructure, root);
  //   buildShots(root,numShots);
  // },

  createJob(job,numShots) {
    if (!('_id' in job)) {
      job._id = new Mongo.ObjectID();
    }

    Jobs.insert(job);

    buildDir(jobStructure, job.path);
    //createShots(job.path,numShots);

    let shotPath = job.path + '3d/shots/';

    for (var i = 1; i <= numShots; i++) {
      let name = 'sh' + pad(i,3) + '0';
      let path = shotPath + name;

      let entity = {
        '_id': new Mongo.ObjectID(),
        'job': {
          'jobId': job._id._str,
          'jobName': job.name
        },
        'name': name,
        'type': 'shot',
        'status': 'Not Started',
        'todos':[],
        //'thumbUrl': '../assets/img/' + thumb + '_sprites.jpg',
        //'media': '../assets/video/' + thumb + '.mov',
        'path': path,
        'public': true
      }

      Entities.insert(entity);
      //createFolder(entity.path);
      buildDir(shotStructure, entity.path);
    }

    return 'hello';
  },

  createEntity(entity) {
    if (!('_id' in entity)) {
      entity._id = new Mongo.ObjectID();
    }

    // using update/upsert so documents with the same name cannot be create

    Entities.update(
       { '$and': [ { "job.jobId":entity.job.jobId }, { name: entity.name }]},
       entity,
       { upsert: true }
    )

    //Entities.insert(entity);
    //createFolder(entity.path);
    buildDir(shotStructure, entity.path);
  },

  deleteEntity(entity) {
    Entities.remove( {"_id": entity._id});

    deleteFolderRecursive(entity.path);
  },

  createAsset(jobName, jobClient, assetName) {
    let jobFolder = jobClient + '_' + jobName;
    let path = site.root + '/' + site.projects + '/' + jobClient + '/' + jobFolder + '/3d/assets/' + assetName;
    //let path = path.join(site.root, site.projects, jobClient, jobFolder) + '/3d/assets/' + assetName;

    createFolder(path);
    buildDir(shotStructure, path+'/');
  },

  createTask(jobName, jobClient, assetName, taskName) {
    let jobFolder = jobClient + '_' + jobName;
    let path = site.root + '/' + site.projects + '/' + jobClient + '/' + jobFolder + '/3d/assets/' + assetName;
    //let path = path.join(site.root, site.projects, jobClient, jobFolder) + '/3d/assets/' + assetName;

    createFolder(path);
    buildDir(shotStructure, path+'/');
  },

  openMaya() {
    console.log('open maya');
    //cp.exec("open -a /Applications/Autodesk/maya2017/Maya.app"); // notice this without a callback..
    cp.exec('open -n "/Applications/Houdini/Houdini16.5.268/Houdini FX 16.5.268.app"');
  }

});

function pad(num, size) {
    var s = "000000000" + num;
    return s.substr(s.length-size);
}