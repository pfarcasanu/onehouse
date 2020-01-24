import React, { useState } from 'react';
import { Container, Button, Input, Column, Block, Field, Control, Heading } from "rbx";
import { ColumnGroup } from 'rbx/grid/columns/column-group';
import ItemList from './ItemList';
import {saveItem} from './firebaseHelpers';

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

  if (user && house){
  return (
    <Container>
        <ColumnGroup>
            <Column size={10} offset={1}>
                <Block/>
                <ItemList items={propItems} user={user} selectedState={{selected, toggle}} house={house} />
                {selected.length === 0 ? <div/> :
                <Button color='info'>
                  Attach To Receipt 
                </Button>}
                <Block/>
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
  else if (user){
    return (
      <Heading className="medium-font">
        join or create a house to continue
      </Heading>
    )
  }
  else {
    return (
      <Heading className="medium-font">
        sign in to continue
      </Heading>
    )
  }

}

export default ListPage;
