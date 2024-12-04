import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import UserManagement from './components/UserManagement';
import RoleManagement from './components/RoleManagement';
import './styles.css';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="sidebar">
          <h2>RBAC Dashboard</h2>
          <ul>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/users">User Management</Link></li>
            <li><Link to="/roles">Role Management</Link></li>
          </ul>
        </nav>
        <main className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/roles" element={<RoleManagement />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;  
