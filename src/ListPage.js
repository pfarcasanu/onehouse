import React, { useState, useEffect} from 'react';
import { Container, Button, Input, Box, Column, Delete, Field, Control } from "rbx";
import { ColumnGroup } from 'rbx/grid/columns/column-group';
import ItemList from './ItemList';
import {saveItem} from './firebaseHelpers';

const ListPage = ({propItems,user}) => {

  const [items, setItems] = useState(propItems);
  const [userInput, setUserInput] = useState("");

  const handleChange = (event) => {
    setUserInput(event.target.value);
  }

  const handleSubmit = () => {
    saveItem({ name:userInput, creator:user.displayName });
  }
  //test github
  return (
    <Container>
        <ColumnGroup>
            <Column size={10} offset={1}>
                <Box>
                <ItemList items={propItems}></ItemList>
                </Box>
                <Column size="three-fifths" offset="one-fifth">
                <Field align="centered" kind="addons">
                    <Control expanded>
                        <Input size="medium" placeholder="Eggs" onChange={handleChange}/>
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
