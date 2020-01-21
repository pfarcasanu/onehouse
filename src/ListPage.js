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

const ListPage = ({propItems, user, house}) => {
  const [productName, setProductName] = useState("");
  const [unit, setUnit] = useState("");
  const [selected, toggle] = useSelection();
  const [shopMode, setShopMode] = useState(false);
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

  const handleProductChange = (event) => {
    setProductName(event.target.value);
  }

  const handleUnitChange = (event) => {
    setUnit(event.target.value);
  }

  const handleSubmit = () => {
    saveItem({ name: productName, unit: unit, creator: user.displayName, houseName: house });
    setProductName("");
    setUnit("");
  }
  //test github
  if(user){
  return (
    <Container>
      <Block/>
        <ColumnGroup>
            <Column size={10} offset={1}>
                <Box>
                  <ItemList items={propItems} user={user} shopMode={shopMode} selectedState={{selected, toggle}} house={house} />
                </Box>
                <Column size="three-fifths" offset="one-fifth">
                <Field align="centered" kind="addons">
                    <Control expanded>
                        <Input size="medium" placeholder="Eggs" value={productName} onChange={handleProductChange}/>
                    </Control>
                    <Control expanded>
                        <Input size="medium" placeholder="dozen" value={unit} onChange={handleUnitChange}/>
                    </Control>
                    <Control>
                        <Button size="medium" color="link" onClick={handleSubmit}>Add</Button>
                    </Control>
                </Field>
                </Column>
            </Column>
        </ColumnGroup>
    </Container>
  )}
  else return(
    <div>Please Login</div>
  )

}

export default ListPage;
