import React from "react";
import "rbx/index.css";
import { Container, Message, Delete, Table ,Button} from "rbx";
import {deleteItem,updateItemNumber} from './firebaseHelpers';

const ItemList = (prop) => {
    const dummy_data = prop.items;
    return (
      <Table fullwidth hoverable>
        <Table.Head>
          <Table.Heading>
            Name
          </Table.Heading>
          <Table.Heading>
              Creator
          </Table.Heading>
          <Table.Heading>
            quantity
          </Table.Heading>
        </Table.Head>
        <Table.Body>
          {dummy_data.map(data =>
              <Table.Row key={data.id}>
                <Table.Cell>
                  {data.name}
                </Table.Cell>
                <Table.Cell>
                    {data.creator}
                </Table.Cell>
                <Table.Cell>
                  <Table.Cell>
                    {data.quantity}
                  </Table.Cell>
                  <Table.Cell>
                    <Button onClick={()=>updateItemNumber(data.id,data.quantity)}>
                      +
                    </Button>
                  </Table.Cell>
                </Table.Cell>
                <Table.Cell>
                    <Delete as="button" onClick={() => deleteItem(data.id)}/>
                </Table.Cell>


              </Table.Row>)
          } 
        </Table.Body>
      </Table>
        
    )
}

export default ItemList;
