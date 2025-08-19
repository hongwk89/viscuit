import { InputDisable } from '@/common/colors';
import BeforeLoginTemplete from '@/components/BeforeLoginTemplete';
import Button from '@/components/ButtonComponent';
import ContactInfo from '@/components/ContactInfo';
import SignUpOrder from '@/components/SignUpOrder';
import useContact from '@/hooks/zustand/useContact';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect, useState } from 'react';
import styled from 'styled-components';

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

const H4 = styled.h4`
  margin-top: 32px;
  font-size: 20px;
  font-weight: bold;
`;

const Btn = styled.div`
  margin-top: 50px;
`;

export interface Info {
  company: string;
  country: string;
  address: string;
  address2: string;
  city: string;
  zipCode: string;
  mobileCode: string;
  mobileNumber: string;
  manager?: string;
}

const info: React.FC = (): ReactNode => {
  const [info, setInfo] = useState<Info>({
    company: '',
    country: '',
    address: '',
    address2: '',
    city: '',
    zipCode: '',
    mobileCode: '+1',
    mobileNumber: '',
    manager: '',
  });
  const [on, setOn] = useState(true);
  const router = useRouter();
  const { setContact } = useContact();

  const setValue = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
    key: string
  ) => {
    if ((key === 'mobileNumber' || key === 'zipCode') && /\D/g.test(e.target.value)) {
      return;
    }

    setInfo((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const nextStep = () => {
    setContact(info);

    router.push('/signUp/bill');
  };

  useEffect(() => {
    if (
      info.company !== '' &&
      info.country !== '' &&
      info.address !== '' &&
      info.city !== '' &&
      info.zipCode !== ''
    ) {
      setOn(false);
    }
  }, [info]);

  return (
    <BeforeLoginTemplete>
      <SignUpOrder order={2} />
      <H3>
        Sign up<span>필수 입력</span>
      </H3>
      <H4>Contact information</H4>
      <ContactInfo info={info} setValue={setValue} />
      <Btn>
        <Button
          label="다음"
          align="center"
          width="312px"
          height="56px"
          disabled={on}
          onClick={nextStep}
        />
      </Btn>
    </BeforeLoginTemplete>
  );
};

export default info;
