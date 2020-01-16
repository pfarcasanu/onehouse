import React from "react";
import {Title, Modal, Box, Notification, Content, Block, Level} from "rbx";


const Checkout = ({modalState, selected})=>{
    return(
        <Modal active={modalState.modalState}>
            <Modal.Background onClick = {()=> modalState.setModalState(false)}/>
            <Modal.Content>
                <Box color="white">
                    <Notification color="link">
                        <Title>Your Purchases:</Title>
                        {selected.map(item => <Item item={item}/>)}
                    </Notification>
                </Box>
            </Modal.Content>
        </Modal>

    )
}

const Item = ({item}) =>{
    return (
    <Box color="black">
        <Title size={5}>{item.productName} {getNames(item.neededBy)} </Title>
    </Box>)
}

const getNames = (array) =>{
    let my_string = "for"
    if (array){
        for (let i=0; i<array.length; i++){
            if (i==0){
                my_string = my_string + " " + array[i].name
            }
            else{
                my_string = my_string + ", " + array[i].name
            }
        }
        return(my_string)
    }
    else{
        return("")
    }
}

export default Checkout