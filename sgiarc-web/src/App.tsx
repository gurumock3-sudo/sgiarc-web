import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Team from './pages/Team';
import Collaborators from './pages/Collaborators';
import Facilities from './pages/Facilities';
import Research from './pages/Research';
import About from './pages/About';
import Publications from './pages/Publications';

// Admin Imports
import AdminLayout from './pages/admin/AdminLayout';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import PublicationsManager from './pages/admin/PublicationsManager';
import MembersManager from './pages/admin/MembersManager';
import MediaLibrary from './pages/admin/MediaLibrary';
import SectionsManager from './pages/admin/SectionsManager';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="publications" element={<Publications />} />
          <Route path="team" element={<Team />} />
          <Route path="collaboration" element={<Collaborators />} />
          <Route path="facilities" element={<Facilities />} />
          <Route path="research-areas" element={<Research type="areas" />} />
          <Route path="projects" element={<Research type="projects" />} />
          <Route path="*" element={<div className="container py-20 text-center text-xl font-bold">Coming Soon</div>} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="publications" element={<PublicationsManager />} />
          <Route path="members" element={<MembersManager />} />
          <Route path="media" element={<MediaLibrary />} />
          <Route path="sections" element={<SectionsManager />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
