import { Gray } from '@/common/colors';
import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalWrapper = styled.div<{ width?: string }>`
  background: #fff;
  width: ${({ width }) => (width ? width : '500px')};
  max-width: 80%;
  max-height: 800px;
  padding: 28px;
  border-radius: 8px;
  position: relative;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  overflow-x: hidden;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 30px;
  background: none;
  border: none;
  width: 14px;
  height: 14px;
  font-size: 35px;
  cursor: pointer;
`;

const ModalHeader = styled.div`
  margin: 20px 0;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 1rem;
  padding: 0 46px;
  line-height: 1.5;
`;

const ModalFooter = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

interface IconModalProps {
  width?: string;
  isOpen?: boolean;
  onClose: () => void;
  title?: string;
  icon?: React.ReactNode; // Accepts an icon as a React component
  children?: React.ReactNode;
}

const IconModal: React.FC<IconModalProps> = ({ isOpen, onClose, title, icon, children, width }) => {
  if (!isOpen) return null;

  return (
    <Overlay>
      <ModalWrapper width={width}>
        <CloseButton onClick={onClose}>×</CloseButton>
        {icon && <IconWrapper>{icon}</IconWrapper>} {/* Display the icon above the title */}
        {title && <ModalHeader>{title}</ModalHeader>}
        <ModalBody>{children}</ModalBody>
        <ModalFooter></ModalFooter>
      </ModalWrapper>
    </Overlay>
  );
};

export default IconModal;
