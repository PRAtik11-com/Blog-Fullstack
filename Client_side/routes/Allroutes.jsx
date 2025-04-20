import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../src/pages/Home';
import Login from '../src/pages/Login';
import Signup from '../src/pages/Signup';
import Addblog from '../src/pages/Addblog';
import Editblog from '../src/pages/Editblog';
import PrivateRoute from '../src/components/PrivateRoute';


const Allroutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/Addblog" element={
      <PrivateRoute>
        <Addblog />
      </PrivateRoute>
    } />

    <Route path="/edit/:userId/:postId" element={
      <PrivateRoute>
        <Editblog />
      </PrivateRoute>
    } />
  </Routes>
);

export default Allroutes;
