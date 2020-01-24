import React from 'react';
import { Modal, Delete, File, Notification } from 'rbx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

const ReceiptModal = ({selected, modalState}) => {

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
            <Notification key={item.productName} color='info'>
              {item.productName} for {item.neededBy.map(p => p.name).join(',')}
            </Notification>)}
        </Modal.Card.Body>
        <Modal.Card.Foot>
          <File>
            <File.Label>
              <File.Input name="resume" />
              <File.CTA>
                <File.Icon>
                  <FontAwesomeIcon icon={faUpload} />
                </File.Icon>
                <File.Label as="span">Choose a File</File.Label>
              </File.CTA>
            </File.Label>
          </File>
        </Modal.Card.Foot>
      </Modal.Card>
    </Modal>
  )
}

export default ReceiptModal;