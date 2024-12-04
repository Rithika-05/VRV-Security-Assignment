import React, { useState, useEffect } from 'react';
import AddEditRoleModal from './AddEditRoleModal';

export default function RoleManagement() {
  const [roles, setRoles] = useState([]);
  const [open, setOpen] = useState(false);
  const [editRole, setEditRole] = useState(null);

  useEffect(() => {
    fetch('/api/roles')
      .then((res) => res.json())
      .then((data) => setRoles(data));
  }, []);

  const handleDelete = (id) => {
    fetch(`/api/roles/${id}`, { method: 'DELETE' }).then(() => {
      setRoles(roles.filter((role) => role.id !== id));
    });
  };

  return (
    <div>
      <h1>Role Management</h1>
      <button onClick={() => setOpen(true)}>Add Role</button>
      <table>
        <thead>
          <tr>
            <th>Role Name</th>
            <th>Permissions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td>{role.name}</td>
              <td>{role.permissions.join(', ')}</td>
              <td>
                <button onClick={() => { setEditRole(role); setOpen(true); }}>Edit</button>
                <button onClick={() => handleDelete(role.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddEditRoleModal open={open} onClose={() => setOpen(false)} role={editRole} />
    </div>
  );
}