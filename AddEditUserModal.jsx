import React, { useState, useEffect } from 'react';

export default function AddEditUserModal({ open, onClose, user }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Admin');
  const [status, setStatus] = useState('Active');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
      setStatus(user.status);
    } else {
      setName('');
      setEmail('');
      setRole('Admin');
      setStatus('Active');
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { name, email, role, status };
    const url = user ? `/api/users/${user.id}` : '/api/users';
    const method = user ? 'PUT' : 'POST';

    fetch(url, {
      method,
      body: JSON.stringify(newUser),
      headers: { 'Content-Type': 'application/json' },
    }).then(() => onClose());
  };

  return open ? (
    <div className="modal">
      <h2>{user ? 'Edit User' : 'Add User'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="Admin">Admin</option>
            <option value="Editor">Editor</option>
          </select>
        </div>
        <div>
          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <button type="submit">{user ? 'Update' : 'Add'} User</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  ) : null;
}