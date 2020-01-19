import firebase from 'firebase/app';
import 'firebase/database';
import firebaseConfig from './Config.js';

require("firebase/functions");

firebase.initializeApp(firebaseConfig);
const functions = firebase.functions();
const db = firebase.database().ref();

const removeDot = str => {
  return str.split('.').join("");
}

const saveItem = ({ name, creator, unit, houseName }) => {
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
  db.child('houses').child(houseName).child('items').child(id).set(itemAttrs)
    .catch(error => alert(error));
};

const deleteItem = ( id, houseName ) => {
  db.child('houses').child(houseName).child('items').child(id).update({active: false})
    .catch(error => alert(error));
};
const S4 = () =>{
  return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  };

// https://stackoverflow.com/a/38872723
const generateUUID = () => {
  return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

const updateItemNumber = ( personName, data, incr, houseName ) => {
  if (data.neededBy === undefined) {
    data.neededBy = [];
  }
  const entryIndex = Object.values(data.neededBy).findIndex(person => person.name === personName);
  if (entryIndex === -1) {
    if (incr > 0) {
      db.child('houses').child(houseName).child('items').child(data.id).update(
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
      db.child('houses').child(houseName).child('items').child(data.id).update(
        {
          neededBy: newNeededBy
        }
      )
      .catch(error => alert(error));
    } else if (updatedQty === 0) {
      newNeededBy.pop();
      db.child('houses').child(houseName).child('items').child(data.id).update(
        {
          neededBy: newNeededBy
        }
      )
    }
  }
};

const createHouse = ({ user, houseName, houseKey }) => {
  let dbData;
  db.once("value", function(data) {
    dbData = data.val();

    if (dbData.houses[houseName] !== undefined) {
      return -1;
    };
    const houseAttrs = { 
      houseName,
      houseKey,
      item: []
    };
    db.child('houses').child(houseName).set(houseAttrs)
      .catch(error => alert(error));
    
    // Update user houses
    let houses = dbData.users[removeDot(user.email)].houses;
    houses = houses ? Object.values(houses) : [];
    db.child('users').child(removeDot(user.email)).set({
      houses: [...houses, houseName]
    }).catch(error => alert(error));
  });
};

const joinHouse = ({ user, houseName, houseKey }) => {
  let dbData;
  db.once("value", function(data) {
    dbData = data.val();

    if (dbData.houses[houseName] === undefined) {
      return -1;
    };
    if (dbData.houses[houseName].houseKey !== houseKey) {
      return -2;
    };

    // Update user houses
    let houses = dbData.users[removeDot(user.email)].houses;
    houses = houses ? Object.values(houses) : [];
    db.child('users').child(removeDot(user.email)).update({
      houses: [...houses, houseName]
    }).catch(error => alert(error));
  });
};

const leaveHouse = ({ user, houseName }) => {
  let dbData;
  db.once("value", function(data) {
    dbData = data.val();
    let houses = dbData.users[removeDot(user.email)].houses;
    houses = houses ? Object.values(houses) : [];
    console.log(houses);
    console.log(houseName);
    db.child('users').child(removeDot(user.email)).child('houses').set(
      houses.filter( house => house !== houseName )
    ).catch(error => alert(error));
  });
};

const createUser = (user) => {
  let dbData;
  db.once("value", function(data) {
    dbData = data.val();
    if (dbData.users[removeDot(user.email)] === undefined) {
      db.child('users').child(removeDot(user.email)).set({
        houses: [],
        email: removeDot(user.email)
      }).catch(error => alert(error));
    }
  });
};

export {
  functions,
  saveItem,
  deleteItem,
  db,
  updateItemNumber,
  createHouse,
  joinHouse,
  leaveHouse,
  createUser,
  removeDot
}
