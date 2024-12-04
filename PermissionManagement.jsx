import React, { useState } from 'react';

export default function PermissionManagement({ role, onSave }) {
  const [permissions, setPermissions] = useState(role ? role.permissions : []);

  const handleTogglePermission = (permission) => {
    setPermissions((prevPermissions) =>
      prevPermissions.includes(permission)
        ? prevPermissions.filter((perm) => perm !== permission)
        : [...prevPermissions, permission]
    );
  };

  const handleSave = () => {
    onSave(permissions);
  };

  return (
    <div>
      <h2>Manage Permissions for {role.name}</h2>
      <div>
        {['read', 'write', 'delete'].map((permission) => (
          <div key={permission}>
            <input
              type="checkbox"
              checked={permissions.includes(permission)}
              onChange={() => handleTogglePermission(permission)}
            />
            {permission.charAt(0).toUpperCase() + permission.slice(1)}
          </div>
        ))}
      </div>
      <button onClick={handleSave}>Save Permissions</button>
    </div>
  );
}
