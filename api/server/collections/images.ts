import { MongoObservable } from 'meteor-rxjs';
import { Meteor } from 'meteor/meteor';
 
import { Thumb, Image } from "../models/image";

export const Images = new MongoObservable.Collection<Image>('images');
export const Thumbs = new MongoObservable.Collection<Thumb>('thumbs');

//import { UploadFS } from 'meteor/jalik:ufs';

function loggedIn(userId) {
  //return !!userId;
  return true;
}
 
// export const ThumbsStore = new UploadFS.store.GridFS({
//   collection: Thumbs.collection,
//   name: 'thumbs',
//   permissions: new UploadFS.StorePermissions({
//     insert: loggedIn,
//     update: loggedIn,
//     remove: loggedIn
//   })
// });
 
// export const ImagesStore = new UploadFS.store.GridFS({
//   collection: Images.collection,
//   name: 'images',
//   filter: new UploadFS.Filter({
//     contentTypes: ['image/*']
//   }),
//   copyTo: [
//     ThumbsStore
//   ],
//   permissions: new UploadFS.StorePermissions({
//     insert: loggedIn,
//     update: loggedIn,
//     remove: loggedIn
//   })
// });
