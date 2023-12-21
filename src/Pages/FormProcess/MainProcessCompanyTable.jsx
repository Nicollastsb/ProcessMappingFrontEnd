import React, { useState, useEffect, Fragment } from 'react';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CustomButton } from '../../Components/CustomButton';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';
import {
  deleteProcess,
  getProcesses,
} from '../../Components/services/apiService';
import { Button, Form } from 'react-bootstrap';

export const MainProcessCompanyTable = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const goToProcessCompanyForm = (id) => {
    navigate(`/ProcessCompanyForm/${id}`);
  };

  const handleEdit = (id) => {
    goToProcessCompanyForm(id);
  };

  const handleDelete = async (id) => {
    const deletedId = await deleteProcess(id);
    const remainingProcesses = data.filter((sub) => sub.id !== deletedId);
    setData(remainingProcesses);
  };

  useEffect(() => {
    const getAllProcess = async () => {
      const processes = await getProcesses();
      setData(processes);
    };
    getAllProcess();
  }, []);

  const handleClickNewProcess = () => goToProcessCompanyForm('new');

  return (
    <Fragment>
      &nbsp;
      <h2 style={{ textAlign: 'center' }}>Processos principais</h2>
      &nbsp;
      <Container fluid="md">
        <Row>
          <Form>
            <Form.Group className="mb-3" controlId="ControlInputNewProcess">
              <Button variant="primary" onClick={handleClickNewProcess}>
                Novo Processo
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
                <th>Name</th>
                <th>Description</th>
                <th>Area</th>
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
                    <td>{item.areaName}</td>
                    <td colSpan={2}>
                      <CustomButton
                        descriptionButton={'Edit'}
                        handleClick={() => handleEdit(item.id)}
                        classButton={'btn btn-primary'}
                      ></CustomButton>
                      &nbsp;
                      <CustomButton
                        descriptionButton={'Delete'}
                        handleClick={() => handleDelete(item.id)}
                        classButton={'btn btn-danger'}
                      ></CustomButton>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Row>
      </Container>
    </Fragment>
  );
};
