import React, { useState } from 'react';
import styled from 'styled-components';
import { Primary, Error, Hover, SelectColor, InputDisable } from '../common/colors';
import ArrowDownIcon from '../icons/arrow_down.svg';

const SelectWrapper = styled.div<{ width?: string; height?: string }>`
  ${({ width = '100%', height = 'auto' }) => `
    position: relative;
    width: ${width};
    height: ${height}
    display: flex;
    flex-direction: column;
  `}
`;

const DropdownHeader = styled.div<{
  disabled?: boolean;
  height?: string;
  color?: string;
  border?: string;
}>`
  ${({ height = 'auto', disabled, border, color }) => `
  padding: 11px 16px;
  font-size: 16px;
  border-radius: 5px;
  border: ${border ? 'none' : '1px solid #e4e7ea'};
  background-color: ${disabled ? '#f5f5f5' : 'white'};
  color: ${disabled ? '#a1a1a1' : color ? color : 'black'};
  cursor: ${disabled ? 'not-allowed' : 'pointer'};
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${height};

  &:hover {
    border-color: ${!disabled ? Primary : '#e4e7ea'};
  }
  .placeholder{
    color:${InputDisable}
  }
`}
`;

const DropdownList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  position: absolute;
  top: calc(100% + 4px); /* 헤더 바로 아래 4px 간격 */
  width: 100%;
  max-height: 150px;
  overflow-y: auto;
  border: 1px solid #e4e7ea;
  border-radius: 5px;
  background-color: white;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

const DropdownListItem = styled.li.withConfig({
  shouldForwardProp: (prop) => prop !== 'isSelected',
})<{ isSelected?: boolean }>`
  padding: 10px 16px;
  background-color: ${({ isSelected }) => (isSelected ? SelectColor : 'white')};
  color: ${({ isSelected }) => (isSelected ? 'white' : 'black')};
  cursor: pointer;

  &:hover {
    background-color: ${Hover};
    color: black;
  }
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

const SelectColors = {
  Enabled: Primary,
  Error: Error,
};

interface Option {
  value: string;
  label: string;
}

interface SelectBoxProps {
  placeholder?: string;
  options: Option[];
  select_type?: 'Enabled' | 'Error';
  value?: string;
  description?: boolean;
  description_content?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  width?: string;
  height?: string;
  disabled?: boolean;
  border?: string;
  color?: string;
}

const SelectBox: React.FC<SelectBoxProps> = ({
  placeholder = 'Select an option',
  options,
  select_type = 'Enabled',
  value = '',
  description = false,
  description_content = '',
  onChange,
  width = '100%',
  height = 'auto',
  disabled = false,
  border,
  color,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((option) => option.value === value);

  const handleSelect = (selectedValue: string) => {
    onChange &&
      onChange({ target: { value: selectedValue } } as React.ChangeEvent<HTMLSelectElement>);
    setIsOpen(false);
  };

  return (
    <>
      <SelectWrapper width={width} height={height}>
        <DropdownHeader
          border={border}
          height={height}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          color={color}
        >
          <span className={!selectedOption ? 'placeholder' : ''}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <IconBox>
            <ArrowDownIcon />
          </IconBox>
        </DropdownHeader>
        {isOpen && (
          <DropdownList>
            {options.map((option) => (
              <DropdownListItem
                key={option.value}
                isSelected={option.value === value}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </DropdownListItem>
            ))}
          </DropdownList>
        )}
      </SelectWrapper>
      {description && <Description select_type={select_type}>{description_content}</Description>}
    </>
  );
};

export default SelectBox;
