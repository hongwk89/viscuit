import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { Primary, Error } from '../common/colors';
import ArrowDownIcon from '../icons/arrow_down.svg';

const SelectWrapper = styled.div<{ width?: string; height?: string }>`
  ${({ width = '100%', height = 'auto' }) => `
    position: relative;
    width: ${width};
    height: ${height};
    display: flex;
    flex-direction: column;
  `}
`;

const DropdownHeader = styled.div<{ disabled?: boolean; height?: string }>`
  ${({ height = 'auto', disabled }) => `
  padding: 11px 16px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #e4e7ea;
  background-color: ${disabled ? '#f5f5f5' : 'white'};
  color: ${disabled ? '#a1a1a1' : 'black'};
  cursor: ${disabled ? 'not-allowed' : 'pointer'};
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${height};

  &:hover {
    border-color: ${!disabled ? Primary : '#e4e7ea'};
  }
`}
`;

const IconBox = styled.div`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  height: 24px;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    right: 26px;
    transform: translateY(-50%);
    margin-right: 10px;
    height: 24px;
    border-left: 1px solid #e9ecee;
  }
`;

const Description = styled.span<{ select_type: 'Enabled' | 'Error' }>`
  ${({ select_type = 'Enabled' }) => {
    const color = SelectColors[select_type];
    return `
      margin-top: 4px;
      font-size: 14px;
      color: ${select_type === 'Error' ? color : '#767d84'};
    `;
  }}
`;

const DropdownContent = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'contentHeight', // 필터링 설정
})<{ isOpen: boolean; contentHeight: number }>`
  height: ${({ isOpen, contentHeight }) => (isOpen ? `${contentHeight}px` : '0')};
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transform: ${({ isOpen }) => (isOpen ? 'translateY(0)' : 'translateY(-20px)')};
  transition: height 0.4s ease, opacity 0.4s ease, transform 0.4s ease, visibility 0.4s ease;
`;

const SelectColors = {
  Enabled: Primary,
  Error: Error,
};

interface SelectBoxProps {
  select_type?: 'Enabled' | 'Error';
  value?: string;
  description?: boolean;
  description_content?: string;
  onChange?: () => void;
  width?: string;
  height?: string;
  disabled?: boolean;
  stay?: boolean;
  customComponent?: React.ReactNode;
}

const SelectComponetBox: React.FC<SelectBoxProps> = ({
  select_type = 'Enabled',
  value = '',
  description = false,
  description_content = '',
  width = '100%',
  height = 'auto',
  disabled = false,
  stay,
  customComponent,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight); // 실제 컨텐츠 높이를 계산
    }
  }, [customComponent]);

  useEffect(() => {
    if (!stay) {
      setIsOpen(false);
    }
  }, [value]);

  return (
    <>
      <SelectWrapper width={width} height={height}>
        <DropdownHeader height={height} onClick={() => !disabled && setIsOpen(!isOpen)} disabled={disabled}>
          <span>{value !== '' ? value : 'Select an option'}</span>
          <IconBox>
            <ArrowDownIcon />
          </IconBox>
        </DropdownHeader>
      </SelectWrapper>
      <DropdownContent isOpen={isOpen} contentHeight={contentHeight} ref={contentRef}>
        {customComponent}
      </DropdownContent>
      {description && <Description select_type={select_type}>{description_content}</Description>}
    </>
  );
};

export default SelectComponetBox;
