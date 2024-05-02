
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/profile';
import Home from './pages/home';
import Subjects from './pages/subjects';
import Chapters from './pages/chapters';
import Modules from './pages/modules';
import Content from './pages/content';

import NavBar from './components/navigation/NavigationBar';


function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route index element={<Login />} />
          <Route path="Register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="home" element={<Home />} />
          <Route path="subjects" element={<Subjects />} />
          <Route path="chapters" >
            <Route path=":subjectId" element={<Chapters />} />
          </Route>
          <Route path="modules" >
            <Route path=":chapterId" element={<Modules />} />
          </Route>
          <Route path="content" element={<Content />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
