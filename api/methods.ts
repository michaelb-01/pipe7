import { site, job } from "./settings";

import mkdirp = require('mkdirp');

function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
    return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
  }).replace(/\s+/g, '');
}

function buildDir(obj,parent) {
  for (var key in obj) {
    console.log('created director: ' + parent + key);
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

Meteor.methods({
  createJob(name) {
    console.log('create job!!');
    console.log(site.root);
    console.log(name);
    
    buildDir(job,site.root+site.projects+name+'/');

  }
});