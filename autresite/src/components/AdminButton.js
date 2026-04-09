import React from 'react';
import './AdminButton.scss';
import { Lock } from 'lucide-react';

const AdminButton = ({ onClick }) => {
  return (
    <button className="admin-toggle-btn" onClick={onClick} title="Espace Administrateur">
      <Lock size={18} />
    </button>
  );
};

export default AdminButton;
