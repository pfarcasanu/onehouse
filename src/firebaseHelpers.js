import firebase from 'firebase/app';
import 'firebase/database';
import firebaseConfig from './Config.js';

firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref();

const saveItem = item => {
  db.child('items').child(item.id).set(Object.assign(item, { active: true }))
    .catch(error => alert(error));
};

const deleteItem = id => {
  db.child('items').child(id).update({active: false})
    .catch(error => alert(error));
};

export {
  saveItem,
  deleteItem,
  db,
}