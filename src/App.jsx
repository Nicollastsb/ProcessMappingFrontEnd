import React from 'react';
import { MainProcessCompanyTable } from './Pages/FormProcess/MainProcessCompanyTable';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ProcessCompanyForm } from './Pages/FormProcess/ProcessCompanyForm';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainProcessCompanyTable />} />
        <Route
          path="/ProcessCompanyForm/:id"
          element={<ProcessCompanyForm />}
        />
        <Route
          path="/MainProcessCompanyTable"
          element={<MainProcessCompanyTable />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
