import React, { useState } from 'react';
import Modal from 'react-modal';
import { useApp } from '../../context/AppContext';
import { X } from 'lucide-react';

export default function ClientLoginModal({ isOpen, onClose }) {
  const { isClientConnected, setIsClientConnected, isAdminConnected } = useApp();
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === '0000') {
      setIsClientConnected(true);
      onClose();
      setPassword('');
    } else {
      alert("Code incorrect.");
    }
  };

  const handleLogout = () => {
    setIsClientConnected(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName="modal-overlay"
      className="modal-content"
      contentLabel="Authentification Client"
    >
      <button onClick={onClose} className="btn-close-circle">
        <X size={24} />
      </button>

      {!isClientConnected && !isAdminConnected ? (
        <form onSubmit={handleLogin} className="admin-login-form">
          <h2>Connexion Client</h2>
          <p style={{ opacity: 0.5, marginBottom: '40px', fontSize: '0.9rem' }}>Veuillez entrer le code client</p>
          <div className="input-group">
            <input
              type="password" 
              placeholder="Code client (ex: 0000)"
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
          </div>
          <div className="modal-actions">
            <button type="submit" className="btn-save btn-full">SE CONNECTER</button>
          </div>
        </form>
      ) : (
        <div className="admin-panel">
          <h2 className="title-admin">ESPACE CLIENT</h2>
          <div className="client-info">
            <p className="client-connected-msg">Vous êtes connecté avec succès.</p>
            <div className="modal-actions">
              <button 
                onClick={handleLogout} 
                className="btn-full btn-danger"
              >
                DÉCONNEXION
              </button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
