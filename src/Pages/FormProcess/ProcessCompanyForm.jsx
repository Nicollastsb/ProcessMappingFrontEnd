import React, { useState, useEffect, Fragment } from 'react';
import Form from 'react-bootstrap/Form';
import { CustomTableSubProcess } from '../../Components/CustomTableSubProcess';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useNavigate, useParams } from 'react-router-dom';
import { CustomButton } from '../../Components/CustomButton';
import {
  createProcess,
  getAreas,
  getProcess,
  updateProcess,
} from '../../Components/services/apiService';

export const ProcessCompanyForm = () => {
  const { id } = useParams();
  const [dataForm, setDataForm] = useState({
    id: null,
    name: '',
    description: '',
    areaId: '52ff1cdf-145a-4b11-413b-08dc0031ea19',
    subProcesses: [],
    areaName: '',
    changed: null,
    deleted: null,
    order: null,
  });

  const [areas, setAreas] = useState([]);
  const [subProcesses, setSubProcess] = useState([]);
  function addSubProcess(item) {
    const itensCopy = Array.from(subProcesses);
    itensCopy.push(item);
    setSubProcess(itensCopy);
    setDataForm((prev) => ({ ...prev, subProcesses: itensCopy }));
  }

  const addNewSubProcess = (newSubProcess) => {
    addSubProcess(newSubProcess);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (id != 'new') {
        const process = await getProcess(id);
        setDataForm(process);
        setSubProcess(process.subProcesses);
      }
    };

    const fetchAreasData = async () => {
      const areasDataBase = await getAreas();
      setAreas(areasDataBase);
    };

    fetchAreasData();
    fetchData();
  }, []);

  const navigate = useNavigate();
  const submitProcess = async () => {
    if (id != 'new') {
      const process = await updateProcess(id, dataForm);
    } else {
      const process = await createProcess(dataForm);
      navigate(`/ProcessCompanyForm/${process.id}`);
    }
  };

  return (
    <Fragment>
      <Container fluid="md">
        <Row>
          <h2 style={{ textAlign: 'center' }}>
            {id == 'new' ? 'Novo processo' : dataForm.name}
          </h2>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nome"
                onChange={(e) =>
                  setDataForm({
                    ...dataForm,
                    name: e.target.value,
                  })
                }
                value={dataForm && dataForm.name}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                onChange={(e) =>
                  setDataForm({
                    ...dataForm,
                    description: e.target.value,
                  })
                }
                as="textarea"
                rows={3}
                value={dataForm && dataForm.description}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Área</Form.Label>
              <Form.Select
                aria-label="Default select example"
                disabled
                onChange={(e) =>
                  setDataForm({
                    ...dataForm,
                    areaId: e.target.value,
                  })
                }
                defaultValue={
                  dataForm && dataForm.AreaId
                    ? dataForm.AreaId
                    : '52ff1cdf-145a-4b11-413b-08dc0031ea19'
                }
              >
                <option>Selecione</option>
                <option value="52ff1cdf-145a-4b11-413b-08dc0031ea19">
                  Pessoas
                </option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Row>
        <Row>
          <CustomTableSubProcess
            data={subProcesses}
            newSubProcess={addNewSubProcess}
            areaId={dataForm.areaId}
          />
        </Row>
        <Row>
          <CustomButton
            descriptionButton={'Salvar'}
            handleClick={() => submitProcess()}
            classButton={'btn btn-success'}
          />
        </Row>
      </Container>
    </Fragment>
  );
};
