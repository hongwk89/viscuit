import React, { useEffect, useState } from 'react';
import CreditCard, { CardType } from '../../components/CreditCard';
import { MainSection, SubSection } from '@/components/MainSection';
import styled from 'styled-components';
import {
  Cancel,
  Disabled,
  Font_M,
  Font_L,
  Weight_SizeL,
  Font_S,
  Weight_SizeS,
  ViscuitColor,
  Gray,
  Weight_SizeM,
} from '@/common/colors';
import Link from 'next/link';
import Radio from '../../components/Radio';
import Plus from '../../icons/plus.svg';
import Modal from '@/components/Modal';
import Input from '@/components/Input';
import Checkbox from '@/components/Checkbox';
import { useRouter } from 'next/router';
import FooterButton from '@/components/FooterButton';
import { Info } from '../signUp/info';
import Image from 'next/image';
import ContactInfo from '@/components/ContactInfo';
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

const CardWrapper = styled.section`
  display: flex;
  background: ${Disabled};
  padding: 30px 40px;
  border-radius: 10px;
  margin-top: 16px;
`;

const InfoWrapper = styled.section`
  display: flex;
  flex-direction: column;
  margin-right: 39px;
`;

const CardInfo = styled.label`
  font-size: ${Font_M};
  font-weight: ${Weight_SizeL};
  margin-bottom: 8px;
`;

const Boundary = styled.label`
  width: 1px;
  height: 180px;
  top: 0px;
  left: 1px;
  gap: 0px;
  opacity: 0px;
  background: ${Cancel};
  margin-right: 40px;
`;

const Container = styled.div`
  height: 100%;
  &:nth-of-type(2) {
    margin: 0 160px;
  }
`;

const Header = styled.label`
  display: flex;
  font-size: ${Font_M};
  font-weight: ${Weight_SizeL};
  margin-bottom: 16px;
  height: 16px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: start;
  margin: 12px 0;
  font-size: ${Font_S};
  font-weight: ${Weight_SizeS};
  line-height: 21px;

  span {
    text-align: left;
  }
  a {
    color: ${ViscuitColor};
  }
`;

const Label = styled.span`
  width: 135px;
`;

const Between = styled.div`
  display: flex;
  justify-content: space-between;

  a {
    color: ${ViscuitColor};
  }
`;

const UserCardWrapper = styled.section`
  display: flex;
  padding: 13px 0;
  gap: 16px;
  flex-wrap: wrap;
`;

const AddCard = styled.div`
  width: 280px;
  height: 160px;
  border-radius: 8px;
  background: ${Gray};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 23px;
  cursor: pointer;

  span {
    font-size: ${Font_S};
    font-weight: ${Weight_SizeM};
    line-height: 24px;
  }
`;

const ModalItems = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 24px;
  span {
    // font-size: ${Font_L};
    // font-weight: ${Weight_SizeS};
    width: 50%;
    max-width: 243px;
  }
  margin-bottom: 24px;
`;

const ModalMain = styled.div`
  display: flex;
  flex-direction: column;
`;

const ModalCardNumWrapper = styled.div`
  > div {
    display: flex;
    gap: 5px;
    &.cardInput {
      position: relative;
      ul {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 14px;
        display: flex;
        gap: 5px;
        li {
          display: flex;
          align-items: center;
        }
      }
    }
    &.emailCheck {
      padding: 16px;
    }
  }
`;

const ModalItemsWrapper = styled.div<{ box?: string }>`
  display: ${({ box }) => (box ? 'block' : 'flex')};
  justify-content: space-between;
  gap: 28px;
  ${({ box }) => box && 'margin-top:-24px'};
`;

const Items = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  label {
    height: 24px;
  }
`;

const BottomSection = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

interface FullInfo extends Info {
  email: string;
  number: string;
  name: string;
  date: string;
  code: string;
}
interface FullCardInfo extends FullInfo {
  id: string;
  cardNumber: string;
  cardUser: string;
  expirationDate: string;
  cardType: CardType;
}

// Payment Preferences 컴포넌트
const PaymentPreferences: React.FC = () => {
  const { token } = useToken();
  // 선택된 카드의 ID 상태를 관리
  const [selectedId, setSelectedId] = useState<CardType | string | number | ''>('1');
  const [pendingId, setPendingId] = useState<CardType | string | number | ''>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  //체크박스
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  //팝업모달
  const [firstPopUp, setFirstPopUp] = useState(false);
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const [info, setInfo] = useState<FullInfo>({
    email: '',
    number: '',
    name: '',
    date: '',
    code: '',
    company: '',
    country: '',
    address: '',
    address2: '',
    city: '',
    zipCode: '',
    mobileCode: '+1',
    mobileNumber: '',
  });

  const [cardInfoList, setCardInfoList] = useState<FullCardInfo[]>([
    {
      id: '1',
      cardType: 'visa', // options 정보 포함
      cardNumber: '1234 **** **** 5671',
      cardUser: 'Aisum INC',
      expirationDate: '12/24',
      email: 'rnd5@aisum.com',
      number: '1234 **** **** 5671',
      name: 'Aisum INC',
      date: '12/24',
      code: '123',
      company: 'Aisum INC',
      country: 'Korea',
      address: '578, Seolleung-ro',
      address2: 'Apt 1222B',
      city: 'Seoul',
      zipCode: '06153',
      mobileCode: '+82',
      mobileNumber: '10-1234-5678',
    },
    {
      id: '2',
      cardType: 'master', // options 정보 포함
      cardNumber: '5678 **** **** 1234',
      cardUser: 'User B',
      expirationDate: '11/23',
      email: 'userb@example.com',
      number: '5678 **** **** 1234',
      name: 'User B',
      date: '11/23',
      code: '456',
      company: 'User B Company',
      country: 'USA',
      address: '123 Main St',
      address2: 'Apt 2B',
      city: 'New York',
      zipCode: '10001',
      mobileCode: '+1',
      mobileNumber: '555-9876',
    },
    {
      id: '3',
      cardType: 'jcb', // options 정보 포함
      cardNumber: '8765 **** **** 4321',
      cardUser: 'Company C',
      expirationDate: '10/25',
      email: 'companyc@example.com',
      number: '8765 **** **** 4321',
      name: 'Company C',
      date: '10/25',
      code: '789',
      company: 'Company C',
      country: 'Japan',
      address: '1234 Tokyo St',
      address2: 'Apt 2B44',
      city: 'Tokyo',
      zipCode: '105-0001',
      mobileCode: '+81',
      mobileNumber: '03-1234-5678',
    },
    {
      id: '4',
      cardType: 'unionpay', // options 정보 포함
      cardNumber: '4321 **** **** 8765',
      cardUser: 'User D',
      expirationDate: '09/22',
      email: 'userd@example.com',
      number: '4321 **** **** 8765',
      name: 'User D',
      date: '09/22',
      code: '012',
      company: 'User D Inc',
      country: 'UK',
      address: '45 Oxford St',
      address2: 'Apt 6B',
      city: 'London',
      zipCode: 'W1D 1BS',
      mobileCode: '+44',
      mobileNumber: '20-7946-0958',
    },
  ]);

  const setValue = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
    key: string
  ) => {
    let { value } = e.target;

    if ((key === 'code' || key === 'mobileNumber' || key === 'zipCode') && /\D/g.test(value)) {
      return;
    }

    if (key === 'date' && /[^\d\/]/g.test(value)) {
      return;
    }

    if (key === 'number') {
      value = value.replace(/[^\d\s]/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
    }

    setInfo((prev) => ({ ...prev, [key]: value }));
  };
  const handleAddCard = () => {
    // 새로운 카드를 기본값으로 추가 (카드 타입은 visa로 설정)
    const newCard: FullCardInfo = {
      id: String(cardInfoList.length + 1),
      cardType: 'visa', // 기본 카드 타입
      cardNumber: info.number,
      cardUser: info.name,
      expirationDate: info.date,
      email: info.email,
      number: info.number,
      name: info.name,
      date: info.date,
      code: info.code,
      company: info.company,
      country: info.country,
      address: info.address,
      address2: info.address2,
      city: info.city,
      zipCode: info.zipCode,
      mobileCode: info.mobileCode,
      mobileNumber: info.mobileNumber,
    };
    axios
      .get('https://viscuitapi.aedi.ai/add_payment', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          date: newCard,
        },
      })
      .then((res) => {
        setCardInfoList((prevList) => [...prevList, newCard]);
      });
    // 기존 카드 목록에 새 카드 추가

    // 모달 닫기 및 상태 초기화
    closeModal();
    setInfo({
      email: '',
      number: '',
      name: '',
      date: '',
      code: '',
      company: '',
      country: '',
      address: '',
      address2: '',
      city: '',
      zipCode: '',
      mobileCode: '+1',
      mobileNumber: '',
    });
  };

  // 선택된 카드 정보 가져오기
  const selectedCardInfo = cardInfoList.find((card) => card.id === selectedId);

  // 라디오 버튼 상태 업데이트 핸들러
  const handleRadioChange = (id: CardType | string | number) => {
    setPendingId(id);
    setFirstPopUp(true);
  };

  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked);
    console.log('Checkbox is now:', checked);
  };

  const emailCheck = (checked: boolean) => {
    setEmail(checked);
  };

  const handleClick = () => {
    setOpen(true);
    setSelectedId(pendingId);
    setFirstPopUp(false);
  };

  const handleEditClick = () => {
    router.push({
      pathname: '/payment/paymentEdit',
      query: { cardInfoList: JSON.stringify(cardInfoList) }, // cardInfoList를 쿼리 파라미터로 전달
    });
  };

  useEffect(() => {
    axios
      .get('https://viscuitapi.aedi.ai/get_payment', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCardInfoList(res.data);
      });
  }, []);
  return (
    <>
      <MainSection title="Payment Preferences">
        <MainWrapper>
          <Title>Default payment preferences</Title>
          <CardWrapper>
            <InfoWrapper>
              <CardInfo>Payment method</CardInfo>
              <CreditCard
                type={selectedCardInfo?.cardType || 'visa'}
                cardNumber={selectedCardInfo?.cardNumber || '1234 **** **** 5671'}
                cardUser={selectedCardInfo?.cardUser || 'Aisum INC'}
                expirationDate={selectedCardInfo?.expirationDate || '12/24'}
                width="234px"
                height="134px"
                padding="12px"
              />
            </InfoWrapper>
            <Boundary />
            <Container>
              <Header>Billing Address</Header>
              <InfoRow>
                <Label>Payment Method</Label>
                <span>{selectedCardInfo?.cardType || 'visa'}</span>
              </InfoRow>
              <InfoRow>
                <Label>Card number</Label>
                <span>{selectedCardInfo?.cardNumber || '1234 **** **** 5671'}</span>
              </InfoRow>
              <InfoRow>
                <Label>Expiration date</Label>
                <span>{selectedCardInfo?.expirationDate || '12/24'}</span>
              </InfoRow>
            </Container>

            <Container style={{ width: '193px' }}>
              <Header></Header>
              <InfoRow>
                <Label>Billing Email</Label>
                <span>{selectedCardInfo?.email || 'rnd5@aisum.com'}</span>
              </InfoRow>
            </Container>
            <Boundary />
            <Container>
              <Header>Billing</Header>
              <InfoRow>
                <Label>정기 결제일</Label>
                <span>매월 1일</span>
              </InfoRow>
              <InfoRow>
                <Label>다음 결제일</Label>
                <span>2024.09.01</span>
              </InfoRow>
              <InfoRow>
                <Link href="/calculateReport">정산 리포트 확인</Link>
              </InfoRow>
            </Container>
          </CardWrapper>
        </MainWrapper>
      </MainSection>

      <SubSection>
        <MainWrapper>
          <Between>
            <Title>Payment methods</Title>
            {/* <Link href="/payment/paymentEdit">Edit</Link> */}
            <label style={{ color: 'blue', cursor: 'pointer' }} onClick={handleEditClick}>
              Edit
            </label>
          </Between>
          <UserCardWrapper>
            {cardInfoList.map((cardInfo, index) => (
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
                      selectedId={selectedId || ''}
                      onChange={handleRadioChange}
                    />
                  }
                  isSelected={selectedId === cardInfo.id}
                />
              </div>
            ))}
            <AddCard onClick={openModal}>
              <Plus />
              <span>Add payment method</span>
            </AddCard>
          </UserCardWrapper>
        </MainWrapper>
      </SubSection>

      {/* 모달 */}
      <Modal width="616px" isOpen={isModalOpen} onClose={closeModal} title="Add payment method">
        <ModalItems>
          <ModalMain>
            <span style={{ marginBottom: '8px' }}>Card number</span>
            <ModalCardNumWrapper>
              <div className="cardInput">
                <Input
                  placeholder="Card number"
                  width="100%"
                  height="48px"
                  value={info.number}
                  onChange={(e) => setValue(e, 'number')}
                  maxLength={19}
                />
                <ul>
                  <li>
                    <Image src="/imgs/visa.svg" alt="visa" width={43} height={14} />
                  </li>
                  <li>
                    <Image src="/imgs/master.svg" alt="master" width={32} height={20} />
                  </li>
                  <li>
                    <Image src="/imgs/jcb.svg" alt="jcb" width={32} height={24} />
                  </li>
                  <li>
                    <Image src="/imgs/unionpay.svg" alt="unionpay" width={35} height={22} />
                  </li>
                  <li>
                    <Image
                      src="/imgs/american_express.svg"
                      alt="american_express"
                      width={55}
                      height={18}
                    />
                  </li>
                  <li>
                    <Image src="/imgs/diners_club.svg" alt="diners_club" width={55} height={15} />
                  </li>
                  <li>
                    <Image src="/imgs/discover.svg" alt="discover" width={51} height={9} />
                  </li>
                </ul>
              </div>
            </ModalCardNumWrapper>
          </ModalMain>
          <ModalItemsWrapper>
            {/* <Items>
              <label>Name on card</label>
              <Input
                value={info.name}
                onChange={(e) => setValue(e, 'name')}
                width="100%"
                height="48px"
                placeholder="First name"
              />
            </Items> */}
          </ModalItemsWrapper>
          <ModalItemsWrapper>
            <Items>
              <label>Expiration date</label>
              <Input
                value={info.date}
                onChange={(e) => {
                  let value = e.target.value;

                  // 숫자만 허용하고, 첫 두 자리는 월(MM), 나머지 두 자리는 연도(YY)
                  value = value.replace(/\D/g, ''); // 숫자가 아닌 문자 제거
                  if (value.length > 2) {
                    value = value.slice(0, 2) + '/' + value.slice(2, 4); // MM/YY 형식으로 변환
                  }

                  // 최대 5글자로 제한 (MM/YY)
                  if (value.length <= 5) {
                    e.target.value = value; // e.target의 value를 업데이트
                    setValue(e, 'date'); // setValue 함수에 수정된 이벤트 객체 전달
                  }
                }}
                width="100%"
                height="48px"
                placeholder="MM/YY"
                maxLength={5}
              />
            </Items>
            <Items>
              <label>Security Code</label>
              <Input
                value={info.code}
                onChange={(e) => setValue(e, 'code')}
                width="100%"
                height="48px"
                placeholder="CVV/CVC"
              />
            </Items>
          </ModalItemsWrapper>
          {/* <ModalItemsWrapper>
            <Items>
              <label
                style={{
                  fontSize: Font_L,
                  fontWeight: Weight_SizeL,
                  marginBottom: '12px',
                }}
              >
                Billing address
              </label>
              <Checkbox
                label="Use Existing Address"
                checked={isChecked}
                onChange={handleCheckboxChange}
                id="example-checkbox"
              />
            </Items>
          </ModalItemsWrapper>
          <ModalItemsWrapper box="box">
            <ContactInfo info={info} setValue={setValue} gap="24px" />
          </ModalItemsWrapper> */}
          <ModalItemsWrapper>
            <Items>
              <label>Billing contact email</label>
              <div style={{ padding: '16px' }}>
                <Checkbox
                  id="email"
                  label="이메일 주소(아이디)와 동일"
                  checked={email}
                  onChange={emailCheck}
                />
              </div>
              <Input
                value={info.email}
                onChange={(e) => setValue(e, 'email')}
                width="100%"
                height="48px"
                placeholder="Email"
              />
            </Items>
          </ModalItemsWrapper>
          <BottomSection>
            <FooterButton
              width="148px"
              height="48px"
              label="취소"
              button_type="Cancel"
              onClick={closeModal}
              fill={false}
            />
            <FooterButton width="148px" height="48px" label="추가" onClick={handleAddCard} />
          </BottomSection>
        </ModalItems>
      </Modal>
      <Popup
        open={firstPopUp}
        close={() => setFirstPopUp(false)}
        click={() => handleClick()}
        title="결제 변경하시겠습니까?"
        buttonName="변경"
        cancel={true}
        popupStyle="landscape"
        closeBtn={true}
      />
      <Popup
        open={open}
        close={() => setFirstPopUp(false)}
        click={() => setOpen(false)}
        title="카드 변경이 완료되었습니다."
        popupStyle="landscape"
        buttonName="확인"
        closeBtn={false}
      />
    </>
  );
};

export default PaymentPreferences;
