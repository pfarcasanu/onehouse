import React from "react";
import "rbx/index.css";
import { Container, Message, Delete, PageLoader } from "rbx";



const Item = (prop) => {
    const dummy_data = prop.items;
    return (
        dummy_data.map(data =>
            <Message key={data.creator}>
                <Message.Header>
                    <Container>
                        {data.item}
                    </Container>
                    <Delete as="button" />
                </Message.Header>
            </Message>)
    )
}

export default Item;