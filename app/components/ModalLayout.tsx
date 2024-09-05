import React from 'react';
import {ModalLayoutProps} from "@/app/types";



const ModalLayout: React.FC<ModalLayoutProps> = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="h-screen fixed inset-0 flex items-center justify-center backdrop-blur-sm z-10">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      {children}
    </div>
  );
};

export default ModalLayout;
