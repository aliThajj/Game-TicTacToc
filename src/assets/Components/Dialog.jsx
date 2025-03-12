import React, { useEffect, useRef } from 'react';

export default function Dialog({ isOpen, onClose, children }) {
    const dialogRef = useRef(null);

    // Handle opening/closing the dialog
    useEffect(() => {
        if (isOpen) {
            dialogRef.current.showModal();
        } else {
            dialogRef.current.close();
        }
    }, [isOpen]);

    // Close dialog on backdrop click
    // const handleBackdropClick = (e) => {
    //     if (e.target === dialogRef.current) {
    //         onClose();
    //     }
    // };

    return (
        <dialog
            ref={dialogRef}
            // onClick={handleBackdropClick}
            className="p-6 rounded-lg shadow-lg backdrop:bg-black backdrop:opacity-50"
        >
            {children}
        </dialog>
    );
};

