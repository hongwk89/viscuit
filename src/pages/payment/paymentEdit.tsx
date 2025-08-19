import React, { useEffect, useState } from 'react';
import { MainSection } from '../../components/MainSection';
import styled from 'styled-components';
import { Disabled, Font_L, Font_S, Gray, Weight_SizeL, Weight_SizeM } from '../../common/colors';
import Plus from '../../icons/plus.svg';
import CreditCard, { CardType } from '@/components/CreditCard';
import { useRouter } from 'next/router';
import Radio from '@/components/Radio';
import Popup from '@/components/Popup';
import axios from 'axios';
import useToken from '@/hooks/zustand/useToken';

// 스타일 정의
const MainWrapper = styled.div`
  padding: 30px;
`;

const Title = styled.h1`
  font-size: ${Font_L};
  font-weight: ${Weight_SizeL};
`;

const UserCardWrapper = styled.section`
  display: flex;
  padding: 13px 0;
  gap: 16px;
  flex-wrap: wrap;
`;

interface FullCardInfo {
  id: string;
  cardType: CardType;
  cardNumber: string;
  cardUser: string;
  expirationDate: string;
}

const PaymentEdit: React.FC = () => {
  const { token } = useToken();
  const [selectedId, setSelectedId] = useState<CardType | string | number | ''>('');
  const [pendingId, setPendingId] = useState<CardType | string | number | ''>('');
  const [cardInfoList, setCardInfoList] = useState<FullCardInfo[]>([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const handleRadioChange = (id: CardType | string | number) => {
    setSelectedId(id);
    setPendingId(id);
    setOpen(true);
  };
  const handleCardClick = (id: string) => {
    // 해당 카드를 삭제하는 로직
    axios
      .get('https://viscuitapi.aedi.ai/get_payment', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          date: id,
        },
      })
      .then((res) => {
        const updatedCardInfoList = cardInfoList.filter((card) => card.id !== id);
        setCardInfoList(updatedCardInfoList);
        setOpen(false);
      });
  };

  useEffect(() => {
    if (router.query.cardInfoList) {
      try {
        const parsedList = JSON.parse(router.query.cardInfoList as string);
        if (Array.isArray(parsedList)) {
          const isValidData = parsedList.every(
            (item) =>
              typeof item.id === 'string' &&
              typeof item.cardType === 'string' &&
              typeof item.cardNumber === 'string' &&
              typeof item.cardUser === 'string' &&
              typeof item.expirationDate === 'string'
          );
          if (isValidData) {
            setCardInfoList(parsedList);
          } else {
            console.error('Invalid cardInfoList data format');
          }
        }
      } catch (error) {
        console.error('Error parsing cardInfoList:', error);
      }
    }
  }, [router.query.cardInfoList]);

  return (
    <MainSection title="등록된 결제수단">
      <MainWrapper>
        <Title>Payment methods</Title>

        <UserCardWrapper>
          {cardInfoList.map((cardInfo) => (
            <div
              key={cardInfo.id}
              onClick={() => handleRadioChange(cardInfo.id)}
              style={{ cursor: 'pointer' }}
            >
              <CreditCard
                type={cardInfo.cardType}
                cardNumber={cardInfo.cardNumber}
                cardUser={cardInfo.cardUser}
                expirationDate={cardInfo.expirationDate}
                padding="12px"
                radio={
                  <Radio
                    id={cardInfo.id}
                    icon={true}
                    selectedId={selectedId || ''}
                    onChange={() => handleRadioChange(cardInfo.id)}
                  />
                }
                isSelected={selectedId === cardInfo.id}
              />
            </div>
          ))}
        </UserCardWrapper>
      </MainWrapper>
      <Popup
        open={open}
        close={() => setOpen(false)}
        click={() => handleCardClick(String(pendingId))}
        title="삭제 하시겠습니까?"
        cancel={true}
        popupStyle="landscape"
        buttonName="삭제"
        closeBtn={true}
      />
    </MainSection>
  );
};

export default PaymentEdit;
