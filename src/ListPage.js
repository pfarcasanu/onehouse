import React, { Component, useState } from 'react';
import "rbx/index.css";
import { Container, Message, Button, Input, List, Column, Delete } from "rbx";
import { ColumnGroup } from 'rbx/grid/columns/column-group';

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

    const [items, setItems] = useState([]);

    return (
        <Container>
            <ColumnGroup>
                <Column size="half" offset="one-quarter">
                    <List>
                        <List.Item>
                            <Message>
                                <Message.Header>
                                    <p>eggs</p>
                                    <Delete as="button" />
                                </Message.Header>
                            </Message>
                        </List.Item>
                        <List.Item>
                            <Message>Milk</Message>
                            <Delete as="button"/>
                        </List.Item>
                        <List.Item>
                            <Message>Bread</Message>
                        </List.Item>
                    </List>
                    <Message>
                        <Input></Input>
                        <Button>Submit</Button>
                    </Message>
                </Column>
            </ColumnGroup>
        </Container>
    )
}

export default ListPage;