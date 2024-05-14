import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MainLayout from './Layouts/MainLayout';
import LoginPage from './Pages/Auth/LoginPage';
import LogoutPage from './Pages/Auth/LogoutPage';
import RegisterPage from './Pages/Auth/RegisterPage';
import FileOverviewPage from './Pages/File/Overview';
import FileUploadPage from './Pages/File/Upload';


const Routers: React.FC = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<FileUploadPage />} />
        </Route>
        <Route path="/auth" element={<MainLayout />}>
          <Route index element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="logout" element={<LogoutPage />} />
        </Route>
        <Route path="/files" element={<MainLayout />}>
          <Route index element={<FileOverviewPage />} />
          <Route path="overview" element={<FileOverviewPage />} />
          <Route path="upload" element={<FileUploadPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;