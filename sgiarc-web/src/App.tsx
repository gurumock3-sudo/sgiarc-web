import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Team from './pages/Team';
import Collaborators from './pages/Collaborators';
import Facilities from './pages/Facilities';
import Research from './pages/Research';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="team" element={<Team />} />
          <Route path="collaboration" element={<Collaborators />} />
          <Route path="facilities" element={<Facilities />} />
          <Route path="research-areas" element={<Research type="areas" />} />
          <Route path="projects" element={<Research type="projects" />} />
          {/* Fallback for empty pages */}
          <Route path="*" element={<div className="container py-20 text-center text-xl font-bold">Coming Soon</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
