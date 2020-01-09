import firebase from 'firebase/app';
import 'firebase/database';
import firebaseConfig from './Config.js';

firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref();

const saveItem = item => {
  db.child('items').child(generateUUID()).set(Object.assign(item, { active: true, creator: 'Bob' }))
    .catch(error => alert(error));
};

const deleteItem = id => {
  db.child('items').child(id).update({active: false})
    .catch(error => alert(error));
};

// https://stackoverflow.com/a/38872723
const generateUUID = () => {
  return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
}

export {
  saveItem,
  deleteItem,
  db
}