import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { getArea } from './services/apiService';

export const CustomSubProcessModalForm = ({
  showModal,
  onClose,
  modalTitle,
  saveProcess,
  areaId,
  subProcess,
  isEdit,
}) => {
  const [dataForm, setDataForm] = useState(subProcess);

  return (
    dataForm && (
      <Modal className=".modal-xl" show={showModal} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="controlInputNameSubprocess">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Nome"
                onChange={(e) => {
                  setDataForm({
                    ...dataForm,
                    name: e.target.value,
                  });
                }}
                value={dataForm && dataForm.name}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="subprocess.ControlTextarea1"
            >
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setDataForm({
                    ...dataForm,
                    description: e.target.value,
                  });
                }}
                value={dataForm && dataForm.description}
                as="textarea"
                rows={3}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                saveProcess(dataForm, isEdit);
                onClose();
              }}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    )
  );
};
