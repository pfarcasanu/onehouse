import React from "react";
import "rbx/index.css";
import { Container, Message, Delete, PageLoader } from "rbx";
import {deleteItem} from './firebaseHelpers';

const ItemList = (prop) => {
    const dummy_data = prop.items;
    return (
        dummy_data.map(data =>
            <Message key={data.id}>
                <Message.Header>
                    <Container>
                      {data.name}
                    </Container>
                    <Delete as="button" onClick={() => deleteItem(data.id)}/>
                </Message.Header>
            </Message>)
    )
}

export default ItemList;