import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignupPage from './SingUp';
import LogIn from './LogIn';
import ProtectedPage from './ProtectedPage';
import './App.css';
import CreateCompany from './CreateCompany';
import CompanyList from './CompanyList';
import UserCompanyList from './UserCompanyList';
import EditCompany from './EditCompany';
import Unauthorized from './Unauthorized'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
       
        <Route path='/' element={<SignupPage />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/unauthorized' element={<Unauthorized />} /> 
        <Route path='/*' element={<h1>Page not Found</h1>} />

        
        <Route element={<ProtectedPage allowedRoles={['IT_USER_NORMAL']} />}>
          <Route path='/userCompany' element={<UserCompanyList />} />
        </Route>
        <Route element={<ProtectedPage allowedRoles={['IT_USER_NORMAL','IT_ADMIN']} />}>
        <Route path='/createCompany' element={<CreateCompany />} />
        </Route>
        <Route element={<ProtectedPage allowedRoles={['IT_ADMIN']} />}>
        <Route path='/edit/:id' element={<EditCompany />} />
        <Route path='/list' element={<CompanyList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

