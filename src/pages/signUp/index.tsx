import { Secondary } from '@/common/colors';
import BeforeLoginTemplete from '@/components/BeforeLoginTemplete';
import Button from '@/components/ButtonComponent';
import Input from '@/components/Input';
import SignUpOrder from '@/components/SignUpOrder';
import useInput from '@/hooks/useInput';
import useContact from '@/hooks/zustand/useContact';
import { email_regexp, pw_regexp } from '@/utils/regExp';
import axios from 'axios';
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
    color: ${Secondary};
    font-weight: 500;
  }
`;

const InputArea = styled.div`
  margin-top: 32px;
  &:nth-of-type(1) {
    margin-top: 32px;
  }
  > h5 {
    font-size: 16px;
    font-weight: normal;
    margin: 0 0 10px;
  }
  > div {
    display: flex;
    gap: 5px;
  }
`;

const Btn = styled.div`
  margin-top: 50px;
`;

export const errorText = [
  { text: '비밀번호가 일치하지 않습니다. 다시 입력해 주세요.', color: '#FF8126' },
  { text: '비밀번호가 일치합니다.', color: '#17A15F' },
];

const signUp: React.FC = (): ReactNode => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [pass, setPass] = useState(false);
  const [disalbed, setDisabled] = useState(false);
  const [pw, setPw] = useState(['', '']);
  const [on, setOn] = useState(true);
  const router = useRouter();
  const { setContactEmail, setPassword } = useContact();

  const setFirstPw = (val: string) => {
    setPw((prev) => [val, prev[1]]);
  };

  const setSecondPw = (val: string) => {
    setPw((prev) => [prev[0], val]);
  };

  const pw1Input = useInput('', setFirstPw);
  const pw2Input = useInput('', setSecondPw);

  const sendCode = () => {
    if (!email_regexp.test(email)) {
      alert('이메일 형식에 맞지 않습니다.');
      return;
    }

    let formData = new FormData();
    formData.append('email',email);

    axios
      .post('https://viscuitapi.aedi.ai/send_code/', 
        formData
      )
      .then((res) => {
        if (res.data.status === 'S') {
          setPass(true);
        } else {
          alert(res.data.msg);
        }
      })
      .catch((err) => console.log(err));
  };

  const verifyCode = () => {
    setDisabled(true);
    axios
      .post('https://viscuitapi.aedi.ai/verify_code', {
        code: code,
      })
      .then((res) => {
        if (res.data.status === 'S') {
          setDisabled(true);
        } else {
          alert(res.data.msg);
        }
      })
      .catch((err) => console.log(err));
  };

  const nextStep = () => {
    setContactEmail(email);
    setPassword(pw[1]);
    router.push('/signUp/info');
  };

  useEffect(() => {
    if (disalbed && pw_regexp.test(pw[0]) && pw[0] === pw[1]) {
      setOn(false);
      return;
    }

    setOn(true);
  }, [pw, disalbed]);

  return (
    <BeforeLoginTemplete>
      <SignUpOrder order={1} />
      <H3>
        Sign up<span>전체 필수 입력</span>
      </H3>
      <InputArea>
        <h5>이메일 주소</h5>
        <div>
          <Input
            description={true}
            description_content="이메일 주소가 계정 아이디로 사용됩니다."
            placeholder="이메일 주소 입력"
            width="529px"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={disalbed}
          />
          <Button
            button_type={disalbed ? 'Cancel' : 'ViscuitColor'}
            label="인증번호 전송"
            fill={false}
            height="44px"
            onClick={sendCode}
            disabled={disalbed}
          />
        </div>
      </InputArea>
      {pass && (
        <InputArea>
          <h5>인증번호</h5>
          <div>
            <Input
              placeholder="인증번호 입력"
              width="100%"
              height="48px"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              disabled={disalbed}
            />
            <Button
              button_type={disalbed ? 'Cancel' : 'ViscuitColor'}
              label="확인"
              fill={false}
              width="96px"
              height="48px"
              onClick={verifyCode}
              disabled={disalbed}
            />
          </div>
        </InputArea>
      )}
      <InputArea>
        <h5>비밀번호</h5>
        <div>
          <Input
            eyes={true}
            placeholder="영문. 숫자, 특수문자 조합 8자 이상"
            width="100%"
            {...pw1Input}
            description={!pw_regexp.test(pw[0]) && pw[0].length > 0}
            description_content="영문, 숫자, 특수문자(~!@#$%^&*) 조합 8자 이상 입력해 주세요."
            description_color="#FF8126"
          />
        </div>
      </InputArea>
      <InputArea>
        <h5>비밀번호 확인</h5>
        <div>
          <Input
            eyes={true}
            placeholder="비밀번호 확인 입력"
            width="100%"
            {...pw2Input}
            description={pw[1].length > 0}
            description_content={pw[0] !== pw[1] ? errorText[0].text : errorText[1].text}
            description_color={pw[0] !== pw[1] ? errorText[0].color : errorText[1].color}
          />
        </div>
      </InputArea>
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

export default signUp;
