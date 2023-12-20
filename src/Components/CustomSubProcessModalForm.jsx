import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { getArea } from './services/apiService';

export const CustomSubProcessModalForm = ({
  showModal,
  handleClick,
  modalTitle,
  updateParentData,
  areaId,
  subProcess,
}) => {
  const [area, setArea] = useState({ id: '', name: '' });
  const [dataForm, setDataForm] = useState(subProcess);
  console.log(subProcess);
  useEffect(() => {
    // const fetchData = async () => {
    //   if (id != null) {
    //     const process = await getProcess(id);
    //     setDataForm(process);
    //   }
    // };
    // const fetchAreaData = async (areaId) => {
    //   const areaDataBase = await getArea(areaId);
    //   setArea(areaDataBase);
    //   setDataForm((prev) => ({
    //     ...prev,
    //     areaId: areaDataBase.id,
    //     areaName: area.name,
    //   }));
    // };
    // fetchAreaData(areaId);
    //fetchData();
  }, []);

  return (
    <Modal className=".modal-xl" show={showModal} onHide={handleClick}>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Nome</Form.Label>
            <Form.Control
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
          <Form.Group className="mb-3" controlId="subprocess.ControlTextarea1">
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
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClick}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            updateParentData(dataForm);
            handleClick();
          }}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
