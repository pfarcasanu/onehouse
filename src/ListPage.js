import React, { useState, useEffect} from 'react';
import { Container, Button, Input, Box, Column, Block, Field, Control, Title } from "rbx";
import { ColumnGroup } from 'rbx/grid/columns/column-group';
import ItemList from './ItemList';
import {saveItem} from './firebaseHelpers';
import Checkout from './Checkout'

const useSelection = () => {
  const [selected, setSelected] = useState([]);
  const toggle = (x) => {
    setSelected(selected.includes(x) ? selected.filter(y => y !== x) : [x].concat(selected))
  };
  return [ selected, toggle ];
};

const ListPage = ({propItems, user}) => {
  const [selected, toggle] = useSelection();
  const [shopMode, setShopMode] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [modalState, setModalState] = useState(false);

  const shopModeOnClick = () => {
    if (!shopMode){
      setShopMode(true);
      return;
    }
    setShopMode(false);
    if (selected.length === 0) return;
    else{
      setModalState(true);
    }
  };

  const handleChange = (event) => {
    setUserInput(event.target.value);
  }

  const handleSubmit = () => {
    if(user)
    saveItem({ name:userInput, creator:user.displayName });
  }
  //test github
  return (
    <Container>
      <Checkout modalState={{modalState, setModalState}} selected={propItems.filter(item=> selected.includes(item.id))}/>
      <Button size="large" color="link" outlined onClick={()=>shopModeOnClick()}>
        {shopMode ? "Check Out" : "Enter Shopping Mode"}
      </Button>
      <Block/>
        <ColumnGroup>
            <Column size={10} offset={1}>
                <Box>
                  <ItemList items={propItems} shopMode={shopMode} selectedState={{selected, toggle}}/>
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
