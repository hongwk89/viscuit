import React from 'react';
import styled from 'styled-components';
import CheckBoxOn from '../icons/checkBox_on.svg';
import CheckBoxOff from '../icons/checkBox_off.svg';

interface CheckboxProps {
  children?: React.ReactNode;
  label?: string; // 체크박스 옆에 표시될 라벨
  checked?: boolean; // 체크박스가 체크된 상태인지
  onChange?: (checked: boolean) => void; // 체크박스 상태가 변경될 때 호출되는 함수
  disabled?: boolean; // 체크박스를 비활성화할지 여부
  id: string; // 체크박스에 사용할 고유 ID
  name?: string; // 체크박스의 이름
  className?: string; // 커스텀 CSS 클래스
}

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledCheckbox = styled.div<{ checked: boolean; disabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 150ms;

  svg {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
`;

const CheckboxLabel = styled.label`
  margin-left: 8px;
  cursor: pointer;
`;

const Checkbox: React.FC<CheckboxProps> = ({
  children,
  label = '',
  checked = false,
  onChange,
  disabled = false,
  id,
  name,
  className,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.checked);
    }
  };

  return (
    <CheckboxContainer className={className}>
      <HiddenCheckbox
        id={id}
        name={name}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
      />
      <StyledCheckbox checked={checked} disabled={disabled} onChange={handleChange}>
        {checked ? (
          <label htmlFor={id}>
            <CheckBoxOn />
          </label>
        ) : (
          <label htmlFor={id}>
            <CheckBoxOff />
          </label>
        )}
      </StyledCheckbox>
      <CheckboxLabel htmlFor={id}>{children ? children : label}</CheckboxLabel>
    </CheckboxContainer>
  );
};

export default Checkbox;
