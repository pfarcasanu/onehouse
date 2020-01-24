import React from "react";
import { Checkbox, Delete, Table, Button, Box } from "rbx";
import { deleteItem, updateItemNumber } from './firebaseHelpers';

const ItemList = ({ items, user, selectedState, house }) => {
  if (items.length === 0) {
    return (<React.Fragment></React.Fragment>);
  }
  return (
    <Box>
      <Table fullwidth hoverable>
        <Table.Head>
          <Table.Row>
            <Table.Heading>
            </Table.Heading>
            <Table.Heading>
              Product (unit)
            </Table.Heading>
            <Table.Heading>
              Needed by (quantity)
            </Table.Heading>
            <Table.Heading colSpan="3">
              Quantity
            </Table.Heading>
            <Table.Heading>

            </Table.Heading>
          </Table.Row>
        </Table.Head>
        <Table.Body >
          {items.map(data =>
              <Table.Row key={data.productName}>
                <Table.Cell>
                  <Checkbox onClick={() => selectedState.toggle(data)}/>
                </Table.Cell>
                <Table.Cell>
                  {data.productName} ({data.unit})
                </Table.Cell>
                <Table.Cell>
                  {!!data.neededBy ? Object.values(data.neededBy).map(person => (
                    <React.Fragment key={`${data.productName}-${person.name}`}>
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
                  <Delete as="button" onClick={() => deleteItem(data.productName, house)}/>
                </Table.Cell>
              </Table.Row>)
          } 
        </Table.Body>
      </Table>
    </Box>
  );
}

export default ItemList;
