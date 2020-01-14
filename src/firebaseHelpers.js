import firebase from 'firebase/app';
import 'firebase/database';
import firebaseConfig from './Config.js';

firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref();

const saveItem = ({ name, creator }) => {
  const id = generateUUID();
  const itemAttrs = { id, active: true, creator,quantity:1};
  console.log(name);
  console.log(creator);
  db.child('items').child(id).set(Object.assign({name}, itemAttrs))
    .catch(error => alert(error));
};

const deleteItem = id => {
  console.log(id)
  db.child('items').child(id).update({active: false})
    .catch(error => alert(error));
};
const S4 = () =>{
  return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  };
// https://stackoverflow.com/a/38872723
const generateUUID = () => {
  return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}
const updateItemNumber=(id,number, incr)=>{
  db.child('items').child(id).update({quantity:number+incr})
    .catch(error => alert(error));

}
export {
  saveItem,
  deleteItem,
  db,
  updateItemNumber
}
