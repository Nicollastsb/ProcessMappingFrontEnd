import React, { useState, useEffect, Fragment } from 'react';
import Form from 'react-bootstrap/Form';
import { CustomTableSubProcess } from '../../Components/CustomTableSubProcess';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useNavigate, useParams } from 'react-router-dom';
import { CustomButton } from '../../Components/CustomButton';
import {
  createProcess,
  deleteProcess,
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
    areaId: null,
    subProcesses: [],
    areaName: '',
    changed: null,
    deleted: null,
    order: null,
  });
  const [areas, setAreas] = useState([]);
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (id != 'new') {
        const process = await getProcess(id);
        setDataForm(process);
      }
    };

    const fetchAreasData = async () => {
      const areasDataBase = await getAreas();
      setAreas(areasDataBase);
    };

    fetchAreasData();
    fetchData();
  }, []);

  const addNewSubProcess = (newSubProcess) => {
    const processOrders = dataForm.subProcesses.map((process) => process.order);
    newSubProcess.order =
      processOrders.length > 0 ? Math.max.apply(null, processOrders) + 1 : 1;
    const itensCopy = Array.from(dataForm.subProcesses);
    itensCopy.push(newSubProcess);
    setDataForm((prev) => ({ ...prev, subProcesses: itensCopy }));
  };

  const editSubProcess = (editedSubProcess) => {
    editedSubProcess.changed = true;
    const editedSubProcesses = dataForm.subProcesses.map((sub) =>
      sub.order === editedSubProcess.order ? editedSubProcess : sub,
    );
    setDataForm((prev) => ({ ...prev, subProcesses: editedSubProcesses }));
  };

  const deleteSubProcess = async (subProcess) => {
    let remainingSubProcesses = [];
    if (subProcess.id) {
      const deletedId = await deleteProcess(subProcess.id);
      remainingSubProcesses = dataForm.subProcesses.filter(
        (sub) => sub.id !== deletedId,
      );
    } else {
      remainingSubProcesses = dataForm.subProcesses.filter(
        (sub) => sub.order !== subProcess.order,
      );
    }
    setDataForm((prev) => ({ ...prev, subProcesses: remainingSubProcesses }));
  };

  const submitProcess = async () => {
    if (id == 'new') {
      const process = await createProcess(dataForm);
      navigate(`/ProcessCompanyForm/${process.id}`);
    } else {
      const process = await updateProcess(id, dataForm);
      navigate(`/`);
    }
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    await submitProcess();
  };

  return (
    <Fragment>
      <Container fluid="md">
        <Row>
          <h2 style={{ textAlign: 'center' }}>
            {id == 'new' ? 'Novo processo' : dataForm.name}
          </h2>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formInputNameProcess">
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
                required
              />
              <Form.Control.Feedback type="invalid">
                Preencha o campo.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="formInputDescriptionProcess"
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
            <Form.Group className="mb-3" controlId="formInputAreaProcess">
              <Form.Label>Área</Form.Label>
              <Form.Select
                aria-label="Áreas"
                onChange={(e) =>
                  setDataForm({
                    ...dataForm,
                    areaId: e.target.value,
                  })
                }
                defaultValue={dataForm && dataForm.AreaId && dataForm.AreaId}
              >
                <option>Selecione</option>
                {areas &&
                  areas.length > 0 &&
                  areas.map((item, index) => (
                    <option value={item.id} key={index}>
                      {item.name}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <CustomTableSubProcess
                data={dataForm.subProcesses}
                newSubProcess={addNewSubProcess}
                editSubProcess={editSubProcess}
                areaId={dataForm.areaId}
                deleteSubProcess={deleteSubProcess}
              />
            </Form.Group>
            <CustomButton
              type={'submit'}
              descriptionButton={'Salvar'}
              //handleClick={() => submitProcess()}
              classButton={'btn btn-success'}
            />
          </Form>
        </Row>
        <Row></Row>
        <Row></Row>
      </Container>
    </Fragment>
  );
};
