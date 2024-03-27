// Modal.js
import React from 'react';
import Modal from 'react-modal';

function CustomModal({ isOpen, closeModal, onSuccess }) {
    return (
        <Modal isOpen={isOpen} onRequestClose={closeModal} contentLabel="Example Modal">
            <h2>Modal Content</h2>
            <button onClick={() => onSuccess()}>Close Modal</button>
        </Modal>
    );
}

export default CustomModal;
