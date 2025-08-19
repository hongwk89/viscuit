import BeforeLoginTemplete from '@/components/BeforeLoginTemplete';
import Button from '@/components/ButtonComponent';
import Input from '@/components/Input';
import Popup from '@/components/Popup';
import useInput from '@/hooks/useInput';
import { pw_regexp } from '@/utils/regExp';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';
import { errorText } from './signUp';
import axios from 'axios';

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

const ChangePw = () => {
  const [pw, setPw] = useState(['', '']);
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const setFirstPw = (val: string) => {
    setPw((prev) => [val, prev[1]]);
  };

  const setSecondPw = (val: string) => {
    setPw((prev) => [prev[0], val]);
  };

  const pw1Input = useInput('', setFirstPw);
  const pw2Input = useInput('', setSecondPw);

  const handleClick = () => {
    if (!pw_regexp.test(pw[1])) {
      alert('비밀번호는 영문. 숫자, 특수문자 조합 8자 이상으로 조합해주세요.');
      return;
    }

    if (pw[0] !== pw[1]) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    axios
      .post('https://viscuitapi.aedi.ai/reset_password', {
        password: pw2Input.value,
      })
      .then((res) => {
        if (res.data.status === 'S') {
          setOpen(true);
        } else {
          alert(res.data.msg);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleclick = () => {
    router.push('/login');
  };

  return (
    <BeforeLoginTemplete>
      <H3>비밀번호 재설정</H3>
      <InputWrap>
        <Input
          eyes={true}
          placeholder="영문. 숫자, 특수문자 조합 8자 이상"
          width="627px"
          label="비밀번호"
          {...pw1Input}
          description={!pw_regexp.test(pw[0]) && pw[0].length > 0}
          description_content="영문, 숫자, 특수문자(~!@#$%^&*) 조합 8자 이상 입력해 주세요."
          description_color="#FF8126"
        />
      </InputWrap>
      <InputWrap>
        <Input
          eyes={true}
          placeholder="비밀번호 확인 입력"
          width="100%"
          label="비밀번호 확인"
          {...pw2Input}
          description={pw[1].length > 0}
          description_content={pw[0] !== pw[1] ? errorText[0].text : errorText[1].text}
          description_color={pw[0] !== pw[1] ? errorText[0].color : errorText[1].color}
        />
      </InputWrap>
      <Link href="/changePw">
        <Button
          label="비밀번호 변경"
          width="312px"
          height="56px"
          align="center"
          onClick={handleClick}
        />
      </Link>
      <Popup
        open={open}
        close={() => setOpen(false)}
        click={handleclick}
        title="비밀번호가<br/> 재설정 되었습니다."
        buttonName="로그인 화면으로 가기"
        closeBtn={false}
        font_size="32px"
      />
    </BeforeLoginTemplete>
  );
};

export default ChangePw;
