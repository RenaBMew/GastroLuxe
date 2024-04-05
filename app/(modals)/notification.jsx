// Modal.js
import React from "react";

const NotificationModal = ({ message }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          <span className="close">&times;</span>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
