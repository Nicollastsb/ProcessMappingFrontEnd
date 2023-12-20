import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';

export const CustomModal = ({
  showModal,
  handleClick,
  modalTitle,
  modalBody,
}) => {
  return (
    <Modal show={showModal} onHide={handleClick}>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{modalBody}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClick}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClick}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
