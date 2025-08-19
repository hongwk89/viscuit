import { Cancel, InputDisable, ViscuitColor } from '@/common/colors';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect, useState } from 'react';
import styled from 'styled-components';
import Popup from '@/components/Popup';
import BeforeLoginTemplete from '@/components/BeforeLoginTemplete';
import SignUpOrder from '@/components/SignUpOrder';
import CardForm, { CommonInputArea } from '@/components/CardForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Link from 'next/link';
import useContact from '@/hooks/zustand/useContact';
import Checkbox from '@/components/Checkbox';
import ButtonComponent from '@/components/ButtonComponent';
import Input from '@/components/Input';
import { email_regexp } from '@/utils/regExp';
import axios from 'axios';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

const H3 = styled.h3`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 26px;
  > span {
    font-size: 14px;
    color: ${InputDisable};
    font-weight: 500;
    &::before {
      content: '*';
      color: #fc5058;
    }
  }
`;

const Notice = styled.p`
  padding: 16px 0;
  text-align: center;
  background: #e9edfb;
  font-size: 14px;
  line-height: 1.3;
  margin-top: 32px;
`;
const H4 = styled.h4`
  margin-top: 32px;
  font-size: 20px;
  font-weight: bold;
`;

const Agree = styled.div`
  margin-top: 24px;
  padding-top: 30px;
  border-top: 1px solid ${Cancel};
  a {
    color: ${ViscuitColor};
  }
`;

const Btn = styled.div`
  margin-top: 50px;
`;

export interface CardInfo {
  email: string;
  number: string;
  zipCode: string;
  date: string;
  code: string;
}

const info: React.FC = (): ReactNode => {
  const [email, setEmail] = useState('');
  const [emailChecked, setEmailChecked] = useState(false);
  const [agree, setAgree] = useState(false);
  const [cardVerify, setCardVerify] = useState(false);
  const [cardToken, setCardToken] = useState('');
  const [popup, setPopup] = useState(false);
  const [on, setOn] = useState(true);
  const { setContact, setContactEmail, setPassword, ...userInfo } = useContact();
  const router = useRouter();

  const emailCheck = (checked: boolean) => {
    setEmailChecked(checked);
  };

  const agreeCheck = (checked: boolean) => {
    setAgree(checked);
  };

  const handleSubmit = () => {
    const formData = { ...userInfo, cardToken };

    if (userInfo.mobileNumber) {
      formData.phone = userInfo.mobileCode + userInfo.mobileNumber;
    } else {
      delete formData.phone;
    }
    formData.bill_email = email;
    delete formData.mobileCode;
    delete formData.mobileNumber;

    axios
      .post('https://viscuitapi.aedi.ai/sign_up', { ...formData })
      .then((res) => {
        if (res.data.status === 'S') {
          setPopup(true);
        } else {
          alert(res.data.msg);
        }
      })
      .catch((err) => console.log(err));
  };

  const goHome = () => {
    router.push('/dailyReport');
  };

  useEffect(() => {
    if (email_regexp.test(email) && agree && cardVerify) {
      setOn(false);
    } else {
      setOn(true);
    }
  }, [email, agree, cardVerify]);

  useEffect(() => {
    if (emailChecked) {
      setEmail(userInfo.email);
    } else {
      setEmail('');
    }
  }, [emailChecked]);

  return (
    <>
      <BeforeLoginTemplete>
        <SignUpOrder order={3} />
        <H3>
          Sign up<span>필수 입력</span>
        </H3>
        <Notice>
          카드 정보의 유효성 검증을 위해 1 USD가 결제됩니다.
          <br />
          검증이 완료되면 해당 금액은 바로 환불 처리됩니다.
        </Notice>
        <H4>Billing Info</H4>
        <Elements stripe={stripePromise}>
          <CardForm setCardVerify={setCardVerify} setCardToken={setCardToken} />
        </Elements>
        <CommonInputArea>
          <h5 className="require">Billing email</h5>
          <div className="emailCheck">
            <Checkbox
              id="email"
              label="이메일 주소(아이디)와 동일"
              checked={emailChecked}
              onChange={emailCheck}
            />
          </div>
          <Input
            placeholder="빌링 이메일 입력"
            width="100%"
            height="48px"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </CommonInputArea>
        <Agree>
          <Checkbox id="joinAgree" checked={agree} onChange={agreeCheck}>
            <Link href="/" target="_blank">
              <a target="_blank">VISCUIT 이용약관</a>
            </Link>
            과{' '}
            <Link href="/" target="_blank">
              <a target="_blank">개인정보 수집 및 이용</a>
            </Link>
            에 동의합니다.
          </Checkbox>
        </Agree>
        <Btn>
          <ButtonComponent
            label="가입하기"
            align="center"
            width="312px"
            height="56px"
            disabled={on}
            onClick={handleSubmit}
          />
        </Btn>
      </BeforeLoginTemplete>
      <Popup
        open={popup}
        click={goHome}
        title="회원가입이<br/>완료되었습니다!"
        buttonName="Back to Home"
        closeBtn={false}
      />
    </>
  );
};

export default info;
