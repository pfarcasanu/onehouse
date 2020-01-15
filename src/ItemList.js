import React, { useState } from "react";
import { Container, Message, Delete, Table ,Button, Column} from "rbx";
import {deleteItem,updateItemNumber} from './firebaseHelpers';

const ItemList = ({ items, user, shopMode, selectedState }) => {
    const buttonColor = selected => (selected ? 'success' : null);
    return (
      <Table fullwidth hoverable>
        <Table.Head>
          <Table.Row>
            <Table.Heading>
              Product Name
            </Table.Heading>
            <Table.Heading>
              Unit
            </Table.Heading>
            <Table.Heading>
              Needed by
            </Table.Heading>
            <Table.Heading colSpan="3">
              Quantity
            </Table.Heading>
            <Table.Heading>

            </Table.Heading>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {items.map(data =>
              <Table.Row key={data.id}>
                <Table.Cell>
                  {data.productName}
                </Table.Cell>
                <Table.Cell>
                  {data.unit}
                </Table.Cell>
                <Table.Cell>
                  {Object.values(data.neededBy).map(person => (
                    <React.Fragment key={`${data.id}-${person.name}`}>
                      {person.name} ({person.quantity})
                      <br />
                    </React.Fragment>
                  ))}
                </Table.Cell>
                <Table.Cell className="thin-col">
                  <Button size="small" onClick={()=>updateItemNumber(user.displayName,data,-1)}>
                    -
                  </Button>
                </Table.Cell>
                <Table.Cell className="thin-col"
                  >{Object.values(data.neededBy).reduce((total, person) => (
                    total + person.quantity
                  ), 0)}</Table.Cell>
                <Table.Cell className="thin-col">
                  <Button size="small" onClick={()=>updateItemNumber(user.displayName,data,1)}>
                    +
                  </Button>
                </Table.Cell>
                <Table.Cell className="align-right">
                  {
                    shopMode ? 
                    <Button onClick={() => selectedState.toggle(data.id)}
                    color={buttonColor(selectedState.selected.includes(data.id))}
                    >
                      Purchase
                    </Button>
                    : <Delete as="button" onClick={() => deleteItem(data.id)}/>
                  }
                </Table.Cell>
              </Table.Row>)
          } 
        </Table.Body>
      </Table>
    )
}

export default ItemList;
