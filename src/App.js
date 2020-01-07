import React, { useState, useEffect } from 'react';
import './App.css';
import firebase from 'firebase/app';
import 'firebase/database';
import firebaseConfig from './Config.js'
import ListPage from './ListPage'

firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref();

const testItems = [
  { name: 'bread', qty: 1 },
  { name: 'eggs', qty: 2 }
];

const saveItem = item => {
  db.child('items').child(item.id).set(Object.assign(item, { active: true }))
    .catch(error => alert(error));
};

const deleteItem = item => {
  db.child('items').child(item.id).update({active: false})
    .catch(error => alert(error));
};

const createItemList = groceryList => ([
  Object.values(groceryList.items).filter(item => item.active)
]);

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const handleData = snap => {
      if (snap.val()) setItems(createItemList(snap.val()));
    };
    db.on('value', handleData, error => alert(error));
    return () => { db.off('value', handleData); };
  }, []);

  return (
    <div className="App">
      <ListPage/>
    </div>
  );
}

export default App;
