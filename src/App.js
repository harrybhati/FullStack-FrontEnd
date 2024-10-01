import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import  SingUp from './SingUp';
import LogIn from './LogIn'
import ProtectedPage from './ProtectedPage';
import './App.css';
import CreateCompany from './CreateCompany';
import CompanyList from './CompanyList';
import UserCompanyList from './UserCompanyList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path='/' element={<SingUp />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/*' element={<h1> Page not Found </h1>}></Route>

        {/* Protected routes */}
        <Route element={<ProtectedPage />}>
          <Route path='/userCompany' element={<UserCompanyList />} />
          <Route path='/createCompany' element={<CreateCompany />} />
          <Route path='/list' element={<CompanyList />} />
        </Route>

        {/* Catch-all for invalid URLs */}
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
