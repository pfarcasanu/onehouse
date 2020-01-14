import React from "react";
import "rbx/index.css";
import { Container, Message, Delete, Table ,Button, Column} from "rbx";
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
          <Table.Heading colSpan="3">
            Quantity
          </Table.Heading>
          <Table.Heading>
            
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
                <Table.Cell className="thin-col">
                  <Button size="small" onClick={()=>updateItemNumber(data.id,data.quantity,-1)}>
                    -
                  </Button>
                </Table.Cell>
                <Table.Cell className="thin-col"
                  >{data.quantity}</Table.Cell>
                <Table.Cell className="thin-col">
                  <Button size="small" onClick={()=>updateItemNumber(data.id,data.quantity,1)}>
                    +
                  </Button>
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
