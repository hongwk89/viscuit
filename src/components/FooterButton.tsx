import React from 'react';
import styled, { css } from 'styled-components';
import { ViscuitColor, Cancel } from '../common/colors';

const ButtonWrapper = styled.div<{ width?: string; height?: string }>`
  ${({ width = 'auto', height = 'auto' }) => {
    return css`
      width: ${width};
      height: ${height};
      display: flex;
    `;
  }}
`;

const ButtonStyled = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'fill', // 필터링 설정
})<{
  button_type: 'ViscuitColor' | 'Cancel';
  fill?: boolean;
  disabled?: boolean;
  width?: string;
  height?: string;
}>`
  ${({ button_type = 'ViscuitColor', disabled = false, fill = true, width, height }) => {
    const color = ButtonColors[button_type];
    return css`
      padding: 12px 16px;
      font-size: 16px;
      border-radius: 5px;
      border: ${fill ? 'none' : `1px solid ${color}`};
      width: ${width};
      height: ${height};
      ${fill
        ? `background-color: ${disabled ? '#f5f5f5' : color};
     border: none ;
     color: ${disabled ? '#a1a1a1' : 'white'};`
        : `background-color: #fff;
      border: 1px solid ${color} ;
      color: ${button_type === 'Cancel' ? '#000' : color};`}
      cursor: ${disabled ? 'not-allowed' : 'pointer'};
      transition: background-color 0.3s ease;
    `;
  }}
`;

const ButtonColors = {
  ViscuitColor: ViscuitColor,
  Cancel: Cancel,
};

interface ButtonProps {
  button_type?: 'ViscuitColor' | 'Cancel';
  label: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  width?: string;
  height?: string;

  disabled?: boolean;
  fill?: boolean;
}

const FooterButton: React.FC<ButtonProps> = ({
  button_type = 'ViscuitColor',
  label,
  onClick,
  width = '242px',
  height = '56px',
  disabled = false,
  fill = true,
}) => {
  return (
    <ButtonWrapper width={width} height={height}>
      <ButtonStyled
        button_type={button_type}
        onClick={onClick}
        disabled={disabled}
        fill={fill}
        width={width}
      >
        {label}
      </ButtonStyled>
    </ButtonWrapper>
  );
};

export default FooterButton;
