import React from 'react';
import '../design/AlermModal.css';

const AlermModal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="am_modalOverlay" onClick={onClose}>
      <div className="am_window">
        <div className="am_modalContent" onClick={(e) => e.stopPropagation()}>
          <p>{message}</p>
          <button onClick={onClose}>바로 확인</button>
        </div>
      </div>
    </div>
  );
};

export default AlermModal;
