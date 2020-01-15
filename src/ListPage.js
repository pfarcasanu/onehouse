import React, { useState, useEffect} from 'react';
import { Container, Button, Input, Box, Column, Delete, Field, Control } from "rbx";
import { ColumnGroup } from 'rbx/grid/columns/column-group';
import ItemList from './ItemList';
import {saveItem} from './firebaseHelpers';

const ListPage = ({propItems,user}) => {

  const [items, setItems] = useState(propItems);
  const [productName, setProductName] = useState("");
  const [unit, setUnit] = useState("");

  const handleProductChange = (event) => {
    setProductName(event.target.value);
  }

  const handleUnitChange = (event) => {
    setUnit(event.target.value);
  }

  const handleSubmit = () => {
    saveItem({ name: productName, unit: unit, creator: user.displayName });
  }
  //test github
  return (
    <Container>
        <ColumnGroup>
            <Column size={10} offset={1}>
                <Box>
                <ItemList items={propItems} user={user}></ItemList>
                </Box>
                <Column size="three-fifths" offset="one-fifth">
                <Field align="centered" kind="addons">
                    <Control expanded>
                        <Input size="medium" placeholder="Eggs" onChange={handleProductChange}/>
                    </Control>
                    <Control expanded>
                        <Input size="medium" placeholder="1 dozen" onChange={handleUnitChange}/>
                    </Control>
                    <Control>
                        <Button size="medium" color="link" onClick={handleSubmit}>Add</Button>
                    </Control>
                </Field>
                </Column>
            </Column>
        </ColumnGroup>
    </Container>
  )
}

export default ListPage;
