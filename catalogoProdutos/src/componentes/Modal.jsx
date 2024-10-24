// Modal.js
import React from 'react';

const Modal = ({ mensagem, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Mensagem</h2>
        <p>{mensagem}</p>
        <button onClick={onClose}>Continuar Comprando</button>
      </div>
    </div>
  );
};

export default Modal;
