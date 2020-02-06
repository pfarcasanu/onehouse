import React, { useState, useEffect } from "react";
import { Delete, Table, Button, Box, Heading, Input } from "rbx";
import { deleteItem, updateItemNumber } from "./firebaseHelpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
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

  const handleNoteChange = (event, data) => {
    if (data && house) {
      updatingNotes(house, data, event.target.value);
    }
  };

  const buttonColor = item =>
    selectedState.selected.includes(item) ? "primary" : null;

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
            <Table.Heading>Notes</Table.Heading>
            <Table.Heading></Table.Heading>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {items.map(data => (
            <Table.Row 
              key={data.productName}
            >
              <Table.Cell>
                <Button
                  onClick={() => selectedState.toggle(data)}
                  color={buttonColor(data)}
                  disabled={getTotalQuantity(data.neededBy) === 0}
                >
                  <FontAwesomeIcon icon={faCartPlus} />
                </Button>
              </Table.Cell>
              <Table.Cell>
                {data.productName} ({data.unit})
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
                  onClick={() => updateItemNumber(user, data, -1, house)}
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
                  onClick={() => updateItemNumber(user, data, 1, house)}
                >
                  +
                </Button>
              </Table.Cell>
              <Table.Cell>
                <div className="center">
                  <Input
                    size="small"
                    onBlur={e => handleNoteChange(e, data)}
                    defaultValue={data.notes}
                  />
                </div>
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
