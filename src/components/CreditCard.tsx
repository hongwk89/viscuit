import { Font_SS, ViscuitColor, Weight_SizeS } from '@/common/colors';
import React from 'react';
import styled from 'styled-components';
// import Radio from './radio';

// 카드 타입 정의
export type CardType = 'visa' | 'master' | 'jcb' | 'unionpay';

// 카드 컴포넌트에 전달할 props 타입 정의
interface CreditCardProps {
  type: CardType;
  cardNumber: string;
  cardUser: string;
  expirationDate: string;
  width?: string;
  height?: string;
  padding?: string;
  radio?: React.ReactNode;
  isSelected?: boolean; // 카드가 선택되었는지를 나타내는 prop
}

// 카드 타입에 따른 배경색 설정
const backgroundColors: { [key in CardType]: string } = {
  visa: '#E9EDFB',
  master: '#FFF2D8',
  jcb: '#DFF7E9',
  unionpay: '#E9ECEE',
};

// 스타일드 컴포넌트로 카드 스타일 정의
const CardContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isSelected', // 필터링 설정
})<{
  type: CardType;
  width: string;
  height: string;
  padding: string;
  isSelected: boolean;
}>`
  position: relative;
  width: ${({ width }) => (width ? width : `280px`)};
  height: ${({ height }) => (height ? height : `160px`)};
  border-radius: 8px;
  padding: ${({ padding }) => (padding ? padding : `16px`)};
  background-color: ${({ type }) => backgroundColors[type]};
  display: flex;
  flex-direction: column;
  justify-content: end;
  color: #333;
  border: ${({ isSelected }) =>
    isSelected ? `1px solid${ViscuitColor}` : '1px solid transparent'}; // 선택 시 파란색 테두리
`;

const CardLogo = styled.section`
  position: absolute;
  right: 16px;
  top: 16px;
`;

const CardNumber = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${Font_SS};
  font-weight: ${Weight_SizeS};
  line-height: 18px;
`;

const CardUser = styled.div`
  font-size: ${Font_SS};
  font-weight: ${Weight_SizeS};
  margin-bottom: 4px;
  line-height: 18px;
`;

const RadioWrapper = styled.div`
  position: absolute;
  left: 16px;
  top: 16px;
`;

// 신용카드 컴포넌트
const CreditCard: React.FC<CreditCardProps> = ({
  type,
  cardNumber,
  cardUser,
  expirationDate,
  width = '280px',
  height = '160px',
  padding = '16px',
  radio,
  isSelected = false,
}) => {
  return (
    <CardContainer
      type={type}
      width={width}
      height={height}
      padding={padding}
      isSelected={isSelected}
    >
      {radio && <RadioWrapper>{radio}</RadioWrapper>}
      <CardLogo>
        <img src={`/imgs/${type}.png`} alt={`${type} logo`} />
      </CardLogo>
      <CardUser>{cardUser}</CardUser>
      <CardNumber>
        {cardNumber}
        <span>{`expires at ${expirationDate}`}</span>
      </CardNumber>
    </CardContainer>
  );
};

export default CreditCard;
