import React from 'react';
import styled from 'styled-components';
import Button from '@/components/ButtonComponent';
import { Shadow } from '@/common/colors';

const Main = styled.section`
  position: relative;
  flex: 1;
  height: 100%;
  margin: 112px 50px 134px 50px;
`;

const Title = styled.div`
  font-size: 26px;
  font-weight: 700;
`;

const Between = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Section = styled.section<{ label?: string }>`
  flex: 1;
  min-height: auto;
  gap: 60px;
  border-radius: 10px;
  background: #ffffff;
  margin-top: ${({ label }) => (label ? '14px' : '32px')};
  box-shadow: ${Shadow};
`;

const SubMain = styled.section`
  flex: 1;
  height: 100%;
  margin: -102px 50px 134px 50px;
`;

interface MainSectionProps {
  title: string;
  children: React.ReactNode;
  label?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

interface SubSectionProps {
  children: React.ReactNode;
}

export const MainSection: React.FC<MainSectionProps> = ({ title, children, label, onClick }) => {
  return (
    <Main>
      <Between>
        <Title>{title}</Title>
        {label && (
          <Button
            icon="plus"
            label={label}
            button_type="ViscuitColor"
            onClick={onClick}
            width="auto"
          />
        )}
      </Between>
      <Section label={label}>{children}</Section>
    </Main>
  );
};

export const SubSection: React.FC<SubSectionProps> = ({ children }) => {
  return (
    <SubMain>
      <Section>{children}</Section>
    </SubMain>
  );
};
