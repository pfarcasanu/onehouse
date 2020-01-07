import React, { Component, useState } from 'react';
import "rbx/index.css";
import { Container, Notification } from "rbx";
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
            <Banner />
        </Container>
    )
}

export default ListPage;