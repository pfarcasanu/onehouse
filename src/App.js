import React, { useState, useEffect } from 'react';
import "rbx/index.css";
import './App.css';
import firebase from 'firebase/app';
import 'firebase/database';
import ListPage from './ListPage'
import Banner from './Banner';
import {db} from './firebaseHelpers';

const createItemList = groceryList => (
  Object.values(groceryList.items).filter(item => item.active)
);

function App() {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleData = snap => {
      if (snap.val()) {
        setItems(createItemList(snap.val()));
      }
    };
    db.on('value', handleData, error => alert(error));
    return () => { db.off('value', handleData); };
  }, []);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);
  }, []);


  return (
    <div className="App">
      <Banner user={user}/>
      <ListPage propItems={items} user ={user}/>
    </div>
  );
}

export default App;
