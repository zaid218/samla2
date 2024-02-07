// components/UserModal.js
import React from 'react';

const UserModal = ({ user, onClose }) => {
    return (
        <div className="user-modal-overlay" onClick={onClose}>
            <div className="user-modal-content" onClick={(e) => e.stopPropagation()}>
                <span className="close" onClick={onClose}>&times;</span>
                <h2>User Information</h2>
                <pre>{JSON.stringify(user, null, 2)}</pre>
            </div>
        </div>
    );
};

export default UserModal;
