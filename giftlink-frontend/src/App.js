import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import MainPage from './components/MainPage/MainPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import LoginPage from './components/LoginPage/Loginpage';
import DetailsPage from './components/DetailsPage/DetailsPage';
import SearchPage from './components/SearchPage/SearchPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar/Navbar';

function App() {
    const navigate = useNavigate();
  return (
    <>
        <div>Texto</div>
        
        </>
  );
}

export default App;
