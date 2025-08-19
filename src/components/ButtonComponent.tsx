import React from 'react';
import styled, { css } from 'styled-components';
import { ViscuitColor, Error, Thirdary, Cancel, InputDisable } from '../common/colors';
import Add from '../icons/add.svg';

const ButtonStyled = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'fill', // fill 속성이 DOM에 전달되지 않도록 필터링
})<{
  button_type: 'ViscuitColor' | 'Error' | 'Thirdary' | 'Cancel';
  font_size: string;
  fill?: boolean;
  disabled?: boolean;
  width?: string;
  height?: string;
  border_color?: string;
  radius?: string;
  align?: string;
  font_weight?: string | number;
}>`
  ${({
    button_type = 'ViscuitColor',
    font_size,
    disabled = false,
    fill = true,
    width,
    height,
    border_color = '',
    radius,
    align,
    font_weight,
  }) => {
    const color = ButtonColors[button_type];
    return css`
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 5px;
      padding: 12px 16px;
      width: ${width};
      height: ${height};
      font-size: ${font_size};
      border-radius: ${radius};
      border: ${fill ? 'none' : `1px solid ${border_color ? border_color : color}`};
      ${font_weight && `font-weight:` + font_weight};
      ${align && `margin:0 auto;`}
      ${fill
        ? `background-color: ${disabled ? '#f5f5f5' : color}; 
     border: none ;
     color: ${disabled ? '#a1a1a1' : 'white'};`
        : `background-color: #fff;
      border: 1px solid ${border_color ? border_color : color} ;
      color: ${button_type === 'Cancel' ? InputDisable : color};`}
      cursor: ${disabled ? 'not-allowed' : 'pointer'};
      transition: background-color 0.3s ease;
    `;
  }}
`;

const ButtonColors = {
  ViscuitColor: ViscuitColor,
  Error: Error,
  Thirdary: Thirdary,
  Cancel: Cancel,
};

interface ButtonProps {
  button_type?: 'ViscuitColor' | 'Error' | 'Thirdary' | 'Cancel';
  label: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  width?: string;
  height?: string;
  disabled?: boolean;
  fill?: boolean;
  icon?: React.ReactNode;
  font_size?: string;
  border_color?: string;
  radius?: string;
  align?: string;
  font_weight?: string | number;
}

const ButtonComponent: React.FC<ButtonProps> = ({
  button_type = 'ViscuitColor',
  label,
  onClick,
  width = '148px',
  disabled = false,
  fill = true,
  icon,
  height = 'auto',
  font_size = '16px',
  border_color,
  radius = '5px',
  align,
  font_weight,
}) => {
  return (
    <ButtonStyled
      button_type={button_type}
      font_size={font_size}
      onClick={onClick}
      disabled={disabled}
      fill={fill}
      width={width}
      height={height}
      border_color={border_color}
      radius={radius}
      align={align}
      font_weight={font_weight}
    >
      {icon && <Add />}
      {label}
    </ButtonStyled>
  );
};

export default ButtonComponent;
