import React, { useState, useEffect } from "react";
import "rbx/index.css";
import "./App.css";
import firebase from "firebase/app";
import "firebase/database";
import ListPage from "./ListPage";
import HouseOptions from "./HouseOptions";
import Banner from "./Banner";
import { db, createUser } from "./firebaseHelpers";
import { Block, Box, Heading} from "rbx";

const createItemList = (dbData, house) => {
  let items = dbData.houses[house].items;
  items = items ? Object.values(items) : [];
  return items.filter(item => item.active);
};

function App() {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);
  const [house, setHouse] = useState(null);
  const [housesData, setHousesData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  useEffect(() => {
    const handleData = snap => {
      if (snap.val()) {
        setHousesData(Object.values(snap.val())[0]);
        setUsersData(Object.values(snap.val())[2]);
        if (house) {
          if (snap.val().houses[house] !== undefined) {
            setItems(createItemList(snap.val(), house));
          } else {
            alert("wrong house name");
            setHouse("");
          }
        }
      }
    };
    db.on("value", handleData, error => alert(error));
    return () => {
      db.off("value", handleData);
    };
  }, [house]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);
    if (user) {
      createUser(user);
    }
  }, [user]);
  return (
    <div className="App">
      <Banner user={user} house={house} />
      <Block/>
      <HouseOptions house={house} setHouse={setHouse} user={user} housesData={housesData} usersData={usersData} />
      <ListPage propItems={items} user={user} house={house} />
    </div>
  );
}

export default App;
