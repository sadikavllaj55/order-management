import React from "react";

export default function ProductModal({ open, children, onClose }) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow w-96">
                {children}
            </div>
        </div>
    );
}
