"use client";
import React from "react";
import Button from "@/ui/atoms/Button/Button";
import styled from "styled-components";
import { useModalContext } from "@/ui/contexts/ModalContext";
import ModalContent from "@/ui/molecules/ModalContent/ModalContent";

const ModalOverlay = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000; 
`;

const Modal: React.FC = () => {
    const {isOpen, onClose, modalContent} = useModalContext();

    if (!isOpen) return null

    return (
            <ModalOverlay isOpen={isOpen}>
                <ModalContent>
                    <Button type="button" icon={"X"} onClick={onClose} />
                    {modalContent}
                </ModalContent>
            </ModalOverlay>
    );
};

export default Modal;