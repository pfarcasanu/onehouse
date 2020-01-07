import React, { Component, useState } from 'react';
import "rbx/index.css";
import { Container, Notification } from "rbx";

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
            Hello World
        </Container>
    )
}

export default ListPage;