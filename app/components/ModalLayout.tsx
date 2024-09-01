import React from 'react';
import {ModalLayoutProps} from "@/app/types";



const ModalLayout: React.FC<ModalLayoutProps> = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="h-screen fixed inset-0 flex items-center justify-center backdrop-blur-sm z-10">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="relative bg-white p-8 rounded-2xl shadow-md w-96">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600">X</button>
        {children}
      </div>
    </div>
  );
};

export default ModalLayout;
