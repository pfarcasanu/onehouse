import React, { useState, useEffect} from 'react';
import { Container, Button, Input, Box, Column, Delete, Field, Control } from "rbx";
import { ColumnGroup } from 'rbx/grid/columns/column-group';
import ItemList from './ItemList';
import {saveItem} from './firebaseHelpers';

const ListPage = ({propItems}) => {

  const [items, setItems] = useState(propItems);
  const [userInput, setUserInput] = useState("");

  const handleChange = (event) => {
    setUserInput(event.target.value);
  }

  const handleSubmit = () => {
    saveItem({name: userInput});
  }

  return (
    <Container>
        <ColumnGroup>
            <Column size="half" offset="one-quarter">
                <Box>
                <ItemList items={propItems}></ItemList>
                </Box>
                <Field kind="addons">
                    <Control>
                        <Input placeholder="eggs" onChange={handleChange}/>
                    </Control>
                    <Control>
                        <Button color="info" onClick={handleSubmit}>Add</Button>
                    </Control>
                </Field>
            </Column>
        </ColumnGroup>
    </Container>
  )
}

export default ListPage;