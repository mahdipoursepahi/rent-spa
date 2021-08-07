import React from 'react';
import "./style.scss";
import closeButton from "../../assets/icons/close-button.svg";

const Modal = ({ isOpen, onModalClose, children }) => {
    if (!isOpen) return null;
    return (
        <>
            <div className="overlay" onClick={onModalClose}></div>
            <div className="modal">
                <img className="modal__close-button" src={closeButton} onClick={onModalClose} alt="close button" />
                {children}
            </div>
        </>
    );
}

export default Modal;