import React from "react";
import "rbx/index.css";
import { Container, Message, Delete, Table } from "rbx";
import {deleteItem} from './firebaseHelpers';

const ItemList = (prop) => {
    const dummy_data = prop.items;
    return (
      <Table fullwidth>
        <Table.Head>
          <Table.Heading>
            Item Name
          </Table.Heading>
          <Table.Heading>
              Creator
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
                    <Delete as="button" onClick={() => deleteItem(data.id)}/>
                </Table.Cell>
              </Table.Row>)
          } 
        </Table.Body>
      </Table>
        
    )
}

export default ItemList;
