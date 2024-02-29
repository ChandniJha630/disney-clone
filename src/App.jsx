import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './index.css';
import Login from './components/Login';
import Topper from './components/Topper.jsx';
import Home from './components/Home.jsx';
import Profile from './components/Profile.jsx';

function App() {
  return (
    <div className='App'>
      <Router>
        <Topper/>
        
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
