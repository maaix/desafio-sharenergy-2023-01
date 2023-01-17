import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Customer from './pages/customer/Customer';
import HttpStatus from './pages/httpstatus/HttpStatus';
import Login from './pages/login/Login';
import RandomDog from './pages/randomdog/RandomDog';
import Register from './pages/register/Register';
import Users from './pages/users/Users';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import "react-toastify/dist/ReactToastify.css"
import './index.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route exact path='/register' element = {<Register/>}></Route>
          <Route exact path='/login' element = {<Login/>}></Route>
          <Route exact path='/' element = {<Users/>}></Route>
          <Route exact path='/users' element = {<Users/>}></Route>
          <Route exact path='/http_status' element = {<HttpStatus/>}></Route>
          <Route exact path='/random_dog' element = {<RandomDog/>}></Route>
          <Route exact path='/customer' element = {<Customer/>}></Route>        
      </Routes>
    
    </BrowserRouter>
  );
}


