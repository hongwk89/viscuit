import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { Primary, Error, InputDisable } from '../common/colors';
import Eyes from '../icons/eyes.svg';
import EyesClose from '../icons/eyes_close.svg';

const InputWrapper = styled.div<{ width: string; height?: string }>`
  ${({ width, height }) => {
    return css`
      width: ${width};
      height: ${height};
      position: relative;
      display: flex;
      flex-direction: column;
    `;
  }}
`;

const InputBox = styled.div``;

const Label = styled.label`
  display: block;
  font-size: 16px;
  color: #000;
  margin-bottom: 8px;
`;

const InputField = styled.input.withConfig({
  shouldForwardProp: (prop) => prop !== 'input_type',
})<{
  input_type: 'Enabled' | 'Error';
  icon?: React.ReactNode;
  disabled?: boolean;
  type?: string;
  height?: string;
}>`
  ${({ input_type = 'Enabled', icon, disabled, height }) => {
    const color = InputColors[input_type];
    return css`
      width: 100%;
      padding: 12px 16px 12px ${icon ? '48px' : '16px'};
      font-size: 16px;
      border-radius: 5px;
      border: 1px solid ${input_type === 'Error' ? color : '#e4e7ea'};
      background-color: ${disabled ? '#f5f5f5' : 'white'};
      color: ${disabled ? '#a1a1a1' : 'black'};
      cursor: ${disabled ? 'not-allowed' : 'text'};
      height: ${height};
      &::placeholder {
        color: ${InputDisable};
      }
    `;
  }}
`;

const IconWrapper = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
`;

const EyesnWrapper = styled.div`
  position: absolute;
  right: 16px;
  top: 57%;
  transform: translateY(-50%);
  cursor: pointer;
`;

const Description = styled.p.withConfig({
  shouldForwardProp: (prop) => prop !== 'input_type',
})<{
  input_type: 'Enabled' | 'Error';
  description_color?: string;
  height: string;
  position?: string | null;
}>`
  ${({ input_type = 'Enabled', description_color, height, position }) => {
    const color = InputColors[input_type];

    return css`
      ${position && 'position: absolute'};
      top: calc(100% + 8px);
      font-size: 14px;
      color: ${description_color ? description_color : input_type === 'Error' ? color : '#767d84'};
      ${!position && 'margin-top:8px'};
    `;
  }}
`;

const InputColors = {
  Enabled: Primary,
  Error: Error,
};

interface InputLayoutProps {
  input_type?: 'Enabled' | 'Error';
  value?: string;
  description?: boolean;
  description_content?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  eyes?: React.ReactNode;
  width?: string;
  disabled?: boolean;
  placeholder?: string;
  type?: string;
  height?: string;
  label?: string;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  description_color?: string;
  maxLength?: number;
  position?: string | null;
}

const Input: React.FC<InputLayoutProps> = ({
  value = '',
  description = false,
  description_content = '',
  input_type = 'Enabled',
  placeholder = '',
  icon,
  onChange,
  width = '100%',
  height = 'auto',
  disabled = false,
  eyes,
  type,
  label,
  onKeyDown,
  description_color,
  maxLength,
  position,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleToggleVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  useEffect(() => {
    if (eyes) {
      setIsPasswordVisible(true);
    }
  }, []);
  return (
    <InputWrapper width={width} height={height}>
      <InputBox>
        {label && <Label>{label}</Label>}
        <div style={{ position: 'relative' }}>
          <InputField
            type={isPasswordVisible ? 'password' : 'text'}
            value={value}
            input_type={input_type}
            onChange={onChange}
            icon={icon}
            disabled={disabled}
            placeholder={placeholder}
            height={height}
            onKeyDown={onKeyDown}
            maxLength={maxLength}
          />
          {icon && <IconWrapper>{icon}</IconWrapper>}
          {eyes && (
            <EyesnWrapper onClick={handleToggleVisibility}>
              {isPasswordVisible ? <EyesClose /> : <Eyes />}
            </EyesnWrapper>
          )}
        </div>
      </InputBox>
      {description && (
        <Description
          input_type={input_type}
          description_color={description_color}
          height={height}
          position={position}
        >
          {description_content}
        </Description>
      )}
    </InputWrapper>
  );
};

export default Input;
