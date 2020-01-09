import React, { useState, useEffect } from 'react';
import './App.css';
import firebase from 'firebase/app';
import 'firebase/database';
import firebaseConfig from './Config.js'
import ListPage from './ListPage'
import {db} from './firebaseHelpers';

const createItemList = groceryList => (
  Object.values(groceryList.items).filter(item => item.active)
);

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const handleData = snap => {
      if (snap.val()) {
        setItems(createItemList(snap.val()));
      }
    };
    db.on('value', handleData, error => alert(error));
    return () => { db.off('value', handleData); };
  }, []);

  return (
    <div className="App">
      <ListPage propItems={items}/>
    </div>
  );
}

export default App;
