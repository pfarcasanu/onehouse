import React, { Component, useState } from 'react';
import "rbx/index.css";
import { Container, Message, Button, Input, Box, Column, Delete } from "rbx";
import { ColumnGroup } from 'rbx/grid/columns/column-group';
import Banner from './Banner'

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
            <Banner/>
            <ColumnGroup>
                <Column size="half" offset="one-quarter">
                    <Box>
                        <Message>
                            <Message.Header>
                                <p>eggs</p>
                                <Delete as="button" />
                            </Message.Header>
                        </Message>
                        <Message>
                            <Message.Header>
                                <p>milk</p>
                                <Delete as="button" />
                            </Message.Header>
                        </Message>
                        <Message>
                            <Message.Header>
                                <p>bread</p>
                                <Delete as="button" />
                            </Message.Header>
                        </Message>
                    </Box>
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