import { Font_L, Weight_SizeS } from '@/common/colors';
import Button from '@/components/ButtonComponent';
import Input from '@/components/Input';
import { MainSection } from '@/components/MainSection';
import useToken from '@/hooks/zustand/useToken';
import axios from 'axios';
import React, { ReactNode, useEffect, useState } from 'react';
import styled from 'styled-components';

const MainWrapper = styled.div`
  padding: 30px;
`;

const Items = styled.section`
  display: flex;
  align-items: center;
  width: 100%;
  span {
    font-size: ${Font_L};
    font-weight: ${Weight_SizeS};
    width: 50%;
    max-width: 120px;
  }
  input {
    margin-right: 26px;
  }
  div {
    display: flex;

    gap: 16px;
  }
`;

const Apikey: React.FC = (): ReactNode => {
  const { token } = useToken();
  const [apiKey, setApiKey] = useState('dkfajk51234kdf');
  const addFunction = () => {
    axios
      .get('https://viscuitapi.aedi.ai/add_api_key', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setApiKey(res.data);
      });
  };

  const deleteFunction = () => {
    axios
      .get('https://viscuitapi.aedi.ai/delete_api_key', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setApiKey('');
      });
  };

  const changeFunction = () => {
    axios
      .get('https://viscuitapi.aedi.ai/renew_api_key', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setApiKey(res.data);
      });
  };

  useEffect(() => {
    axios
      .get('https://viscuitapi.aedi.ai/get_api_key', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setApiKey(res.data);
      });
  }, []);
  return (
    <MainSection title="API KEY" label="Add API KEY" onClick={() => addFunction()}>
      <MainWrapper>
        <Items>
          <span>API KEY</span>
          <Input value={apiKey} disabled={true} width="400px" />
          <div>
            <Button
              label="Delete"
              button_type="Error"
              onClick={() => deleteFunction()}
              width="150px"
              fill={false}
            />
            <Button
              label="Renewal"
              button_type="Thirdary"
              onClick={() => changeFunction()}
              width="150px"
              fill={false}
            />
          </div>
        </Items>
      </MainWrapper>
    </MainSection>
  );
};

export default Apikey;
