import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export default function Dialog({ isOpen, onClose, children }) {
    const dialogRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    // Handle opening/closing the dialog
    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            dialogRef.current.showModal();
        } else {
            setIsVisible(false);
            setTimeout(() => {
                dialogRef.current.close();
            }, 300); // Match the duration of the drop animation
        }
    }, [isOpen]);

    return createPortal(
        <dialog
            ref={dialogRef}
            className={`p-6 rounded-lg shadow-lg backdrop:bg-black backdrop:opacity-50 ${isVisible ? 'drop-in' : 'drop-out'}`}>
            {children}
        </dialog>,
        document.getElementById('modal')
    );
};