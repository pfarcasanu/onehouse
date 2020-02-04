import React, { useState, useEffect } from "react";
import { Delete, Table, Button, Box, Heading, Input, Notification } from "rbx";
import { deleteItem, updateItemNumber } from "./firebaseHelpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { updatingNotes, db } from "./firebaseHelpers";
const getTotalQuantity = neededBy => {
  if (neededBy === undefined) {
    return 0;
  }
  return Object.values(neededBy).reduce(
    (total, person) => total + person.quantity,
    0
  );
};

const ItemList = ({ items, user, selectedState, house }) => {
  const [input, setInput] = useState("");
  const [notes, setNotes] = useState([]); // just notes collection
  const [add, setAdd] = useState(false);
  const handleNoteChange = event => {
    console.log(event.target.value);
    if (event.target.value.length > 0) setAdd(true);
    setInput(event.target.value);
  };

  const handleNoteSubmit = data => {
    if (data && house) {
      updatingNotes(house, data, input);
    }
  };
  const buttonColor = item =>
    selectedState.selected.includes(item) ? "primary" : null;

  const getNotes = dbData => {
    let data = Object.values(dbData.houses).filter(
      h => h.houseName === house
    )[0];
    if (data !== undefined && data.items) {
      let arr = Object.values(data.items).map(item => {
        let arr = [];
        if (!arr.includes(item.notes)) arr.push(item.notes);
        return arr;
      });
      return arr;
    }
    //return data.items.milk.notes;
    return "";
  };
  useEffect(() => {
    const handleData = snap => {
      if (snap.val()) {
        console.log(house);
        console.log(Object.values(snap.val().houses));
        setNotes(getNotes(snap.val()));
      }
    };
    db.on("value", handleData, error => alert(error));
    return () => {
      db.off("value", handleData);
    };
  }, []);
  if (items.length === 0) {
    return <Heading>No items to show yet. Add some to get started.</Heading>;
  }
  return (
    <Box>
      <Table fullwidth hoverable>
        <Table.Head>
          <Table.Row>
            <Table.Heading></Table.Heading>
            <Table.Heading>Product (unit)</Table.Heading>
            <Table.Heading>Needed by (quantity)</Table.Heading>
            <Table.Heading colSpan="3">Quantity</Table.Heading>
            <Table.Heading></Table.Heading>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {items.map(data => (
            <Table.Row key={data.productName}>
              <Table.Cell>
                <Button
                  onClick={() => selectedState.toggle(data)}
                  color={buttonColor(data)}
                  disabled={getTotalQuantity(data.neededBy) === 0}
                >
                  <FontAwesomeIcon icon={faPlusCircle} />
                </Button>
              </Table.Cell>
              <Table.Cell>
                {data.productName} ({data.unit})<br></br>
                <Box color="success">{data.notes}</Box>
                <div className="center">
                  <Input
                    size="small"
                    onChange={handleNoteChange}
                    defaultValue={data.notes}
                  />
                  <Button
                    align
                    onClick={() => handleNoteSubmit(data)}
                    disabled={add === false}
                    size="small"
                    color="success"
                  >
                    Update
                  </Button>
                </div>
              </Table.Cell>

              <Table.Cell>
                {!!data.neededBy
                  ? Object.values(data.neededBy).map(person => (
                      <React.Fragment
                        key={`${data.productName}-${person.name}`}
                      >
                        {person.name} ({person.quantity})
                        <br />
                      </React.Fragment>
                    ))
                  : ""}
              </Table.Cell>
              <Table.Cell className="thin-col">
                <Button
                  disabled={!data.neededBy}
                  size="small"
                  onClick={() =>
                    updateItemNumber(user.displayName, data, -1, house)
                  }
                >
                  -
                </Button>
              </Table.Cell>
              <Table.Cell className="thin-col">
                {getTotalQuantity(data.neededBy)}
              </Table.Cell>
              <Table.Cell className="thin-col">
                <Button
                  size="small"
                  onClick={() =>
                    updateItemNumber(user.displayName, data, 1, house)
                  }
                >
                  +
                </Button>
              </Table.Cell>
              <Table.Cell className="align-right">
                <Delete
                  as="button"
                  onClick={() => deleteItem(data.productName, house)}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Box>
  );
};

export default ItemList;
