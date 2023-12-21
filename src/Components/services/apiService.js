import axios from 'axios';

// const API_URL_CompanyProcesses = 'http://localhost:8080/CompanyProcesses';
// const API_URL_Areas = 'http://localhost:8080/Areas';
const API_URL_CompanyProcesses = 'http://localhost:17701/CompanyProcesses';
const API_URL_Areas = 'http://localhost:17701/Areas';

export const getProcesses = async () => {
  try {
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    const { data } = await axios.get(`${API_URL_CompanyProcesses}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getProcess = async (id) => {
  try {
    const { data } = await axios.get(`${API_URL_CompanyProcesses}/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateProcess = async (id, updatedProcess) => {
  try {
    const { data } = await axios.put(
      `${API_URL_CompanyProcesses}/${id}`,
      updatedProcess,
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProcess = async (id) => {
  try {
    await axios.delete(`${API_URL_CompanyProcesses}/${id}`);
    return id;
  } catch (error) {
    console.log(error);
  }
};

export const createProcess = async (newProcess) => {
  try {
    const { data } = await axios.post(API_URL_CompanyProcesses, newProcess);
    return data;
  } catch (errors) {
    console.log(errors);
  }
};

export const getAreas = async () => {
  try {
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    const { data } = await axios.get(`${API_URL_Areas}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getArea = async (id) => {
  try {
    const { data } = await axios.get(`${API_URL_Areas}/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
