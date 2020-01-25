import React, { useState } from 'react';
import { Modal, Delete, File, Notification, Button, Column } from 'rbx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { imageUpload } from './Helpers/image';
import { postReceipt } from './Helpers/receipt';
import { deleteItem } from './firebaseHelpers';

const ReceiptModal = ({selectedState, modalState, house}) => {
  const selected = selectedState.selected;
  const [file, setFile] = useState(null);

  const onSubmit = (file) => {
    imageUpload(file).then(response => {
      const url = response.data.secure_url;
      postReceipt(house, url, selected);
    });
    selected.forEach(item => deleteItem(item.productName, house));
    selectedState.clearSelected();
    modalState.setAttachReceipt(false);
  }

  return (
    <Modal active={modalState.attachReceipt}>
      <Modal.Background onClick={() => modalState.setAttachReceipt(false)}/>
      <Modal.Card>
        <Modal.Card.Head>
          <Modal.Card.Title>Attach to Receipt</Modal.Card.Title>
          <Delete onClick={() => modalState.setAttachReceipt(false)}/>
        </Modal.Card.Head>
        <Modal.Card.Body>
          {selected.map(item => 
            <Notification key={item.productName} color='primary'>
              {item.productName} for {item.neededBy.map(p => p.name).join(',')}
            </Notification>)}
        </Modal.Card.Body>
        <Modal.Card.Foot>
          <Column.Group centered>
            <Column>
              <File hasName>
                <File.Label>
                  <File.Input name="resume" onChange={e => setFile(e.target.files[0])}/>
                  <File.CTA>
                    <File.Icon>
                      <FontAwesomeIcon icon={faUpload} />
                    </File.Icon>
                    <File.Label as="span">Choose a File</File.Label>
                  </File.CTA>
                  {!!file && (
                  <File.Name>{file.name}</File.Name>
                  )}
                </File.Label>
              </File>
            </Column>
            <Column>
              <Button 
                color='primary'
                disabled={!file}
                onClick={() => onSubmit(file)}
              >
                Upload
              </Button>
            </Column>
          </Column.Group>
        </Modal.Card.Foot>
      </Modal.Card>
    </Modal>
  )
}

export default ReceiptModal;