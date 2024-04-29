
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';

import NavBar from './components/navigation/NavigationBar';


function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route index element={<Login />} />
          <Route path="Register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
