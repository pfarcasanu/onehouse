import React, { useState, useEffect } from 'react';
import "rbx/index.css";
import './App.css';
import firebase from 'firebase/app';
import 'firebase/database';
import ListPage from './ListPage';
import HouseOptions from './HouseOptions';
import Banner from './Banner';
import { db, createUser } from './firebaseHelpers';

const createItemList = (dbData, house) => {
  let items = dbData.houses[house].items;
  items = items ? Object.values(items) : [];
  return items.filter(item => item.active)
};

function App() {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);
  const [house, setHouse] = useState(null);

  useEffect(() => {
    const handleData = snap => {
      if (snap.val()) {
        if (house) {
          setItems(createItemList(snap.val(), house));
        }
      }
    };
    db.on('value', handleData, error => alert(error));
    return () => { db.off('value', handleData); };
  }, [house]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);
    if (user) {
      createUser(user);
    }
  }, [user]);

  return (
    <div className="App">
      <Banner user={user} house={house}/>
      <HouseOptions house={house} setHouse={setHouse} user={user} />
      <ListPage propItems={items} user={user} house={house} />
    </div>
  );
}

export default App;
