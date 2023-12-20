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

export const CustomTableSubProcess = ({ data, newSubProcess, areaId }) => {
  const [showModal, setShowModal] = useState(false);
  const handleClick = () => setShowModal(!showModal);
  const [subProcesses, setSubProcesses] = useState(data);
  //const [subProcessId, setSubProcessId] = useState(null);
  const [subProcess, setSubProcess] = useState(null);

  const handleEdit = (item) => {
    setSubProcess(item);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const process = await deleteProcess(id);
  };

  // useEffect(() => {
  //   const fillWithData = () => {
  //     if (data != null && data != undefined) {
  //       setSubProcesses(data);
  //     }
  //   };
  //   fillWithData();
  // }, []);

  const addNewSubProcess = (subProcess) => {
    debugger;
    subProcess.order = data.length + 1;
    setSubProcesses((current) => [...current, subProcess]);
    newSubProcess(subProcess);
  };

  return (
    <Fragment>
      <h2 style={{ textAlign: 'center' }}>Subprocessos</h2>
      <Container fluid="md">
        <Row>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Button variant="primary" onClick={handleClick}>
                Novo Subprocesso
              </Button>
              &nbsp;
            </Form.Group>
          </Form>
        </Row>
        <Row>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Up/Down</th>
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
                    <td>
                      <CustomButton
                        descriptionButton={
                          <ArrowUpCircle style={{ color: 'white' }} />
                        }
                        handleClick={() => handleDelete(item.id)}
                        classButton={'btn btn-secondary'}
                        disabledButton={index + 1 == 1 && true}
                      />
                      &nbsp;
                      <CustomButton
                        descriptionButton={
                          <ArrowDownCircle style={{ color: 'white' }} />
                        }
                        handleClick={() => handleDelete(item.id)}
                        classButton={'btn btn-secondary'}
                        disabledButton={data.length == index + 1 && true}
                      />
                    </td>
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
                        handleClick={() => handleDelete(item.id)}
                        classButton={'btn btn-danger'}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Row>
      </Container>
      <CustomSubProcessModalForm
        showModal={showModal}
        handleClick={handleClick}
        modalTitle={'Subprocesso'}
        modalBody={'modal corpo'}
        updateParentData={addNewSubProcess}
        areaId={areaId}
        subProcess={subProcess}
      />
    </Fragment>
  );
};
