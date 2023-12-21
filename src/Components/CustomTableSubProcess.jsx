import React, { useState, Fragment, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CustomButton } from './CustomButton';
import { ArrowUpCircle, ArrowDownCircle } from 'react-bootstrap-icons';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { CustomSubProcessModalForm } from './CustomSubProcessModalForm';
import { deleteProcess } from './services/apiService';

export const CustomTableSubProcess = ({
  data,
  newSubProcess,
  editSubProcess,
  areaId,
  deleteSubProcess,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const handleClick = () => {
    setShowModal(!showModal);
    setIsEdit(false);
  };
  const [subProcesses, setSubProcesses] = useState(data);
  //const [subProcessId, setSubProcessId] = useState(null);
  const [subProcess, setSubProcess] = useState({
    id: null,
    name: '',
    description: '',
    areaId: null,
    subProcesses: [],
    areaName: '',
    changed: null,
    deleted: null,
    order: null,
  });

  const initialSubProcess = {
    id: null,
    name: '',
    description: '',
    areaId: null,
    subProcesses: [],
    areaName: '',
    changed: null,
    deleted: null,
    order: null,
  };

  const handleNewProcess = () => {
    setSubProcess(initialSubProcess);
    setIsEdit(false);
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setSubProcess(item);
    setIsEdit(true);
    // setShowModal(true);
  };

  useEffect(() => {
    if (isEdit) setShowModal(true);
  }, [isEdit]);

  const handleDelete = async (item) => {
    deleteSubProcess(item);
    //const process = await deleteProcess(id);
  };

  const saveProcess = (subProcess, isEdit = false) => {
    setSubProcesses((current) => [...current, subProcess]);

    if (isEdit) {
      editSubProcess(subProcess);
    } else {
      newSubProcess(subProcess);
    }

    setSubProcess({
      id: null,
      name: '',
      description: '',
      areaId: null,
      subProcesses: [],
      areaName: '',
      changed: null,
      deleted: null,
      order: null,
    });
  };

  return (
    <Fragment>
      <h2 style={{ textAlign: 'center' }}>Subprocessos</h2>
      <Container fluid="md">
        <Row>
          <div className="mb-2">
            <Button variant="primary" onClick={handleNewProcess}>
              Novo Subprocesso
            </Button>
          </div>
          &nbsp;
        </Row>
        <Row>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.length > 0 &&
                data.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td colSpan={2}>
                      <CustomButton
                        descriptionButton={'Edit'}
                        handleClick={() => handleEdit(item)}
                        classButton={'btn btn-primary'}
                      />
                      &nbsp;
                      <CustomButton
                        descriptionButton={'Delete'}
                        handleClick={() => handleDelete(item)}
                        classButton={'btn btn-danger'}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Row>
      </Container>
      {showModal && (
        <CustomSubProcessModalForm
          showModal={showModal}
          onClose={handleClick}
          modalTitle={'Subprocesso'}
          modalBody={'modal corpo'}
          saveProcess={saveProcess}
          areaId={areaId}
          subProcess={subProcess}
          isEdit={isEdit}
        />
      )}
    </Fragment>
  );
};
