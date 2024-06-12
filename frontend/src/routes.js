// src/routes.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import MainPage from './pages/acesso-restrito/WeightCalc/WeightCal'
import Cadastro from './pages/Cadastro/Cadastro';


export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/main" element={<MainPage />} /> 
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Cadastro />} />


      </Routes>
    </Router>
  );
}
