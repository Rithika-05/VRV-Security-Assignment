import React, { useState, useEffect } from 'react';
import PermissionManagement from './PermissionManagement';

export default function AddEditRoleModal({ open, onClose, role }) {
  const [roleName, setRoleName] = useState('');
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    if (role) {
      setRoleName(role.name);
      setPermissions(role.permissions);
    }
  }, [role]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRole = { name: roleName, permissions };
    if (role) {
      fetch(`/api/roles/${role.id}`, {
        method: 'PUT',
        body: JSON.stringify(newRole),
        headers: { 'Content-Type': 'application/json' },
      }).then(() => onClose());
    } else {
      fetch('/api/roles', {
        method: 'POST',
        body: JSON.stringify(newRole),
        headers: { 'Content-Type': 'application/json' },
      }).then(() => onClose());
    }
  };

  const handleSavePermissions = (updatedPermissions) => {
    setPermissions(updatedPermissions);
  };

  return open ? (
    <div className="modal">
      <h2>{role ? 'Edit Role' : 'Add Role'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Role Name:</label>
          <input
            type="text"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            required
          />
        </div>
        <PermissionManagement role={{ name: roleName, permissions }} onSave={handleSavePermissions} />
        <button type="submit">{role ? 'Update' : 'Add'} Role</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  ) : null;
}