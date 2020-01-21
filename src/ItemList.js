import React, { useState } from "react";
import { Checkbox, Message, Delete, Table ,Button, Column} from "rbx";
import {deleteItem,updateItemNumber} from './firebaseHelpers';

const ItemList = ({ items, user, shopMode, selectedState, house }) => {
    const buttonColor = selected => (selected ? 'info' : null);
    return (
      <Table fullwidth hoverable>
        <Table.Head>
          <Table.Row>
            <Table.Heading>
            </Table.Heading>
            <Table.Heading>
              Product
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
              <Table.Row active key={data.id}>
                <Table.Cell>
                  <Checkbox
                    onClick={() => selectedState.toggle(data.id)}
                  />
                </Table.Cell>
                <Table.Cell>
                  {data.productName} ({data.unit})
                </Table.Cell>
                <Table.Cell>
                  {!!data.neededBy ? Object.values(data.neededBy).map(person => (
                    <React.Fragment key={`${data.id}-${person.name}`}>
                      {person.name} ({person.quantity})
                      <br />
                    </React.Fragment>
                  )) : ""}
                </Table.Cell>
                <Table.Cell className="thin-col">
                  <Button 
                    disabled={!data.neededBy}
                    size="small"
                    onClick={()=>updateItemNumber(user.displayName, data, -1, house)}>
                    -
                  </Button>
                </Table.Cell>
                <Table.Cell className="thin-col"
                  >{!!data.neededBy ? Object.values(data.neededBy).reduce((total, person) => (
                    total + person.quantity
                  ), 0) : 0}</Table.Cell>
                <Table.Cell className="thin-col">
                  <Button size="small" onClick={()=>updateItemNumber(user.displayName, data, 1, house)}>
                    +
                  </Button>
                </Table.Cell>
                <Table.Cell className="align-right">
                  <Delete as="button" onClick={() => deleteItem(data.id, house)}/>
                </Table.Cell>
              </Table.Row>)
          } 
        </Table.Body>
      </Table>
    )
}

export default ItemList;
