import firebase from 'firebase/app';
import 'firebase/database';
import firebaseConfig from './Config.js';

firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref();

const saveItem = ({ name, creator, unit }) => {
  const id = generateUUID();
  const itemAttrs = { 
    id,
    active: true,
    productName: name,
    unit,
    neededBy: [
      {
        name: creator,
        quantity: 1
      }
    ]};
  console.log(name);
  console.log(creator);
  db.child('items').child(id).set(itemAttrs)
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

const updateItemNumber = (personName, data, incr) => {
  if (data.neededBy === undefined) {
    data.neededBy = [];
  }
  const entryIndex = Object.values(data.neededBy).findIndex(person => person.name === personName);
  if (entryIndex === -1) {
    if (incr > 0) {
      db.child('items').child(data.id).update(
        {
          neededBy: [
            ...Object.values(data.neededBy),
            {
              name: personName,
              quantity: 1
            }
          ]
        }
      )
      .catch(error => alert(error));
    }
  } else {
    const updatedQty = Math.max(0, Object.values(data.neededBy)[entryIndex].quantity + incr);
    let newNeededBy = Object.values(data.neededBy);
    newNeededBy.splice(entryIndex, 1);
    newNeededBy.push({
      name: personName,
      quantity: updatedQty
    });
    if (updatedQty > 0) {
      db.child('items').child(data.id).update(
        {
          neededBy: newNeededBy
        }
      )
      .catch(error => alert(error));
    } else if (updatedQty === 0) {
      newNeededBy.pop();
      db.child('items').child(data.id).update(
        {
          neededBy: newNeededBy
        }
      )
    }
  }
}
export {
  saveItem,
  deleteItem,
  db,
  updateItemNumber
}
