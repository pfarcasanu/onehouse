import React, { useState } from "react";
import { Container, Message, Delete, Title ,Button, Column, Modal, Box, Notification} from "rbx";
import {deleteItem,updateItemNumber} from './firebaseHelpers';


const Checkout = ({modalState, selected})=>{
    console.log(selected)
    return(
        <Modal active={modalState.modalState}>
            <Modal.Background onClick = {()=> modalState.setModalState(false)}/>
            <Modal.Content>
                <Notification color="white">
                    <Notification color="link">
                        <Title align="centered">Your Purchases</Title>
                        {selected.map(item => <Item item={item}/>)}
                    </Notification>
                </Notification>
            </Modal.Content>
        </Modal>

    )
}

const Item = ({item}) =>{
    console.log('hello', item)
    return (
    <Notification color="black">
        <Title>
            {item.productName}
        </Title>
    </Notification>)
}

export default Checkout