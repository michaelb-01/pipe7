import { site, jobStructure, shotStructure } from "./settings";
//import mkdirp = require('mkdirp');
import * as mkdirp from 'mkdirp';
//import * as path from 'path';
const path = require('path');
var cp = require("child_process");

import { Jobs } from "./server/collections/jobs";

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

function buildShots(root,numShots) {
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
  createJob(job,numShots,db) {
    let name = job.client + '_' + job.name;
    let root = path.join(site.root, site.projects, job.client, name) + '/';

    if (db) {
      job._id = new Mongo.ObjectID();
      Jobs.insert(job);
    }

    buildDir(jobStructure, root);
    
    buildShots(root,numShots);
  },

  createAsset(jobName, jobClient, assetName) {
    let jobFolder = jobClient + '_' + jobName;
    let path = site.root + '/' + site.projects + '/' + jobClient + '/' + jobFolder + '/3d/assets/' + assetName;
    //let path = path.join(site.root, site.projects, jobClient, jobFolder) + '/3d/assets/' + assetName;

    //console.log('asset path');
    //console.log(path);

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