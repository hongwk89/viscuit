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

const ModalWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isOpen' && prop !== 'overflowY',
})<{ width?: string; overflowY?: boolean }>`
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
  ${({ overflowY }) =>
    overflowY &&
    `
    ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;     /* Firefox */
  `};
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
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 700;
`;

const ModalLine = styled.div`
  width: calc(100% + 54px);
  margin-left: -28px;
  border: 1px solid ${Gray};
  margin-bottom: 32px;
`;

const ModalBody = styled.div`
  font-size: 1rem;
  line-height: 1.5;
`;

const ModalFooter = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
`;

interface ModalProps {
  width?: string;
  isOpen?: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  overflowY?: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, width, overflowY }) => {
  if (!isOpen) return null;

  return (
    <Overlay>
      <ModalWrapper width={width} overflowY={overflowY}>
        <CloseButton onClick={onClose}>×</CloseButton>
        {title && <ModalHeader>{title}</ModalHeader>}
        <ModalLine />
        <ModalBody>{children}</ModalBody>
        <ModalFooter></ModalFooter>
      </ModalWrapper>
    </Overlay>
  );
};

export default Modal;
