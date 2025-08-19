import React from 'react';
import styled from 'styled-components';
import RadioOn from '../icons/radio_on.svg';
import RadioOff from '../icons/radio_off.svg';
import Trash from '../icons/trash.svg';
import { CardType } from './CreditCard';

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const RadioInput = styled.input`
  display: none;
`;

const CustomRadio = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;

const RadioIcon = styled.div`
  width: 100%;
  height: 100%;
`;

type RadioProps = {
  children?: React.ReactNode;
  id: CardType | string | number;
  selectedId: string | number;
  onChange: (id: CardType | string | number) => void;
  icon?: React.ReactNode;
};

const Radio: React.FC<RadioProps> = ({ children, id, selectedId, onChange, icon }) => {
  const isSelected = id === selectedId;

  return (
    <RadioLabel>
      <RadioInput type="radio" checked={isSelected} onChange={() => onChange(id)} />
      <CustomRadio>
        <RadioIcon>{icon ? <Trash /> : isSelected ? <RadioOn /> : <RadioOff />}</RadioIcon>
      </CustomRadio>
      {children}
    </RadioLabel>
  );
};

export default Radio;
