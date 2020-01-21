import React, { useState, useEffect } from "react";
import {
  createHouse,
  joinHouse,
  leaveHouse,
  removeDot,
  db
} from "./firebaseHelpers";
import { Button, Modal, Field, Control, Input, Label, Title } from "rbx";

const CreateHouseModal = ({ modalState, user, setHouse, housesData }) => {
  const [houseName, setHouseName] = useState("");
  const [houseKey, setHouseKey] = useState("");
  const [houseExists, setHouseExists] = useState(false);

  const handleNameChange = event => {
    setHouseName(event.target.value);

    setHouseExists(false);
  };

  const handleKeyChange = event => {
    setHouseKey(event.target.value);
  };

  const handleSubmit = () => {
    if (housesData) {
      let houses = Object.values(housesData);
      let isExist = houses.filter(x => x.houseName === houseName);
      if (isExist.length > 0) {
        alert("House name exists!")
      }
      else {
        modalState.setModalState(false);
        createHouse({ user, houseName, houseKey, setHouseExists, setHouse });
        setHouse(houseName)
      }
    }
  }

  return (
    <Modal active={modalState.modalState}>
      <Title size={3}>Create House</Title>
      <Modal.Background onClick={() => modalState.setModalState(false)} />
      <Modal.Content>
        <Field>
          <Label className="white">House Name</Label>
          <Control expanded>
            <Input size="medium" onChange={handleNameChange} />
          </Control>
          <div>
            {houseExists ? "House name already exists" : ""}
          </div>
        </Field>
        <Field>
          <Label className="white">House Key</Label>
          <Control expanded>
            <Input size="medium" onChange={handleKeyChange} />
          </Control>
        </Field>
        <Field>
          <Control>
            <Button
              size="medium"
              color="link"
              onClick={handleSubmit}
            >
              Add
            </Button>
          </Control>
        </Field>
      </Modal.Content>
    </Modal>
  );
};

const JoinHouseModal = ({ modalState, user, setHouse, housesData, usersData }) => {
  const [houseName, setHouseName] = useState("");
  const [houseKey, setHouseKey] = useState("");
  const [houseExists, setHouseExists] = useState(true);
  const [keyMatches, setKeyMatches] = useState(true);
  const handleNameChange = event => {
    setHouseName(event.target.value);
    setHouseExists(true);
  };

  const handleKeyChange = event => {
    setHouseKey(event.target.value);
  };

  const handleSubmit = () => {
    if (housesData) {
      let houses = Object.values(housesData);
      let keyMatch = houses.map(x => {
        return (x.houseKey === houseKey && x.houseName === houseName) ? 1 : -1;
      })
      if (keyMatch.includes(1)) {
        modalState.setModalState(false);
        joinHouse(user, houseName, usersData);
        setHouse(houseName);
      } else {
        alert("Incorrect key or house name")
      }
    }
  };

  return (
    <Modal active={modalState.modalState}>
      <Title size={3}>Join House</Title>
      <Modal.Background onClick={() => modalState.setModalState(false)} />
      <Modal.Content>
        <Field>
          <Label className="white">House Name</Label>
          <Control expanded>
            <Input size="medium" onChange={handleNameChange} />
          </Control>
        </Field>
        <Field>
          <Label className="white">House Key</Label>
          <Control expanded>
            <Input size="medium" onChange={handleKeyChange} />
          </Control>
          {keyMatches && houseExists ? "" : "House key is not correct"}
        </Field>
        <Field>
          <Control>
            <Button size="medium" color="link" onClick={handleSubmit}>
              Add
            </Button>
          </Control>
        </Field>
      </Modal.Content>
    </Modal>
  );
};

const getUserHouses = (dbData, user) => {
  const userData = dbData.users[removeDot(user.email)];
  if (!userData) {
    return [];
  }
  const houses = dbData.users[removeDot(user.email)].houses;
  return houses ? [...new Set(Object.values(houses))] : [];
};

const HouseOptions = ({ house, setHouse, user, housesData, usersData }) => {
  const [createModalState, setCreateModalState] = useState(false);
  const [joinModalState, setJoinModalState] = useState(false);
  const [userHouses, setUserHouses] = useState([]);
  useEffect(() => {
    const handleData = snap => {
      if (snap.val() && user) {
        setUserHouses(getUserHouses(snap.val(), user));
      }
    };
    db.on("value", handleData, error => alert(error));
    return () => {
      db.off("value", handleData);
    };
  }, [user]);

  if (user) {
    return (
      <React.Fragment>
        <CreateHouseModal
          modalState={{
            modalState: createModalState,
            setModalState: setCreateModalState
          }}
          user={user}
          setHouse={setHouse}
          housesData={housesData}
        />
        <JoinHouseModal
          modalState={{
            modalState: joinModalState,
            setModalState: setJoinModalState
          }}
          user={user}
          setHouse={setHouse}
          housesData={housesData}
          usersData={usersData}
        />
        <Button.Group align="centered">
          <Button onClick={() => setCreateModalState(true)}>
            Create House
          </Button>
          <Button onClick={() => setJoinModalState(true)}>Join House</Button>
          <Button
            onClick={() => {
              leaveHouse({ user, houseName: house });
              setHouse("");
            }}
          >
            Leave House
          </Button>
        </Button.Group>
        <Title size={5}>Your houses</Title>
        <Button.Group align="centered">
          {(userHouses)
            ? userHouses.map(houseName => (
              <Button
                onClick={() => setHouse(houseName)}
                disabled={house === houseName}
              >
                {houseName}
              </Button>
            ))
            : ""}
        </Button.Group>
      </React.Fragment>
    );
  } else {
    return <React.Fragment></React.Fragment>;
  }
};

export default HouseOptions;
