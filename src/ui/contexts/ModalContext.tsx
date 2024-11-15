'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';
interface ModalContextType {
    isOpen: boolean;
    openModal: () => void;
    onClose: () => void;
    children: ReactNode;
    modalContent: ReactNode;
    setModalContent: (content: ReactNode) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<ReactNode>(null);

  const openModal = () =>{
    setIsOpen(true);
  }

  const onClose = () => {
    setIsOpen(false);
  }

  return (
    <ModalContext.Provider value={{ isOpen, onClose, openModal, modalContent, setModalContent, children }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }
  return context;
};
