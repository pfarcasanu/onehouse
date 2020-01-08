import React, { useState } from 'react';
import "rbx/index.css";
import { Container, Button, Input, Box, Column, Delete, Field, Control } from "rbx";
import { ColumnGroup } from 'rbx/grid/columns/column-group';
import Banner from './Banner'
import Item from './Item'
var dummy_data = [
    {
        item : "paper towels", 
        creator: "paul"
    },
    {
        item: "chicken salad",
        creator: "phillip",
    },
    {
        item: "milk",
        creator: "brian"
    }
];

var dummy_str = JSON.stringify(dummy_data);

const ListPage = () => {

    const [items, setItems] = useState(JSON.parse(dummy_str));
    const [userInput, setUserInput] = useState("");

    const handleChange = (event) => {
        console.log("hanlded change");
        setUserInput(event.target.value);
    }

    const handleSubmit = () => {
        items.push({item: userInput, creator: "Paul"});
        console.log(items)
    }

    return (
        <Container>
            <Banner/>
            <Button onClick= {
                () => { setItems(dummy_data) }
            }>Refresh</Button>
            <Button onClick={
                () => { setItems([]) }
            }>Reset</Button>
            <ColumnGroup>
                <Column size="half" offset="one-quarter">
                    <Box>
                    <Item items={items}></Item>
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