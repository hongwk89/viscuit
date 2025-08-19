import Image from 'next/image';
import styled from 'styled-components';
import { useState } from 'react';
import { Cancel, ViscuitColor } from '@/common/colors';
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { BeatLoader } from 'react-spinners';

const InputAreaWrap = styled.div`
  display: flex;
  align-items: end;
  gap: 16px;
`;

const VerifyButton = styled.button<{ loading: boolean }>`
  height: 42.8px;
  width: 150px;
  background: #fff;
  color: ${ViscuitColor};
  border-radius: 5px;
  border: 1px solid ${ViscuitColor};
  cursor: pointer;
  ${(props) => props.loading && `padding-top:2px`}
`;

export const CommonInputArea = styled.div`
  margin-top: 32px;
  > h5 {
    font-size: 16px;
    font-weight: normal;
    margin: 0 0 10px;
    &.require::after {
      content: '*';
      color: #fc5058;
    }
  }
  .emailCheck {
    padding: 16px;
  }
`;

const InputArea = styled(CommonInputArea)`
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
    .card_number,
    .card_exp,
    .card_cvc {
      border: 1px solid ${Cancel};
      border-radius: 5px;
      padding: 12px 16px;
    }
    .card_number {
      width: 672px;
    }
    .card_exp,
    .card_cvc {
      width: 245px;
    }
  }
  > label {
    padding: 16px;
  }
`;

const cardStyle = {
  style: {
    base: {
      fontSize: '16px', // 원하는 폰트 크기 설정
    },
  },
};

interface CardFormProps {
  setCardVerify: React.Dispatch<React.SetStateAction<boolean>>;
  setCardToken: React.Dispatch<React.SetStateAction<string>>;
}

const CardForm: React.FC<CardFormProps> = ({ setCardVerify, setCardToken }) => {
  const [loading, setLoading] = useState(false);

  const [cardType, setCardType] = useState('');

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async () => {
    if (!stripe || !elements) {
      alert('Stripe.js가 아직 로드되지 않았습니다. 조금 뒤 다시 시도해주세요');
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);

    if (!cardElement) {
      alert('카드 입력 요소가 없습니다.');
      return;
    }

    const { token, error } = await stripe.createToken(cardElement);

    if (error) {
      alert(error.message);
      return;
    }

    setLoading(true);

    // 서버에 토큰 전송 로직 추가
    const res = await fetch('/api/validate-card', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: token.id }),
    });

    const data = await res.json();

    if (data.success) {
      setCardToken(token.id);
      setCardVerify(true);
      alert(data.message);
    } else {
      setCardVerify(false);
      alert(data.error);
    }

    setLoading(false);
  };

  const handleCardNumberChange = (event: any) => {
    if (event.empty) {
      setCardType('');
      return;
    }
    const cardBrand = event.brand;

    setCardType(cardBrand);
  };

  return (
    <>
      <InputArea>
        <h5 className="require">Card number</h5>
        <div className="cardInput">
          <CardNumberElement
            className="card_number"
            onChange={handleCardNumberChange}
            options={cardStyle}
          />
          <ul>
            {(cardType === '' || cardType === 'visa') && (
              <li>
                <Image src="/imgs/visa.svg" alt="visa" width={43} height={14} />
              </li>
            )}
            {(cardType === '' || cardType === 'mastercard') && (
              <li>
                <Image src="/imgs/master.svg" alt="master" width={32} height={20} />
              </li>
            )}
            {(cardType === '' || cardType === 'jcb') && (
              <li>
                <Image src="/imgs/jcb.svg" alt="jcb" width={32} height={24} />
              </li>
            )}
            {(cardType === '' || cardType === 'unionpay') && (
              <li>
                <Image src="/imgs/unionpay.svg" alt="unionpay" width={35} height={22} />
              </li>
            )}
            {(cardType === '' || cardType === 'american_express') && (
              <li>
                <Image
                  src="/imgs/american_express.svg"
                  alt="american_express"
                  width={55}
                  height={18}
                />
              </li>
            )}
            {(cardType === '' || cardType === 'diners_club') && (
              <li>
                <Image src="/imgs/diners_club.svg" alt="diners_club" width={55} height={15} />
              </li>
            )}
            {(cardType === '' || cardType === 'discover') && (
              <li>
                <Image src="/imgs/discover.svg" alt="discover" width={51} height={9} />
              </li>
            )}
          </ul>
        </div>
      </InputArea>
      <InputAreaWrap>
        <InputArea>
          <h5 className="require">Expiration date</h5>
          <div>
            <CardExpiryElement className="card_exp" options={cardStyle} />
          </div>
        </InputArea>
        <InputArea>
          <h5 className="require">Security Code</h5>
          <div>
            <CardCvcElement className="card_cvc" options={cardStyle} />
          </div>
        </InputArea>
        <VerifyButton type="button" disabled={loading} onClick={handleSubmit} loading={loading}>
          {loading ? <BeatLoader size={12} color={ViscuitColor} /> : '인증하기'}
        </VerifyButton>
      </InputAreaWrap>
    </>
  );
};
export default CardForm;
