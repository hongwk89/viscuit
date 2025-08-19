import BeforeLoginTemplete from '@/components/BeforeLoginTemplete';
import Button from '@/components/ButtonComponent';
import Input from '@/components/Input';
import InputWithButton from '@/components/InputWithButton';
import useInput from '@/hooks/useInput';
import { email_regexp } from '@/utils/regExp';
import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import styled from 'styled-components';

const H3 = styled.h3`
  font-size: 26px;
  margin-bottom: 32px;
`;
const InputWrap = styled.div`
  &:nth-of-type(1) {
    margin-bottom: 32px;
  }
  &:nth-of-type(2) {
    margin-bottom: 50px;
  }
`;

const FindPw = () => {
  const [disabled, setDisabled] = useState([false, false, true]);
  const emailInput = useInput('');
  const codeInput = useInput('');

  const sendCode = () => {
    if (!email_regexp.test(emailInput.value)) {
      alert('이메일 형식에 맞지 않습니다.');
      return;
    }

    axios
      .post('https://viscuitapi.aedi.ai/send_code', {
        email: emailInput.value,
      })
      .then((res) => {
        if (res.data.status === 'S') {
        } else {
          alert(res.data.msg);
        }
      })
      .catch((err) => console.log(err));
  };

  const checkCode = () => {
    axios
      .post('https://viscuitapi.aedi.ai/verify_code', {
        code: codeInput.value,
      })
      .then((res) => {
        if (res.data.status === 'S') {
          setDisabled([true, true, false]);
        } else {
          setDisabled((prev) => [false, false, true]);
          alert(res.data.msg);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <BeforeLoginTemplete>
      <H3>비밀번호 찾기</H3>
      <InputWrap>
        <InputWithButton marginTop="2px">
          <Input
            width="529px"
            label="이메일 주소"
            placeholder="이메일 주소 입력"
            {...emailInput}
            description={true}
            description_content="계정 아이디로 사용하고 있는 이메일 주소를 입력해주세요."
          />
          <Button
            label="인증번호 전송"
            fill={false}
            width="135px"
            height="44px"
            disabled={disabled[0]}
            onClick={sendCode}
            button_type={disabled[0] ? 'Cancel' : 'ViscuitColor'}
          />
        </InputWithButton>
      </InputWrap>
      <InputWrap>
        <InputWithButton marginTop="24px">
          <Input width="568px" label="인증번호" placeholder="인증번호 입력" {...codeInput} />
          <Button
            label="확인"
            fill={false}
            width="96px"
            height="44px"
            disabled={disabled[1]}
            onClick={checkCode}
            button_type={disabled[1] ? 'Cancel' : 'ViscuitColor'}
          />
        </InputWithButton>
      </InputWrap>
      <Link href="/changePw">
        <Button label="다음" width="312px" height="56px" align="center" disabled={disabled[2]} />
      </Link>
    </BeforeLoginTemplete>
  );
};
export default FindPw;
