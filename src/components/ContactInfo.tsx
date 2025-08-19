import Input from '@/components/Input';
import SelectBox from '@/components/SelectBox';
import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';

const InputAreaWrap = styled.div<{ flex?: string }>`
  display: flex;
  ${({ flex }) => flex && 'flex-direction: column'};
  gap: 16px;
  > div {
    width: 50%;
  }
`;

const InputArea = styled.div<{ flex?: string; gap?: string }>`
  margin-top: ${({ gap }) => (gap ? gap : '32px')};
  ${({ flex }) => flex && 'display: flex'};
  &:nth-of-type(1) {
    margin-top: ${({ gap }) => (gap ? gap : '32px')};
  }
  > h5 {
    font-size: 16px;
    font-weight: normal;
    margin: 0 0 10px;
    &.require::after {
      content: '*';
      color: #fc5058;
    }
  }
  > div {
    display: flex;
    gap: 5px;
  }
`;

const countries = [
  {
    code: 'TW',
    value: 'Taiwan',
    label: 'Taiwan',
    number: '+886',
  },
  {
    code: 'ID',
    value: 'Indonesia',
    label: 'Indonesia',
    number: '+62',
  },
  {
    code: 'LA',
    value: 'Laos',
    label: 'Laos',
    number: '+856',
  },
  {
    code: 'CN',
    value: 'China',
    label: 'China',
    number: '+86',
  },
  {
    code: 'SG',
    value: 'Singapore',
    label: 'Singapore',
    number: '+65',
  },
  {
    code: 'KP',
    value: 'North Korea',
    label: 'North Korea',
    number: '+850',
  },
  {
    code: 'KH',
    value: 'Cambodia',
    label: 'Cambodia',
    number: '+855',
  },
  {
    code: 'MY',
    value: 'Malaysia',
    label: 'Malaysia',
    number: '+60',
  },
  {
    code: 'MO',
    value: 'Macau',
    label: 'Macau',
    number: '+853',
  },
  {
    code: 'TH',
    label: 'Thailand',
    value: 'Thailand',
    number: '+66',
  },
  {
    code: 'PH',
    value: 'Philippines',
    label: 'Philippines',
    number: '+63',
  },
  {
    code: 'TL',
    value: 'Timor-Leste',
    label: 'Timor-Leste',
    number: '+670',
  },
  {
    code: 'VN',
    value: 'Vietnam',
    label: 'Vietnam',
    number: '+84',
  },
  {
    code: 'HK',
    value: 'Hong Kong',
    label: 'Hong Kong',
    number: '+852',
  },
  {
    code: 'JP',
    value: 'Japan',
    label: 'Japan',
    number: '+81',
  },
  {
    code: 'US',
    value: 'United States',
    label: 'United States',
    number: '+1',
  },
  {
    code: 'MM',
    value: 'Myanmar',
    label: 'Myanmar',
    number: '+95',
  },
  {
    code: 'BN',
    value: 'Brunei',
    label: 'Brunei',
    number: '+673',
  },
  {
    code: 'MN',
    value: 'Mongolia',
    label: 'Mongolia',
    number: '+976',
  },
];

interface Info {
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

interface ContactInfoProps {
  flex?: string;
  info: Info;
  setValue: (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
    key: string
  ) => void;
  gap?: string;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ flex, info, setValue, gap }): ReactNode => {
  const updatedCountries = countries.map((country) => ({
    ...country,
    value: country.number,
    label: country.number,
  }));

  return (
    <>
      <InputArea flex={flex} gap={gap}>
        <h5 className="require">Company name</h5>
        <div>
          <Input
            placeholder="Company name"
            width="672px"
            height="48px"
            value={info.company}
            onChange={(e) => setValue(e, 'company')}
          />
        </div>
      </InputArea>
      <InputArea flex={flex} gap={gap}>
        <h5 className="require">Country</h5>
        <div>
          <SelectBox
            options={countries}
            value={info.country}
            onChange={(e) => setValue(e, 'country')}
            height="48px"
            placeholder="Country 선택"
          />
        </div>
      </InputArea>
      <InputArea flex={flex} gap={gap}>
        <h5 className="require">Address</h5>
        <div>
          <Input
            placeholder="Street Address"
            width="672px"
            height="48px"
            value={info.address}
            onChange={(e) => setValue(e, 'address')}
          />
        </div>
      </InputArea>
      <InputArea flex={flex} gap={gap}>
        <h5>Address Line 2</h5>
        <div>
          <Input
            placeholder="Apartment, suite, unit, building, floor, etc"
            width="672px"
            height="48px"
            value={info.address2}
            onChange={(e) => setValue(e, 'address2')}
          />
        </div>
      </InputArea>
      <InputAreaWrap flex={flex}>
        <InputArea flex={flex} gap={gap}>
          <h5 className="require">City</h5>
          <div>
            <Input
              placeholder="City"
              width="100%"
              height="48px"
              value={info.city}
              onChange={(e) => setValue(e, 'city')}
            />
          </div>
        </InputArea>
        <InputArea flex={flex} gap={gap}>
          <h5 className="require">Zip code</h5>
          <div>
            <Input
              placeholder="Zip code"
              width="100%"
              height="48px"
              value={info.zipCode}
              onChange={(e) => setValue(e, 'zipCode')}
            />
          </div>
        </InputArea>
        <InputArea flex={flex} gap={gap}>
          <h5 className="require">담당자 이름</h5>
          <div>
            <Input
              placeholder="담당자 이름"
              width="100%"
              height="48px"
              value={info.manager}
              onChange={(e) => setValue(e, 'manager')}
            />
          </div>
        </InputArea>
      </InputAreaWrap>
      <InputArea flex={flex} gap={gap}>
        <h5>Mobile numbers</h5>
        <div>
          <SelectBox
            options={updatedCountries}
            value={info.mobileCode}
            onChange={(e) => setValue(e, 'mobileCode')}
            width="150px"
            height="48px"
          />
          <Input
            placeholder="01012345678"
            width="100%"
            height="48px"
            value={info.mobileNumber}
            onChange={(e) => setValue(e, 'mobileNumber')}
          />
        </div>
      </InputArea>
    </>
  );
};

export default ContactInfo;
